import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(@InjectModel(Material.name) private MaterialModel: Model<Material>) {}
  
  async create(createMaterialInput: CreateMaterialInput) {
    return await new this.MaterialModel(createMaterialInput).save()
  }

  async findAll(): Promise<Material[]> {
    return await this.MaterialModel.find()
  }

  async findOne(id: string): Promise<Material> {
    return await this.MaterialModel.findOne({ id: id })
  }

  async update(id: string, updateMaterialInput: UpdateMaterialInput): Promise<Material> {
    return await this.MaterialModel.findOneAndUpdate({ id: id },UpdateMaterialInput)
  }

  async remove(id: string): Promise<Material> {
    return await this.MaterialModel.findOneAndRemove({ id: id })
  }
}
