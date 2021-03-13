import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

@Schema()
@ObjectType()
export class Bundle extends Document {

  @Field(() => String,{ description: 'Id of the bundle' })
  _id: ObjectId;

  @Field(() => String, { description: 'title of the bundle' })
  @Prop()
  title: string

  @Field(() => [Product], { description: 'Array of bundle\'s products' })
  @Prop({ type: [{ type: Types.ObjectId , ref: Product }] })
  products: Product[]

  @Field(() => Float, { description: 'Price of the bundle' })
  @Prop()
  price: Number

}

export const BundleSchema = SchemaFactory.createForClass(Bundle);
