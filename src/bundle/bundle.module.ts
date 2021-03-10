import { Module } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { BundleResolver } from './bundle.resolver';
import { Bundle, BundleSchema } from './entities/bundle.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bundle.name, schema: BundleSchema }])],
  providers: [BundleResolver, BundleService],
  exports: [BundleService]
})
export class BundleModule {}
