import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Material } from 'src/material/entities/material.entity';
import { File } from 'src/storage/file.schema'

@ObjectType()
export class Model extends Document {
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => File, { description: 'Product\'s store' })
  @Prop()
  mesh: File;

  @Field(() => [Material], { description: 'Product\'s store' })
  @Prop({ type: [{type: Types.ObjectId , ref: () => Material}] })
  materials: Material[];

}

export const ModelSchema = SchemaFactory.createForClass(Model);
