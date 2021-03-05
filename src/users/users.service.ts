import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  
  async create(createUserInput: CreateUserInput) {
    return await this.UserModel.create(CreateUserInput)
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find()
  }

  async findOne(email: string): Promise<User> {
    return await this.UserModel.findOne({ email: email })
  }

  async update(email: string, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.UserModel.findOneAndUpdate({ email: email },UpdateUserInput)
  }

  async remove(email: string): Promise<User> {
    return await this.UserModel.findOneAndRemove({ email: email })
  }
}
