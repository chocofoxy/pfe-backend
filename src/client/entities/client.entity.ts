import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { File } from 'src/storage/file.schema';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Client extends User {

    @Field(() => [Order] , { nullable: true })
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Order }] , default: [] })
    orders
    
    @Field(() => [Product] )
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] , default: [] })
    watchlist

    @Field(() => Date )
    createdAt

    @Field(() => File ) 
    @Prop()
    image: File
}

export const ClientSchema = SchemaFactory.createForClass(Client);
