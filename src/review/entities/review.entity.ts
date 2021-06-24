import { ObjectType, Field, Int, createUnionType, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Bundle } from 'src/bundle/entities/bundle.entity';
import { Client } from 'src/client/entities/client.entity';
import { Status } from 'src/enums';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/store/entities/store.entity';

export const Reviewable = createUnionType({
  name: 'Reviewable',
  types: () => [Bundle , Store , Product],
  resolveType(value) {
    if (value.title) {
      return Bundle;
    }
    if (value.name) {
      return Product;
    }
    if (value.username) {
      return Store;
    }
    return null;
  },
});

@Schema({ timestamps: true })
@ObjectType()
export class Review extends Document {
  
  @Field(() => String,{ description: 'Id of the review' })
  _id

  @Field(() => Client, { description: 'Review\'s client' })
  @Prop({ type: Types.ObjectId , ref: () => Client })
  client: Client

  @Field(() => Float, { description: 'Review\'s rating' })
  @Prop({ min: 1 , max: 5})
  rating: number

  @Field(() => String, { description: 'Review\'s feedback' })
  @Prop()
  feedback: string
  
  @Field(() => Reviewable , { description: 'Review\'s feedback' , nullable: true })
  @Prop({ type: Types.ObjectId , refPath: 'type' })
  reviewing

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String, required: true, enum: ['Bundle','Store','Product'] })
  type

  @Field(() => String , { description: 'Review\'s type of reported item' })
  @Prop({ type: String,  enum: Status , default: Status.pending})
  status

  @Field(() => Date , { description: 'Review\'s date' })
  createdAt
}


export const ReviewSchema = SchemaFactory.createForClass(Review);
