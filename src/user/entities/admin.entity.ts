import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { User } from './user.entity';

@Schema()
@ObjectType()
export class Admin extends User {

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
