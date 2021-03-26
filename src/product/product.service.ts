import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/category.service';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Status } from 'src/enums';
import { SearchProductInput } from './dto/search-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private categoryService: CategoryService
    ) {}
  
  async create(createProductInput: CreateProductInput) {
    const category = await this.categoryService.findOne(createProductInput.categroy)
    if ( category && category.status == Status.confirmed ) {
      const product = await new this.ProductModel(createProductInput).save()
      category.products.push(product._id)
      return product
    }
    throw new HttpException('this category doesn\'t exist',400)
  }

  async findMany(ids) {
    return await this.ProductModel.find({ '_id': { $in: ids } })
  }

  async search(query: SearchProductInput) {
    return await this.ProductModel.find({ 
      price: { $gte: query.minPrice , $lte: query.maxPrice } , 
      category: { $eq: query.category },
      name: { $regex: query.name }
     })
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
