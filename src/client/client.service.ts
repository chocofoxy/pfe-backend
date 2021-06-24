import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { encrypte } from 'src/storage/encryption';
import { UsersService } from 'src/user/users.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private ClientModel: Model<Client>,
    private notificationService: NotificationService,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }

  async create(createClientInput) {
    if (await this.usersService.findOne(createClientInput.email) == null) {
      createClientInput.password = await encrypte(createClientInput.password)
      const client = await new this.ClientModel({
        ...createClientInput,
        notification: (await this.notificationService.create())._id
      }).save()
      await this.usersService.sendEmail(createClientInput.email, `${await encrypte(createClientInput.email)}`)
      const event = { message: ' a new client joined the website ', type: 'Client', item: client }
      this.pubSub.publish('adminNotification', { event })
      await this.notificationService.addEventToAdmin(event)
      return client
    }
    else
      throw new HttpException('another account is using this mail', 400)
  }

  async findAll(): Promise<Client[]> {
    return await this.ClientModel.find().populate(['orders'])
  }

  async findOne(email: string): Promise<Client> {
    return await this.ClientModel.findOne({ email: email }).populate(['conversations', 'watchlist'])
  }

  async findById(id: string): Promise<Client> {
    return await this.ClientModel.findOne({ _id: id })
  }

  async profile(id: string): Promise<Client> {
    let profile = await this.ClientModel.findOne({ _id: id })
      .populate({ path: 'conversations', populate: ['seller', 'client'] })
      .populate({ path: 'watchlist', populate: { path: 'store' }, match: { status: 'Confirmed' } })
      .populate({ path: 'orders', populate: [{ path: 'item', populate: { path: 'store' } }] })
    return profile
  }

  async watchlist(id: string): Promise<any> {
    return await (await this.ClientModel.findOne({ _id: id })).watchlist
  }

  async update(id: string, updateClientInput): Promise<Client> {
    return await this.ClientModel.findOneAndUpdate({ _id: id }, updateClientInput)
  }

  async remove(email: string): Promise<Client> {
    return await this.ClientModel.findOneAndRemove({ email: email })
  }

  async count() {
    return await this.ClientModel.find().count()
  }
}
