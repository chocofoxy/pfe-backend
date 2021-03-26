import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Client extends User {

    @Field(() => [Order])
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Order }] })
    orders
    
    @Field(() => [Product])
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] })
    watchlist
}

export const ClientSchema = SchemaFactory.createForClass(Client);
