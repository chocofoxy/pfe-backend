import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import  { Notification } from 'src/notification/entities/notification.entity'

@Schema({ timestamps: true })
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

  @Field(() => Boolean )
  @Prop({ default: false })
  EmailConfirmation: boolean

  @Field(() => Notification, { description: "Notification"})
  @Prop({ type: Types.ObjectId , ref: () => Notification })
  notification

  @Field(() => [Conversation] , { description: "Conversations"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Conversation }] })
  conversations

  @Field(() => Date )
  createdAt

}

export const UserSchema = SchemaFactory.createForClass(User);
