import { Catch, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { Model, Types } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { StoreService } from 'src/store/store.service';
import { UsersService } from 'src/user/users.service';
import { Conversation, Message } from './entities/conversation.entity';

@Injectable()
export class ConversationService {

  constructor(
    @InjectModel(Conversation.name) private ConversationModel: Model<Conversation>,
    private userService: UsersService,
    private clientService: ClientService,
    private storeService: StoreService,
    @Inject('PUB_SUB') private pubSub: PubSub
  ) { }


  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id) {
    return this.ConversationModel.findById(id).populate(['client', 'seller']).catch(e => null)
  }

  async CurrentUserConversations(email) {
    return (await this.userService.findOne(email)).user.conversations
  }

  async sendMessage(from, to, content) {
    let receiver = await this.userService.findOne(to)

    if ((receiver.role == 'Client' && from.role == 'Store') || (receiver.role == 'Store' && from.role == 'Client')) {

      let client = receiver.role == 'Client' ? receiver.user._id : Types.ObjectId(from.id)
      let store = receiver.role == 'Store' ? receiver.user._id : Types.ObjectId(from.id)

      let converstation = await this.ConversationModel.findOne({ seller: { $eq: store }, client: { $eq: client } }).populate(['client','seller'])

      if (converstation) {
        return await this.updateConversation(converstation, { content, user: from.id })
      } else {
        return await this.updateConversation(await this.createConversation(store, client), { content, user: from.id })
      }
    }

    throw new HttpException(' Messages only sent between Clients and Stores ', 400)
  }

  async updateConversation(conversation: Conversation, message: Message) {
    conversation.messages.push(message)
    conversation.lastMessage = message
    //this.pubSub.publish('New-Conversation', { "New-Conversation" : conversation })
    this.pubSub.publish('New-Message', { conversation, message })
    return await this.ConversationModel.findByIdAndUpdate(conversation._id, conversation)
  }

  async createConversation(store, client) {
    let con = await await new this.ConversationModel({ seller: store, client: client }).save()
    const conversation = await this.ConversationModel.findById(con._id).populate(['client','seller'])
    let storeObject = await this.storeService.findOneApproved(store)
    storeObject.conversations.push(conversation._id)
    await this.storeService.update(store, storeObject)
    let clienteObject = await this.clientService.findById(client)
    clienteObject.conversations.push(conversation._id)
    await this.clientService.update(client, clienteObject)
    this.pubSub.publish('New-Conversation', { "New-Conversation" : conversation })
    return conversation
  }

}
