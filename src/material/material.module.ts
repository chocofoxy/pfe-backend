import { forwardRef, Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialResolver } from './material.resolver';
import { Material, MaterialSchema } from './entities/material.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelModule } from 'src/model/model.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    forwardRef(() => ModelModule) ,
    forwardRef(() => ProductModule) ,
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }])
  ],
  providers: [MaterialResolver, MaterialService],
  exports: [MaterialService]
})
export class MaterialModule {}
