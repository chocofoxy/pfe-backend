import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity'

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private NotificationModel: Model<Notification>) {}
  
  async create() {
    return await new this.NotificationModel().save()
  }

  async findAll(): Promise<Notification[]> {
    return await this.NotificationModel.find()
  }

  async findOne(id: string): Promise<Notification> {
    return await this.NotificationModel.findOne({ id: id })
  }

  async update(id: string, updateNotificationInput: UpdateNotificationInput): Promise<Notification> {
    return await this.NotificationModel.findOneAndUpdate({ id: id },UpdateNotificationInput)
  }

  async remove(id: string): Promise<Notification> {
    return await this.NotificationModel.findOneAndRemove({ id: id })
  }
}
