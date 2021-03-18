import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(/*@InjectModel(User.name) private UserModel: Model<User>*/
    private clientService: ClientService,
    private storeService: StoreService
  ) {}
  /*
  async create(createUserInput: CreateUserInput) {
    return await new this.UserModel(createUserInput).save()
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find()
  }*/

  async findOne(email: string): Promise<any> {
    const client = await this.clientService.findOne(email)
    const store = await this.storeService.findOne(email)

    if (store)
    return { user: store, role: Store.name } 
    else if (client)
    return { user: client, role: Client.name }
    else
    return null
  }
  /*
  async update(email: string, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.UserModel.findOneAndUpdate({ email: email },UpdateUserInput)
  }

  async remove(email: string): Promise<User> {
    return await this.UserModel.findOneAndRemove({ email: email })
  }*/
}
