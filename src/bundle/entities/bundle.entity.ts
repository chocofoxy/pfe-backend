import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { Store } from 'src/store/entities/store.entity';

@Schema()
@ObjectType()
export class Bundle extends Document {

  @Field(() => String,{ description: 'Id of the bundle' })
  _id

  @Field(() => String, { description: 'title of the bundle' })
  @Prop()
  title: string

  @Field(() => [Product], { description: 'Array of bundle\'s products' })
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] })
  products

  @Field(() => Store , { description: 'undle\'s store' })
  @Prop({ type: Types.ObjectId , ref: () => Store })
  store

  @Field(() => Float, { description: 'Price of the bundle' })
  @Prop()
  price: Number

  @Field(() => [Review], { description: "Reviews"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }]})
  reviews

}

export const BundleSchema = SchemaFactory.createForClass(Bundle);
