import { forwardRef, Module } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { BundleResolver } from './bundle.resolver';
import { Bundle, BundleSchema } from './entities/bundle.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bundle.name, schema: BundleSchema }]),
    forwardRef(()=> ProductModule),
    forwardRef(()=> StoreModule),
    forwardRef(()=> OrderModule)
  ],
  providers: [BundleResolver, BundleService],
  exports: [BundleService]
})
export class BundleModule {}
