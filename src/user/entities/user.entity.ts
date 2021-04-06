import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import  { Notification } from 'src/notification/entities/notification.entity'

@Schema()
@ObjectType()
export class User extends Document {

  @Field(() => String)
  _id

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop({ unique: true})
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => Int)
  @Prop()
  tel: number;

  @Field(() => Boolean )
  @Prop({ default: false })
  banned: boolean

  @Field(() => Notification, { description: "Reviews"})
  @Prop({ type: Types.ObjectId , ref: () => Notification })
  notification

}

export const UserSchema = SchemaFactory.createForClass(User);
