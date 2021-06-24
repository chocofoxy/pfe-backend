import { forwardRef , Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/user/users.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private NotificationModel: Model<Notification>,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService 
    ) {}
  
  async create() {
    return await new this.NotificationModel().save()
  }

  async findAll(): Promise<Notification[]> {
    return await this.NotificationModel.find()
  }

  async findOne(id: string): Promise<Notification> {
    return await this.NotificationModel.findOne({ _id: id })
  }

  async update(id: string, updateNotificationInput): Promise<Notification> {
    return await this.NotificationModel.findOneAndUpdate({ _id: id },updateNotificationInput)
  }

  async remove(id: string): Promise<Notification> {
    return await this.NotificationModel.findOneAndRemove({ _id: id })
  }

  async addEvent ( event , userEmail ) {
    const data = await this.userService.findOne(userEmail)
    //console.log(data.user)
    let notification = await this.findOne(data.user.notification)
    notification.events.push(event)
    return await this.update(notification._id, notification)
  }

  async addEventToAdmin ( event ) {
    const data = await this.userService.findOne("tynassit@gmail.com")
    //console.log(data.user)
    let notification = await this.findOne(data.user.notification)
    notification.events.push(event)
    return await this.update(notification._id, notification)
  }

  async myNontifications (userEmail) {
    const { user } = await this.userService.findOne(userEmail)
    let notification = await this.findOne(user.notification)
    return notification
  }
}
