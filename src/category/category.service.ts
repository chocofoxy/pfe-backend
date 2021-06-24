import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from 'src/enums';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private CategoryModel: Model<Category>) { }

  async create(createCategoryInput) {
    return await new this.CategoryModel(createCategoryInput).save()
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryModel.find({ status: Status.confirmed }).populate({ path: 'products', populate: { path: 'store' }, match: { status: Status.confirmed } })
  }

  async findAllForAdmin() {
    return await this.CategoryModel.find().populate({ path: 'products', populate: { path: 'store' }, match: { status: Status.confirmed } })
  }

  async findAllStatus(): Promise<Category[]> {
    return await this.CategoryModel.find()
  }

  async findOne(id: string): Promise<Category> {
    return await this.CategoryModel.findById(id).populate({ path: 'products', populate: { path: 'store' }, match: { status: Status.confirmed } })
  }

  async update(id: string, updateCategoryInput): Promise<Category> {
    return await this.CategoryModel.findByIdAndUpdate(id, { ...updateCategoryInput, status: Status.confirmed })
  }

  async remove(id: string): Promise<Category> {
    return await this.CategoryModel.findOneAndRemove({ _id: id })
  }

  async approve(id: string): Promise<Category> {
    const category = await this.findOne(id)
    category.status = Status.confirmed
    return await this.update(id, category as UpdateCategoryInput)
  }

  async discover() {
    return await this.CategoryModel.find({ status: Status.confirmed }).populate({ path: 'products' , match:{ status: Status.confirmed } , populate: { path: 'store' }}).slice('products', 1)
  }

}
