import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private ReviewModel: Model<Review>) {}
  
  async create(createReviewInput: CreateReviewInput) {
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
