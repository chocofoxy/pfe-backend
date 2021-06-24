import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';
import { Bundle } from './entities/bundle.entity';

@Injectable()
export class BundleService {
  constructor(
    @InjectModel(Bundle.name) private BundleModel: Model<Bundle>,
    @Inject(forwardRef(()=> ProductService)) private productService: ProductService,
    private storeService: StoreService,
    @Inject(forwardRef(() => OrderService )) private orderService: OrderService

  ) { }

  async create(createBundleInput) {
    const products = await this.productService.findMany(createBundleInput.products)
    const user = await this.storeService.findById(createBundleInput.store)
    if (products.length == createBundleInput.products.length) {
      const bundle = await new this.BundleModel(createBundleInput).save()
      user.bundles.push(bundle._id)
      await this.storeService.update(user._id, user)
      return bundle
    }
    else
      throw new HttpException('One of these products doesn\'t exist', 400)
  }

  async findAll(): Promise<Bundle[]> {
    return await this.BundleModel.find().populate(['products','store'])
  }

  async findOne(id: string): Promise<Bundle> {
    return await this.BundleModel.findOne({ _id: id }).populate(['store','reviews']).populate({ path: 'products' , populate:[{ path: "store" }]})
  }

  async update(id: string, updateBundleInput): Promise<Bundle> {
    return await this.BundleModel.findOneAndUpdate({ _id: id }, updateBundleInput)
  }

  async remove(id: string): Promise<Bundle> {
    const bundle = await this.BundleModel.findOneAndRemove({ _id: id })
    await this.orderService.clean(bundle._id,'Bundle')
    return bundle
  }

  async findBundlewithProduct( id ) {
    const bundle = await this.BundleModel.findOne({}).populate({ path: "products" , match: { '_id': id  }})
    console.log(bundle)
    return bundle
  }
}
