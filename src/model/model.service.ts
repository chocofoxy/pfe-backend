import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongoModel } from 'mongoose';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Model } from './entities/model.entity'

@Injectable()
export class ModelService {
  constructor(@InjectModel(Model.name) private ModelModel: MongoModel<Model>) {}
  
  async create(createModelInput: CreateModelInput) {
    return await new this.ModelModel(createModelInput).save()
  }

  async findAll(): Promise<Model[]> {
    return await this.ModelModel.find()
  }

  async findOne(id: string): Promise<Model> {
    return await this.ModelModel.findOne({ id: id })
  }

  async update(id: string, updateModelInput: UpdateModelInput): Promise<Model> {
    return await this.ModelModel.findOneAndUpdate({ id: id },UpdateModelInput)
  }

  async remove(id: string): Promise<Model> {
    return await this.ModelModel.findOneAndRemove({ id: id })
  }
}
