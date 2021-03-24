import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema()
@ObjectType()
export class Notification extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => [String])
  @Prop()
  events: string[]
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
