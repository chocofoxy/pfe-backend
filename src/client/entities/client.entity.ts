import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema()
@ObjectType()
export class Client extends Document {

  @Field(() => String, { description: 'Id' })
  _id: string;
  
}

export const ClientSchema = SchemaFactory.createForClass(Client);
