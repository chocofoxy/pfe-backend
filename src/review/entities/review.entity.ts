import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/store/entities/store.entity';

@Schema()
@ObjectType()
export class Review extends Document {
  @Field(() => String,{ description: 'Id of the review' })
  _id: ObjectId;

  @Field(() => Client, { description: 'Review\'s client' })
  @Prop({ type: Types.ObjectId , ref: Client })
  client: Client

  @Field(() => Int, { description: 'Review\'s rating' })
  @Prop({ min: 1 , max: 5})
  rating: number

  @Field(() => String, { description: 'Review\'s feedback' })
  @Prop()
  feedback: string
  /*
  @Field(() => Client || Store || Product , { description: 'Review\'s feedback' })
  @Prop({ type: Types.ObjectId , ref: Client || Store || Product })
  reviewing: Client | Store | Product */
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
