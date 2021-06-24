import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';

@Schema()
@ObjectType()
export class Notification extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => [NotificationEvent] ,{ nullable: true })
  @Prop()
  events: NotificationEvent[]
}

@ObjectType()
export class NotificationEvent {

  @Field(() => String)
  message: string

  @Field(() => String)
  type: string

  @Field(() => Order)
  item 
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
