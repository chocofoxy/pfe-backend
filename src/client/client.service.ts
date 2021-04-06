import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { UsersService } from 'src/user/users.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private ClientModel: Model<Client>,
    private notificationService: NotificationService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
    ) {}
  
  async create(createClientInput: CreateClientInput) {
    if ( await this.usersService.findOne(createClientInput.email) == null )
    return await new this.ClientModel({...createClientInput, 
      notification: (await this.notificationService.create())._id
    }).save()
    else
    throw new HttpException('another account is using this mail',400)
  }

  async findAll(): Promise<Client[]> {
    return await this.ClientModel.find()
  }

  async findOne(email: string): Promise<Client> {
    return await this.ClientModel.findOne({ email: email })
  }

  async update(email: string, updateClientInput: UpdateClientInput): Promise<Client> {
    return await this.ClientModel.findOneAndUpdate({ email: email },UpdateClientInput)
  }

  async remove(email: string): Promise<Client> {
    return await this.ClientModel.findOneAndRemove({ email: email })
  }
}
