import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';

@ObjectType()
export class Message {
  @Field(() => String)
  user: String

  @Field(() => String)
  content: string
}

@ObjectType()
export class MessageEvent {
  @Field(() => String)
  conversation: String

  @Field(() => Message)
  message: Message
}

@Schema({ useNestedStrict: false})
@ObjectType()
export class Conversation extends Document {

  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => Store)
  @Prop({ type: Types.ObjectId , ref: () => Store })
  seller

  @Field(() => Client)
  @Prop({ type: Types.ObjectId , ref: () => Client })
  client;

  @Field(() => Message , { nullable: true})
  @Prop({ default: null })
  lastMessage: Message

  @Field(() => [Message])
  @Prop({ default: []})
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
