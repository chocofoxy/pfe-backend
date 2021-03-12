import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';
import { Bundle } from './entities/bundle.entity';

@Injectable()
export class BundleService {
  constructor(@InjectModel(Bundle.name) private BundleModel: Model<Bundle>) {}
  
  async create(createBundleInput: CreateBundleInput) {
    return await new this.BundleModel(createBundleInput).save()
  }

  async findAll(): Promise<Bundle[]> {
    return await this.BundleModel.find()
  }

  async findOne(id: string): Promise<Bundle> {
    return await this.BundleModel.findOne({ id: id })
  }

  async update(id: string, updateBundleInput: UpdateBundleInput): Promise<Bundle> {
    return await this.BundleModel.findOneAndUpdate({ id: id },UpdateBundleInput)
  }

  async remove(id: string): Promise<Bundle> {
    return await this.BundleModel.findOneAndRemove({ id: id })
  }
}
