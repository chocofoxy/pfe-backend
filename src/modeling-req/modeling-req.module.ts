import { forwardRef, Module } from '@nestjs/common';
import { ModelingReqService } from './modeling-req.service';
import { ModelingReqResolver } from './modeling-req.resolver';
import { ModelingReqSchema, ModelingReq } from './entities/modeling-req.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: ModelingReq.name, schema: ModelingReqSchema }]),
    forwardRef(() => StoreModule )
  ],
  providers: [ModelingReqResolver, ModelingReqService],
  exports: [ModelingReqService]
})
export class ModelingReqModule {}
