import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

@Schema()
@ObjectType()
export class Category extends Document {

  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  name:string

  @Field(() => Boolean)
  @Prop()
  approved:boolean

  @Field(() => [Product])
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] })
  products//:Product[]

}

export const CategorySchema = SchemaFactory.createForClass(Category);
