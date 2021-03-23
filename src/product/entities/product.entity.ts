import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Model } from 'src/model/entities/model.entity';
import { Review } from 'src/review/entities/review.entity';
import { Store } from 'src/store/entities/store.entity';
import { File } from 'src/storage/file.schema'

@Schema()
@ObjectType()
export class Product extends Document {
  
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => String, { description: 'Product name' })
  @Prop()
  name: string;

  @Field(() => Float, { description: 'Product price' })
  @Prop()
  price: number;
 
  @Field(() => String, { description: 'Product description' })
  @Prop()
  description: string;
  
  @Field(() => [File], { description: 'Product\'s images' })
  @Prop()
  images: File[];

  @Field(() => Model, { description: 'Product\'s model' })
  @Prop({ type: Types.ObjectId , ref: () => Model })
  model3d: Model;  
  
  @Field(() => Store, { description: 'Product\'s store' })
  @Prop({ type: Types.ObjectId , ref: () => Store })
  store: Store;

  @Field(() => [Review], { description: "Reviews"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }]})
  reviews: Review[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);

