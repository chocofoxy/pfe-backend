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
  @Prop({ type: Types.ObjectId , refPath: 'reporterType' })
  reporter

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String, required: true, enum: ['Client','Store'] })
  reporterType
  
  @Field(() => User)
  @Prop({ type: Types.ObjectId , refPath: 'reportedType' })
  reported

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String, required: true, enum: ['Client','Store'] })
  reportedType


  @Field(() => String)
  @Prop()
  reason: string

}

export const ReportSchema = SchemaFactory.createForClass(Report);

