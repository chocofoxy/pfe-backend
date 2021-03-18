import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { File } from 'src/storage/file.schema'

@Schema()
@ObjectType()
export class Material extends Document{
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Field(() => String, { description: 'Color' })
  @Prop()
  color: string;

  @Field(() => File, { description: 'File' })
  @Prop()
  file: File;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
