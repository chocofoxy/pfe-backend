import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BundleService } from 'src/bundle/bundle.service';
import { Bundle } from 'src/bundle/entities/bundle.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { Store } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private ReviewModel: Model<Review>,
    private productService: ProductService,
    private storeService: StoreService,
    private bundleService: BundleService
    ) {}
  
  async create(createReviewInput) {
    switch (createReviewInput.type) {
      case Product.name: {
        if (await this.productService.findOne(createReviewInput.reviewingId) == null)
        throw new HttpException('Unknown item to review',400)
      } break ;
      case Bundle.name:{
        if (await this.bundleService.findOne(createReviewInput.reviewingId) == null)
        throw new HttpException('Unknown item to review',400)
      } break ;
      case Store.name: {
        if (await this.storeService.findById(createReviewInput.reviewingId) == null)
        throw new HttpException('Unknown item to review',400)
      } break ;
    }
    return await new this.ReviewModel(createReviewInput).save()
  }

  async findAll(): Promise<Review[]> {
    return await this.ReviewModel.find()
  }

  async findOne(id: string): Promise<Review> {
    return await this.ReviewModel.findOne({ id: id })
  }

  async update(id: string, updateReviewInput: UpdateReviewInput): Promise<Review> {
    return await this.ReviewModel.findOneAndUpdate({ id: id },UpdateReviewInput)
  }

  async remove(id: string): Promise<Review> {
    return await this.ReviewModel.findOneAndRemove({ id: id })
  }
}
