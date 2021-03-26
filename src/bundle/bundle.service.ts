import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';
import { Bundle } from './entities/bundle.entity';

@Injectable()
export class BundleService {
  constructor(
    @InjectModel(Bundle.name) private BundleModel: Model<Bundle>,
    private productService: ProductService
    ) {}
  
  async create(createBundleInput: CreateBundleInput) {
    const products = await this.productService.findMany(createBundleInput.products)
    if ( products.length == createBundleInput.products.length )
    return await new this.BundleModel(createBundleInput).save()
    else
    throw new HttpException('One of these products doesn\'t exist',400)
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
