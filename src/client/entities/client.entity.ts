import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Client extends User {
  
}

export const ClientSchema = SchemaFactory.createForClass(Client);
