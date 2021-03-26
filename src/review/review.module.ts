import { forwardRef, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Review, ReviewSchema } from './entities/review.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';
import { BundleModule } from 'src/bundle/bundle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    forwardRef(() => ProductModule),
    forwardRef(() => StoreModule),
    forwardRef(() => BundleModule)
  ],
  providers: [ReviewResolver, ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {}
