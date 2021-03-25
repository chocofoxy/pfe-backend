import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { UpdateClientInput } from 'src/client/dto/update-client.input';
import { Client } from 'src/client/entities/client.entity';
import { UpdateStoreInput } from 'src/store/dto/update-store.input';
import { Store } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<Admin>,
    private clientService: ClientService,
    private storeService: StoreService
  ) {
    this.init()
  }

  async init() {
    const admins = await this.AdminModel.countDocuments() == 0
    if (admins) {
      await this.create({ email:"admin" , password: "admin"} as CreateUserInput)
    }
  }
  
  async create(createUserInput: CreateUserInput) {
    if ( await this.findOne(createUserInput.email) == null )
    return await new this.AdminModel(createUserInput).save()
    else
    throw new HttpException('an other account is using this mail',400)
  }

  async findAll(): Promise<User[]> {
    return await this.AdminModel.find()
  }

  async findOne(email: string): Promise<any> {
    const client = await this.clientService.findOne(email)
    const store = await this.storeService.findOne(email)
    const admin = await this.AdminModel.findOne({ email: email})
    
    if (store != null )
    return { user: store, role: Store.name } 
    else if (client != null )
    return { user: client, role: Client.name }
    else if (admin != null  )
    return { user: admin, role: Admin.name }
    else
    return null
  }

  async ban(email: string): Promise<User> {
    const user = await this.findOne(email)
    switch ( user.role ) {
      case 'Client' : { return await this.clientService.update(user.email,{...user , banned: true } as UpdateClientInput) } 
      case 'Store'  : { return await this.storeService.update(user.email,{...user , banned: true } as UpdateStoreInput) } 
      case 'Admin'  : { return await this.update(user.email,{...user , banned: true }) } 
    }
  }

  
  async update(email: string, updateUserInput): Promise<User> {
    return await this.AdminModel.findOneAndUpdate({ email: email },updateUserInput)
  }

  async remove(email: string): Promise<User> {
    return await this.AdminModel.findOneAndRemove({ email: email })
  }
}
