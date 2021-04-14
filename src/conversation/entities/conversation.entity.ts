import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';

@Schema()
@ObjectType()
export class Conversation extends Document {

  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => Store)
  @Prop({ type: Types.ObjectId , ref: () => Store })
  seller

  @Field(() => Client)
  @Prop({ type: Types.ObjectId , ref: () => Client })
  client
/*
  @Field(() => [Message])
  @Prop()
  messages: Message[];*/
}
/*
@ObjectType()
export class Message {
  @Field(() => Boolean)
  client: Boolean

  @Field(() => String)
  content: string
}*/

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
