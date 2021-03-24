import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<Order>,
    private prodctService: ProductService
    ) {}
  
  async create(createOrderInput: CreateOrderInput) {
    const product = await this.prodctService.findOne(createOrderInput.product)
    return await new this.OrderModel({...createOrderInput , product }).save()
  }

  async findAll(): Promise<Order[]> {
    return await this.OrderModel.find()
  }

  async findOne(id: string): Promise<Order> {
    return await this.OrderModel.findOne({ id: id })
  }

  async update(id: string, updateOrderInput: UpdateOrderInput): Promise<Order> {
    return await this.OrderModel.findOneAndUpdate({ id: id },UpdateOrderInput)
  }

  async remove(id: string): Promise<Order> {
    return await this.OrderModel.findOneAndRemove({ id: id })
  }
}
