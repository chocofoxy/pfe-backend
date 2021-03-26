import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

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
  Banned: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);
