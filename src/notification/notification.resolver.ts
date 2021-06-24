import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification, NotificationEvent } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { Order } from 'src/order/entities/order.entity';
import { CurrentUser } from 'src/guards/current-user.decorator';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService, @Inject('PUB_SUB') private pubSub: PubSub) { }

  @Query(() => Notification)
  getNotification(@CurrentUser() user) {
    return this.notificationService.myNontifications(user.email)
  }

  @Subscription(() => NotificationEvent, {
    name: 'notificationAdded',
    filter: async function (this: NotificationResolver, payload, varaibles, context) {
      const user = context.req.user
      const { event, userId } = payload.notificationAdded

      if (userId == user.id)
        return false

      //console.log(user.id, event.item.client._id)
      if (user.id == event.item.client._id || user.id == event.item.itemOrdred.store || user.id == event.item.itemOrdred.store._id )
        return true

      return false
    },
    async resolve(this: NotificationResolver, value) {
      const { event } = value.notificationAdded
      return event;
    }
  })
  handleNotification() {
    return this.pubSub.asyncIterator('notificationAdded');
  }


  @Subscription(() => NotificationEvent, {
    name: 'adminNotification',
    filter: async function (this: NotificationResolver, payload, varaibles, context) {
      const user = context.req.user
      
      if ( user.email == "tynassit@gmail.com" )
      return true

      return false
    },
    async resolve(this: NotificationResolver, value) {
      const { event } = value
      return event;
    }
  })
  adminNotification() {
    return this.pubSub.asyncIterator('adminNotification');
  }
}
