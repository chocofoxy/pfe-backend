import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { UsersService } from 'src/user/users.service';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {

  constructor(
    @InjectModel(Store.name) private StoreModel: Model<Store>,
    private notificationService: NotificationService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
    ) {}
  
  async create(createStoreInput: CreateStoreInput) {
    if ( await this.usersService.findOne(createStoreInput.email) == null )
    return await new this.StoreModel(createStoreInput).save()
    else
    throw new HttpException('another account is using this mail',400)
  }

  async findAll(): Promise<Store[]> {
    return await this.StoreModel.find()
  }

  async findOne(email: string): Promise<Store> {
    return await this.StoreModel.findOne({ email: email }).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async update(id: string, store): Promise<Store> {
    return await this.StoreModel.findByIdAndUpdate(id,store).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async remove(id: string): Promise<Store> {
    return await this.StoreModel.findByIdAndRemove(id).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
  }

  async approve(id: string): Promise<Store> {
    const store = await this.StoreModel.findById(id).catch(e => { throw new HttpException('this user doesn\'t exist',400) })
    store.notification = (await this.notificationService.create())._id
    store.approved = true
    return await this.update(id,store as UpdateStoreInput)
  }
}
