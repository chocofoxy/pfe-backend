import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private ClientModel: Model<Client>) {}
  
  async create(createClientInput: CreateClientInput) {
    return await new this.ClientModel(createClientInput).save()
  }

  async findAll(): Promise<Client[]> {
    return await this.ClientModel.find()
  }

  async findOne(id: string): Promise<Client> {
    return await this.ClientModel.findOne({ id: id })
  }

  async update(id: string, updateClientInput: UpdateClientInput): Promise<Client> {
    return await this.ClientModel.findOneAndUpdate({ id: id },UpdateClientInput)
  }

  async remove(id: string): Promise<Client> {
    return await this.ClientModel.findOneAndRemove({ id: id })
  }
}
