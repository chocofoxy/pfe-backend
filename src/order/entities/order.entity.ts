import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Status } from 'src/enums';
import { Product } from 'src/product/entities/product.entity';


@Schema({ useNestedStrict: false })
@ObjectType()
export class Order extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => Product)
  @Prop()
  product: Product

  @Field(() => Client )
  @Prop({ type: Types.ObjectId , ref: () => Client })
  client

  @Field(() => Int )
  @Prop()
  quantity: number

  @Field(() => String )
  @Prop({ type: String , enum: Status , default: Status.pending })
  status: string

}

export const OrderSchema = SchemaFactory.createForClass(Order);
