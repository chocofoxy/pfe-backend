import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongoModel } from 'mongoose';
import { Status } from 'src/enums';
import { ProductService } from 'src/product/product.service';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Model } from './entities/model.entity'

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(Model.name) private ModelModel: MongoModel<Model> ,
    private productService: ProductService
    ) {}
  
  async create(createModelInput) {
    let product = await this.productService.InternalfindOne(createModelInput.product)
    if ( product && product.store == createModelInput.user.id ) {
      const model = await new this.ModelModel(createModelInput).save()
      product.model3d = model._id 
      await this.productService.update(product._id, product)
      return model
    }
  }

  async findAll(): Promise<Model[]> {
    return await this.ModelModel.find()
  }

  async findOne(id: string): Promise<Model> {
    return await this.ModelModel.findOne({ _id: id })
  }

  async update(id: string, updateModelInput): Promise<Model> {
    let product = await this.productService.InternalfindOne(updateModelInput.productId)
    product.status = Status.pending
    await this.productService.update(product._id, product)
    return await this.ModelModel.findOneAndUpdate({ _id: id },updateModelInput)
  }

  async remove(id: string): Promise<Model> {
    return await this.ModelModel.findOneAndRemove({ _id: id })
  }
}
