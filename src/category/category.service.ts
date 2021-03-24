import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private CategoryModel: Model<Category>) {}
  
  async create(createCategoryInput: CreateCategoryInput) {
    return await new this.CategoryModel(createCategoryInput).save()
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryModel.find()
  }

  async findOne(id: string): Promise<Category> {
    return await this.CategoryModel.findOne({ id: id })
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    return await this.CategoryModel.findOneAndUpdate({ id: id },UpdateCategoryInput)
  }

  async remove(id: string): Promise<Category> {
    return await this.CategoryModel.findOneAndRemove({ id: id })
  }

  async approve(id: string): Promise<Category> {
    const category = await this.findOne(id)
    category.approved = true
    return await this.update(id,category as UpdateCategoryInput)
  }
}
