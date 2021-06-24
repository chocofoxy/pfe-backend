import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from 'src/model/model.service';
import { ProductService } from 'src/product/product.service';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private MaterialModel: Model<Material>,
    private modelService: ModelService,
    private productService: ProductService
    ) {}
  
  async create(createMaterialInput: CreateMaterialInput, userId) {
    let model = await this.modelService.findOne( createMaterialInput.model )
    const product =  await this.productService.InternalfindOne( createMaterialInput.product )
    if ( model && product.store == userId ) {
      const material = await new this.MaterialModel(createMaterialInput).save()
      model.materials.push(material)
      await this.modelService.update(model._id,{...model , productId: product._id })
      return  material
    }
    throw new HttpException(" Either the product | the model doesn't exist or you have no ownership",400)
  }

  async findAll(): Promise<Material[]> {
    return await this.MaterialModel.find()
  }

  async findOne(id: string): Promise<Material> {
    return await this.MaterialModel.findOne({ id: id })
  }

  async update(id: string, updateMaterialInput: UpdateMaterialInput): Promise<Material> {
    return await this.MaterialModel.findOneAndUpdate({ _id: id },UpdateMaterialInput)
  }

  async remove(id: string): Promise<Material> {
    return await this.MaterialModel.findOneAndRemove({ _id: id })
  }
}
