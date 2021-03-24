import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Report extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId , ref: () => [Store,Client] })
  user

  @Field(() => User)
  @Prop({ type: Types.ObjectId , ref: () => [Store,Client] })
  reported

  @Field(() => String)
  @Prop()
  reason: string

}

export const ReportSchema = SchemaFactory.createForClass(Report);
