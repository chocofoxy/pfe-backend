import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';


@Schema()
@ObjectType()
export class Product extends Document {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

