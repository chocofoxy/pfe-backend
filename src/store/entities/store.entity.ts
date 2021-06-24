import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/storage/file.schema'
import { Bundle } from 'src/bundle/entities/bundle.entity';
import { ModelingReq } from 'src/modeling-req/entities/modeling-req.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Store extends User {

  @Field(() => [File])
  @Prop()
  documents: File[];
 
  @Field(() => [Product], { description: 'products', nullable: true })
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }]  , default: [] })
  products

  @Field(() => [ModelingReq], { description: 'Modeling requests', nullable: true })
  @Prop({ type: [{ type: Types.ObjectId , ref: () => ModelingReq }]  , default: [] })
  requests

  @Field(() => [Bundle], { description: 'bundles', nullable: true })
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Bundle }] , default: [] })
  bundles
  
  @Field(() => [Order], { description: 'orders' , nullable: true })
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Order }] , default: [] })
  orders

  @Field(() => [Review], { description: "Reviews"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }] ,  default: [] })
  reviews

  @Field(() => Float, { description: 'Rating' })
  @Prop({ default: 0 })
  rating: number;
 
  @Field(() => Boolean)
  @Prop({ default: false })
  approved: Boolean;

  @Field(() => File, { description: 'Store\'s logo ' })
  @Prop()
  logo: File

  @Field(() => Boolean, { description: 'Store\'s logo ' })
  @Prop({ default: false })
  subscribed: Boolean

  @Field(() => Date )
  createdAt
}

export const StoreSchema = SchemaFactory.createForClass(Store);
