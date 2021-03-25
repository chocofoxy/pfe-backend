import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Client extends User {

    @Field(() => [Order])
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Order }] })
    orders
    
}

export const ClientSchema = SchemaFactory.createForClass(Client);
