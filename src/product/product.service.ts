import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/category.service';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private categoryService: CategoryService
    ) {}
  
  async create(createProductInput: CreateProductInput) {
    const category = await this.categoryService.findOne(createProductInput.categroy)
    if ( category && category.approved ) {
      const product = await new this.ProductModel(createProductInput).save()
      category.products.push(product._id)
      return product
    }
    throw new HttpException('this category doesn\'t exist',400)
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
