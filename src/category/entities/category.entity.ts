import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Status } from 'src/enums';
import { Product } from 'src/product/entities/product.entity';

@Schema()
@ObjectType()
export class Category extends Document {

  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ type:String , enum: Status, default: Status.pending })
  status: string;

  @Field(() => [Product])
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] })
  products

}

export const CategorySchema = SchemaFactory.createForClass(Category);
