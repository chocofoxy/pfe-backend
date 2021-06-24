import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from 'src/enums';
import { StoreService } from 'src/store/store.service';
import { CreateModelingReqInput } from './dto/create-modeling-req.input';
import { ModelingReq } from './entities/modeling-req.entity';

@Injectable()
export class ModelingReqService {

  constructor(
    @InjectModel(ModelingReq.name) private modelingReqModel: Model<ModelingReq>,
    private storeService: StoreService
    ) {}

  async create(createModelingReqInput: CreateModelingReqInput, userId ) {
    const store = await this.storeService.findById(userId)
    
    if  ( store.subscribed ) {
      const request = await (new this.modelingReqModel(createModelingReqInput)).save()
      store.requests.push(request._id)
      await this.storeService.update(store._id,store)
      return request
    }
    throw new HttpException(" You need to be subscribed ",400)
  }

  findAll() {
    return this.modelingReqModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} modelingReq`;
  }

  update(id: number, updateModelingReqInput) {
    return `This action updates a #${id} modelingReq`;
  }

  async decline( id ) {
    return await this.modelingReqModel.findByIdAndUpdate(id,{ status: Status.cancelled })
  }

  async approve( info ) {
    return await this.modelingReqModel.findByIdAndUpdate(info.id,{ model3D: info.file ,status: Status.confirmed })
  }

  async remove(id , userId ) {
    const store = await this.storeService.findById(userId)
    console.log(store.requests.includes(id))
    if ( store.requests.includes(id) ) {
      return await this.modelingReqModel.findByIdAndUpdate(id,{ status: Status.cancelled })
    }
  }
}
