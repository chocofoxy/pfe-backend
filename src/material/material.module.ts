import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialResolver } from './material.resolver';
import { Material, MaterialSchema } from './entities/material.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }])],
  providers: [MaterialResolver, MaterialService],
  exports: [MaterialService]
})
export class MaterialModule {}
