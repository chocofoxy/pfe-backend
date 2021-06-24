import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel , } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/category.service';
import { Model, Types , ObjectId} from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Status } from 'src/enums';
import { SearchProductInput } from './dto/search-product.input';
import { UsersService } from 'src/user/users.service';
import { StoreService } from 'src/store/store.service';
import { ClientService } from 'src/client/client.service';
import { OrderService } from 'src/order/order.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { PubSub } from 'apollo-server-express';
import { NotificationService } from 'src/notification/notification.service';
import { BundleService } from 'src/bundle/bundle.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private notificationService: NotificationService,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(forwardRef(()=> OrderService)) private orderService: OrderService,
    @Inject(forwardRef(()=> BundleService)) private bundleService: BundleService,
    private clientService: ClientService
  ) { }

  async create(createProductInput) {
    const category = await this.categoryService.findOne(createProductInput.category)
    const user = await this.storeService.findById(createProductInput.store)
    if (category && category.status == Status.confirmed) {
      const product = await new this.ProductModel(createProductInput).save()
      category.products.push(product._id)
      user.products.push(product._id)
      await this.storeService.update(user._id, user)
      await this.categoryService.update(category._id, category)
      const event = { message: ' a store added a new product ', type: 'Product', item: product }
      this.pubSub.publish('adminNotification', { event })
      await this.notificationService.addEventToAdmin(event)
      return product
    }
    throw new HttpException('this category doesn\'t exist', 400)
  }

  async findMany(ids) {
    return await this.ProductModel.find({ '_id': { $in: ids } })
  }

  async search(query: SearchProductInput) {
    console.log(query)
    if (query.store)
    return await this.ProductModel.find({
      status: Status.confirmed,
      price: { $gte: query.minPrice, $lte: query.maxPrice },
      category:  query.category ? query.category : /.*/  ,
      name: { $regex: query.name ? new RegExp( "^.*" + query.name.toLowerCase() + "*", "i") : /.*/ ,  },
      $or:  [{ store: query.store } , { store: Types.ObjectId(query.store) }] 
    }).populate(['category','model',]).populate({ path: "store"})
      .populate({ path: 'reviews'})
    else
    return await this.ProductModel.find({
      status: Status.confirmed,
      price: { $gte: query.minPrice, $lte: query.maxPrice },
      category:  query.category ? query.category : /.*/  ,
      name: { $regex: query.name ? new RegExp( "^.*" + query.name.toLowerCase() + "*", "i") : /.*/ ,  },
    }).populate(['category','model',]).populate({ path: "store"})
      .populate({ path: 'reviews'})
  }

  async findAll(): Promise<Product[]> {
    return await this.ProductModel.find({ status: Status.confirmed }).populate(['store','category','model3d','reviews'])
  }

  async findAllStatus(): Promise<Product[]> {
    return await this.ProductModel.find().populate(['store','category','model3d','reviews'])
  }

  async findOne(id: string): Promise<Product> {
     const product = await this.ProductModel.findOne({ _id: id , status: Status.confirmed })
     .populate(['store',])
     .populate({ path:'model3d' , populate: { path: 'materials'}})
     .populate({ path:'reviews' , populate: { path: 'client'}})
     return product
  }

  async findOneAdmin(id: string): Promise<Product> {
    const product = await this.ProductModel.findOne({ _id: id }).populate(['store','reviews','category'])
    .populate({ path:'model3d' , populate: { path: 'materials'}})
    return product
 }

  async findOneForInvetory(id: string, userId ): Promise<Product> {
    const product = await this.ProductModel.findOne({ _id: id })
    .populate(['store','reviews','category'])
    .populate({ path: 'model3d' , populate: { path: 'materials' }})
    if ( userId == product.store._id)
    return product
 }

  async InternalfindOne(id: string): Promise<Product> {
    return await this.ProductModel.findOne({ _id: id  })
  }

  async update(id: string, updateProductInput ): Promise<Product> {
      return await this.ProductModel.findOneAndUpdate({ _id: id  },updateProductInput)
  }

  async approve(id: string): Promise<Product> {
    return await this.ProductModel.findOneAndUpdate({ _id: id  },{ status: Status.confirmed })
  }

  async decline(id: string): Promise<Product> {
    return await this.ProductModel.findOneAndUpdate({ _id: id  },{ status: Status.cancelled })
  }

  async updateExternal(id: string, updateProductInput , user ): Promise<Product> {
    let product = await this.ProductModel.findById(id)
    await this.removeImages(id , updateProductInput.deletedImages)
    if ( product.store == user) {
      let product = await this.ProductModel.findById(id)
      updateProductInput.images = product.images.concat(updateProductInput.images)
      return await this.ProductModel.findOneAndUpdate({ _id: id  },{...updateProductInput , status: Status.pending})
    }
    throw new HttpException('you can\'t update this product', 403)
  }

  async remove(id: string): Promise<Product> {
    let product =  await this.ProductModel.findById(id)
    const bundle = await this.bundleService.findBundlewithProduct(id)
    if ( bundle ) {
      throw new HttpException("you can't delete a product that exist in bundle",400)
    }
    else {
    product = await this.ProductModel.findOneAndRemove({ _id: id })
    await this.orderService.clean(product._id,'Product')
    return product }
  }

  /*
  async maxPrice(): Promise<Product> {
    return await this.ProductModel.find().sort({ price: 1})
  }*/

  async removeImages( productId , ids: number[] ) {
    let product = await this.ProductModel.findById(productId)
    //console.log(ids)
    let images = []
    for ( let i = 0 ; i < product.images.length ; i++ ) {
        if ( !ids.includes(i) ) {
          console.log(i)
          images.push(product.images[i])
        }
    }
    product.images = images
    await this.ProductModel.findByIdAndUpdate(productId,product)
  }

  async addToWatchlist(productId,userId) {
    let user = await this.clientService.findById(userId)
    let watchlist = await this.clientService.watchlist(userId)
    const product = await this.findOne(productId)
    if ( product && !watchlist.includes(productId) ) {
      watchlist.push(productId)
      user.watchlist =  watchlist
      await this.clientService.update(userId,user)
      return product
    }
    throw new HttpException('product doesn\'t exist or exist in watchlist ', 400)
  }

  async removeFromWatchlist(productId,userId) {
    let user = await this.clientService.findById(userId)
    let watchlist = await this.clientService.watchlist(userId)
    const product = await this.findOne(productId)
    if ( product && watchlist.includes(productId) ) {
      watchlist.splice(watchlist.indexOf(productId), 1); 
      user.watchlist =  watchlist
      await this.clientService.update(userId,user)
      return product
    }
    throw new HttpException('product doesn\'t exist or doesn\'t exist in watchlist ', 400)
  }

  async bestSelling() {
    return await this.ProductModel.find({ status: Status.confirmed }).sort({ rating: 'desc'}).limit(5).populate('store')
  }


  async count() {
    return await this.ProductModel.find().count()
  }


}
