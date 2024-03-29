import { forwardRef, Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelResolver } from './model.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelSchema } from './entities/model.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }])
  ],
  providers: [ModelResolver, ModelService],
  exports:[ModelService]
})
export class ModelModule {}
