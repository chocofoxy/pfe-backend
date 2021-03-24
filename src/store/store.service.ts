import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {

  constructor(
    @InjectModel(Store.name) private StoreModel: Model<Store>,
    private notificationService: NotificationService
    ) {}
  
  async create(createStoreInput: CreateStoreInput) {
    return await new this.StoreModel({...createStoreInput}).save()
  }

  async findAll(): Promise<Store[]> {
    return await this.StoreModel.find()
  }

  async findOne(id: string): Promise<Store> {
    return await this.StoreModel.findOne({ id: id })
  }

  async update(id: string, updateStoreInput: UpdateStoreInput): Promise<Store> {
    return await this.StoreModel.findOneAndUpdate({ id: id },UpdateStoreInput)
  }

  async remove(id: string): Promise<Store> {
    return await this.StoreModel.findOneAndRemove({ id: id })
  }

  async approve(id: string): Promise<Store> {
    const store = await this.findOne(id)
    store.notification = (await this.notificationService.create())._id
    store.approved = true
    return await this.update(id,store as UpdateStoreInput)
  }
}
