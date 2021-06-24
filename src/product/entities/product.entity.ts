import { ObjectType, Field, Int, Float, createUnionType } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Model } from 'src/model/entities/model.entity';
import { Review } from 'src/review/entities/review.entity';
import { Store } from 'src/store/entities/store.entity';
import { File } from 'src/storage/file.schema'
import { Category } from 'src/category/entities/category.entity';
import { Status } from 'src/enums';
import { Bundle } from 'src/bundle/entities/bundle.entity';

export const OrderItem = createUnionType({
  name: 'OrderItem',
  types: () => [Product, Bundle],
  resolveType(value) {
    if (value.title) {
      return Bundle;
    }
    if (value.name) {
      return Product;
    }
    return null;
  },
});

@Schema({ timestamps: true })
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

  @Field(() => Float, { description: 'Product rating' })
  @Prop({ default: 0 })
  rating: number;
 
  @Field(() => String, { description: 'Product description' })
  @Prop()
  description: string;
  
  @Field(() => [File], { description: 'Product\'s images' })
  @Prop()
  images: File[];

  @Field(() => Model, { description: 'Product\'s model' ,nullable: true})
  @Prop({ type: Types.ObjectId , ref: () => Model })
  model3d 

  @Field(() => Category, { description: 'Product\'s category' })
  @Prop({ type: Types.ObjectId , ref: () => Category })
  category
  
  @Field(() => Store, { description: 'Product\'s store' })
  @Prop({ type: Types.ObjectId , ref: () => Store })
  store

  @Field(() => [Review], { description: "Reviews"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }] , default: [] })
  reviews

  @Field(() => Int ,{ nullable: true })
  @Prop({ default: null })
  quantity: number

  @Field(() => String  ,{ nullable: true })
  @Prop({ default: null })
  size: string

  @Field(() => Float  ,{ nullable: true })
  @Prop({ default: null })
  weight: number

  @Field(() => String  ,{ nullable: true })
  @Prop({ default: null })
  material: string

  @Field(() => Boolean )
  @Prop({ default: true })
  available: boolean

  @Field(() => String)
  @Prop({ type:String , enum: Status, default: Status.pending })
  status: string;

  @Field(() => Date)
  createdAt

  @Field(() => Date)
  updatedAt
}

export const ProductSchema = SchemaFactory.createForClass(Product);

