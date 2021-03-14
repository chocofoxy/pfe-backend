import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Model } from 'src/model/entities/model.entity';
import { Reviewable } from 'src/review/entities/reviewable';
import { Store } from 'src/store/entities/store.entity';
import { File } from 'multer'

@Schema()
@ObjectType()
export class Product extends Reviewable {
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => String, { description: 'Product name' })
  @Prop()
  name: string;

  @Field(() => Float, { description: 'Product price' })
  @Prop()
  price: number;

  @Field(() => [File], { description: 'Product\'s images' })
  @Prop()
  images: File[];

  @Field(() => Model, { description: 'Product\'s model' })
  @Prop({ type: Types.ObjectId , ref: () => Model })
  model3d: Model;  
  
  @Field(() => Store, { description: 'Product\'s store' })
  @Prop({ type: Types.ObjectId , ref: () => Store })
  store: Store;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

