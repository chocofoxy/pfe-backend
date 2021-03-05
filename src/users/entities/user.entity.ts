import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop({ unique: true})
  email: string;

  @Field(() => String)
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
