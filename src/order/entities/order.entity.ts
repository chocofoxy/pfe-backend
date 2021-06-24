import { ObjectType, Field, Int, createUnionType } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types, } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Status } from 'src/enums';
import { Material } from 'src/material/entities/material.entity';
import { OrderItem, Product } from 'src/product/entities/product.entity';

@Schema({ useNestedStrict: false , timestamps: true })
@ObjectType()
export class Order extends Document {
  @Field(() => String)
  _id: string;

  @Field(() => OrderItem )
  @Prop({ type: SchemaTypes.Mixed })
  itemOrdred 

  @Field(() => OrderItem)
  @Prop({ type: Types.ObjectId , refPath: 'type' })
  item

  @Field(() => String ,)
  @Prop({ type: String, required: true, enum: ['Bundle','Product'] , default:'Product'})
  type

  @Field(() => Client )
  @Prop({ type: Types.ObjectId , ref: () => Client })
  client

  @Field(() => Int )
  @Prop({ min: 1 , max: 100 , default: 1 })
  quantity: number

  @Field(() => String )
  @Prop({ type: String , enum: Status , default: Status.pending })
  status: string

  @Field(() => Boolean )
  @Prop({ type: Boolean , default: false })
  reviewed

  @Field(() => Material, { nullable: true })
  @Prop({ type: Types.ObjectId , ref: () => Material })
  material

  @Field(() => Date )
  createdAt
}



export const OrderSchema = SchemaFactory.createForClass(Order);
