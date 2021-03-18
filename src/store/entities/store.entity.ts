import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/storage/file.schema'

@Schema()
@ObjectType()
export class Store extends User {

  @Field(() => File)
  @Prop()
  picture: File;

  @Field(() => [File])
  @Prop()
  documents: File[];
 
  @Field(() => [Product], { description: 'products' })
  @Prop({ type: Types.ObjectId , ref: () => Product })
  products: Product[] ;
  
  @Field(() => [Order], { description: 'orders' })
  @Prop({ type: Types.ObjectId , ref: () => Order })
  orders: Order[];

  @Field(() => [Review], { description: "Reviews"})
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }]})
  reviews: Review[]
  
  @Field(() => Boolean)
  @Prop()
  approved: Boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
