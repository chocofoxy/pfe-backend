import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BundleService } from 'src/bundle/bundle.service';
import { Bundle } from 'src/bundle/entities/bundle.entity';
import { Status } from 'src/enums';
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
  ) { }

  async create(createReviewInput) {
    const product = await this.productService.findOne(createReviewInput.reviewingId)
    const bundle = await this.bundleService.findOne(createReviewInput.reviewingId)
    const store = await this.storeService.findById(createReviewInput.reviewingId)

    let item

    if (product)
      item = { ...product, type: Product.name }
    else if (bundle)
      item = { ...bundle, type: Bundle.name }
    else
      item = { ...store, type: Store.name }

    if (item) {
      const review = await new this.ReviewModel({ ...createReviewInput, reviewing: createReviewInput.reviewingId, type: item.type }).save()
      return review
    }
    throw new HttpException('Unknown item to review', 400)
  }

  async findAll(): Promise<Review[]> {
    return await this.ReviewModel.find().populate(['client', 'reviewing'])
  }

  async findOne(id: string): Promise<Review> {
    return await this.ReviewModel.findOne({ _id: id })
  }

  async update(id: string, updateReviewInput: UpdateReviewInput): Promise<Review> {
    return await this.ReviewModel.findOneAndUpdate({ _id: id }, updateReviewInput)
  }

  async remove(id: string): Promise<Review> {
    return await this.ReviewModel.findOneAndRemove({ _id: id })
  }

  async approve(id) {
    const review = await this.findOne(id)

    const product = await this.productService.findOne(review.reviewing)
    const bundle = await this.bundleService.findOne(review.reviewing)
    const store = await this.storeService.findById(review.reviewing)

    const item = product || bundle || store

    item.reviews.push(review._id)
    item.rating = (item.rating + review.rating) / item.reviews.length

    switch (review.type) {
      case Bundle.name: { await this.bundleService.update(item._id, item); break }
      case Product.name: { await this.productService.update(item._id, item); break }
      case Store.name: { await this.storeService.update(item._id, item); break }
    }
    return await this.ReviewModel.findByIdAndUpdate(review._id, { status: Status.confirmed })
  }

  async decline(id) {
    const review = await this.findOne(id)
    return await this.ReviewModel.findByIdAndUpdate(review._id, { status: Status.cancelled })
  }

  async count() {
    return await this.ReviewModel.find().count()
  }
}
