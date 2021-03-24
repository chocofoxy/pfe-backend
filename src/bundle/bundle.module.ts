import { forwardRef, Module } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { BundleResolver } from './bundle.resolver';
import { Bundle, BundleSchema } from './entities/bundle.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bundle.name, schema: BundleSchema }]),
    forwardRef(()=> ProductModule )
  ],
  providers: [BundleResolver, BundleService],
  exports: [BundleService]
})
export class BundleModule {}
