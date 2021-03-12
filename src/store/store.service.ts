import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {

  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}
  
  async create(createStoreInput: CreateStoreInput) {
    return await new this.StoreModel(createStoreInput).save()
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
}
