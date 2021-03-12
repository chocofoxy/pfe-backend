import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) {}
  
  async create(createProductInput: CreateProductInput) {
    return await new this.ProductModel(createProductInput).save()
  }

  async findAll(): Promise<Product[]> {
    return await this.ProductModel.find()
  }

  async findOne(id: string): Promise<Product> {
    return await this.ProductModel.findOne({ id: id })
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    return await this.ProductModel.findOneAndUpdate({ id: id },UpdateProductInput)
  }

  async remove(id: string): Promise<Product> {
    return await this.ProductModel.findOneAndRemove({ id: id })
  }
}
