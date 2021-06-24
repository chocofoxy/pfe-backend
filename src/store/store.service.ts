import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { Model } from 'mongoose';
import { Status } from 'src/enums';
import { NotificationService } from 'src/notification/notification.service';
import { encrypte } from 'src/storage/encryption';
import { UsersService } from 'src/user/users.service';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {

  constructor(
    @InjectModel(Store.name) private StoreModel: Model<Store>,
    private notificationService: NotificationService,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
    ) {}
  
  async create(createStoreInput) {
    if ( await this.usersService.findOne(createStoreInput.email) == null ) {
    createStoreInput.password = await encrypte(createStoreInput.password)
    const store = await new this.StoreModel(createStoreInput).save() 
    await this.usersService.sendEmail(createStoreInput.email, `${await encrypte(createStoreInput.email)}`)
    const event = { message: ' a new store joined the website ', type: 'Store', item: store }
    this.pubSub.publish('adminNotification', { event })
    await this.notificationService.addEventToAdmin(event)
    return store
  }
    else
    throw new HttpException('another account is using this mail',400)
  }

  async findAll(): Promise<Store[]> {
    return await this.StoreModel.find().populate(['products','bundles','reviews'])
  }

  async findAllApproved(): Promise<Store[]> {
    return await this.StoreModel.find({ approved: true }).populate({ path: 'products' , match: { status: Status.confirmed } })
  }


  async findOne(email: string): Promise<Store> {
    return await this.StoreModel.findOne({ email: email }).populate(['conversations']).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async findOneApproved(id: string): Promise<Store> {
    return await this.StoreModel.findOne({ _id: id , approved: true })
    .populate({ path: 'orders' , populate: { path: "product" }})
    .populate({ path: 'products' , populate: { path: "store" } , match: { status: Status.confirmed } })
    .populate({ path: 'bundles' , populate: ["products", "store"]  })
    .populate({ path: 'reviews' , populate: ["client"]  })
    .catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async storeApprovedProducts (id) {
    return await this.StoreModel.findOne({ _id: id , approved: true }).populate({ path: 'products'  , match: { status: Status.confirmed } })
  }

  async findOneApprovedInventory(id: string): Promise<Store> {
    return await this.StoreModel.findOne({ _id: id , approved: true })
    .populate({ path: 'conversations' , populate: ['seller','client']})
    .populate({ path: "orders" , populate: [ "item","client","material"] })
    .populate({ path: "bundles" , populate: { path: "products"}})
    .populate(['products','requests'])
    .catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async findById(id: string): Promise<Store> {
    return await this.StoreModel.findById(id).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async update(id: string, store): Promise<Store> {
    return await this.StoreModel.findByIdAndUpdate(id,store).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async remove(id: string): Promise<Store> {
    return await this.StoreModel.findByIdAndRemove(id).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async approve(id: string): Promise<Store> {
    const store = await this.StoreModel.findById(id).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
    store.notification = (await this.notificationService.create())._id
    store.approved = true
    return await this.update(id,store as UpdateStoreInput)
  }

  async subscribeToPremium ( id ) {
    return this.StoreModel.findByIdAndUpdate(id,{ subscribed: true })
  }

  async count() {
    return await this.StoreModel.find().count()
  }
}
