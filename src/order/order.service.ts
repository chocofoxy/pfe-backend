import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { Model } from 'mongoose';
import { BundleService } from 'src/bundle/bundle.service';
import { ClientService } from 'src/client/client.service';
import { Status } from 'src/enums';
import { NotificationService } from 'src/notification/notification.service';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<Order>,
    @Inject(forwardRef(() => ProductService)) private prodctService: ProductService,
    @Inject(forwardRef(() => BundleService)) private bundleService: BundleService,
    private notificationService: NotificationService,
    private clientService: ClientService,
    @Inject('PUB_SUB') private pubSub: PubSub,
    private storeService: StoreService
  ) { }

  async create(createOrderInput) {
    const product = await this.prodctService.InternalfindOne(createOrderInput.product)
    const bundle = await this.bundleService.findOne(createOrderInput.product)
    const item = product || bundle
    let store = await this.storeService.findOneApproved(item.store || item.store._id)
    let client = await this.clientService.findById(createOrderInput.client)
    if (item) {
      const order = await new this.OrderModel({ ...createOrderInput, item: item._id, status: Status.pending, itemOrdred: item, type: bundle ? "Bundle" : "Product" }).save()
      store.orders.push(order._id)
      await this.storeService.update(store._id, store)
      client.orders.push(order._id)
      await this.clientService.update(client._id, client)
      const event = { message: `You got a new order for ${order.itemOrdred.name || order.itemOrdred.title} `, type: 'Order', item: order }
      this.pubSub.publish('notificationAdded',
        {
          notificationAdded: {
            event: event
            , userId: client._id
          }
        })
      await this.notificationService.addEvent(event, store.email)
      return order
    }
    throw new HttpException('this product doesn\'t exist', 400)
  }

  async findAll(): Promise<Order[]> {
    return await this.OrderModel.find()
  }

  async findOne(id: string): Promise<Order> {
    return await this.OrderModel.findOne({ _id: id })
  }

  async update(id: string, updateOrderInput): Promise<Order> {
    return await this.OrderModel.findOneAndUpdate({ _id: id }, updateOrderInput)
  }

  async remove(id: string): Promise<Order> {
    return await this.OrderModel.findOneAndRemove({ _id: id })
  }

  async usersOrders(id: string): Promise<Order[]> {
    return await this.OrderModel.find().populate('product').or([{ client: id }, { product: { store: id } }])
  }

  async cancelOrder(id: string, userId): Promise<Order> {
    let oldOrder = await this.OrderModel.findById(id).populate({ path: 'item' , populate: { path: 'store'} }).populate('client')
    if ( (oldOrder.client._id == userId || oldOrder.item.store._id == userId) && oldOrder.status == Status.pending ) {
      oldOrder.status = Status.cancelled
      const  order = await this.update(oldOrder._id, oldOrder)
      const event = { message: `Your order for ${oldOrder.itemOrdred.name} has been cancelled`, type: 'Order', item: oldOrder }
      this.pubSub.publish('notificationAdded',
        {
          notificationAdded: {
            event: event
            , userId: userId
          }
        })
      await this.notificationService.addEvent(event, oldOrder.client._id == userId ? oldOrder.item.store.email : oldOrder.client.email )
      return order
    }
    throw new HttpException('you are not a part of this order', 400)
  }

  async approveOrder(id: string, userId): Promise<Order> {
    let oldOrder = await this.OrderModel.findById(id).populate({ path: 'item' , populate: { path: 'store'} }).populate('client')
    if (oldOrder.client._id == userId || oldOrder.item.store._id == userId) {
      oldOrder.status = Status.confirmed
      const order = await this.update(oldOrder._id, oldOrder)
      const event = { message: `Your order for ${oldOrder.itemOrdred.name} has been confirmed`, type: 'Order', item: oldOrder }
      this.pubSub.publish('notificationAdded',
        {
          notificationAdded: {
            event: event
            , userId: userId
          }
        })
      await this.notificationService.addEvent(event, oldOrder.client._id == userId ? oldOrder.item.store.email : oldOrder.client.email )
      return order
    }
    throw new HttpException('you are not a part of this order', 400)
  }

  async clean(item, type) {
    await this.OrderModel.remove({ type: type, item: item })
  }

  async count() {
    return await this.OrderModel.find().count()
  }
}
