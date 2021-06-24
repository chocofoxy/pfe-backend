import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Status } from 'src/enums';
import { Product } from 'src/product/entities/product.entity';
import { File } from 'src/storage/file.schema';

@Schema()
@ObjectType()
export class Category extends Document {

  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ unique: true })
  name: string;

  @Field(() => File,{ nullable: true})
  @Prop()
  image: File;

  @Field(() => File,{ nullable: true})
  @Prop()
  icon: File;

  @Field(() => String,{ nullable: true})
  @Prop()
  description: string;

  @Field(() => String)
  @Prop({ type:String , enum: Status, default: Status.pending })
  status: string;

  @Field(() => [Product])
  @Prop({ type: [{ type: Types.ObjectId , ref: () => Product }] , default:[] })
  products

}

export const CategorySchema = SchemaFactory.createForClass(Category);
