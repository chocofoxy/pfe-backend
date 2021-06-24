import { ObjectType, Field, Int, createUnionType } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Report extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => ReportParty)
  @Prop({ type: Types.ObjectId , refPath: 'reporterType' })
  reporter

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String, required: true, enum: ['Client','Store'] })
  reporterType
  
  @Field(() => ReportParty)
  @Prop({ type: Types.ObjectId , refPath: 'reportedType' })
  reported

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String, required: true, enum: ['Client','Store'] })
  reportedType


  @Field(() => String)
  @Prop()
  reason: string

}

export const ReportParty = createUnionType({
  name: 'ReportParty',
  types: () => [Client, Store],
  resolveType(value) {
    if (value.image) {
      return Client;
    }
    if (value.logo) {
      return Store;
    }
    return null;
  },
});

export const ReportSchema = SchemaFactory.createForClass(Report);

