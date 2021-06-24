import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop} from '@nestjs/mongoose';
import { Status } from 'src/enums';
import { File } from 'src/storage/file.schema'

@Schema({ timestamps: true })
@ObjectType()
export class ModelingReq extends Document {
 
  @Field(() => String)
  _id

  @Field(() => String)
  @Prop({ })
  dimensions: string;

  @Field(() => String)
  @Prop({ })
  discription: string;

  @Field(() => File, { nullable: true})
  @Prop()
  model3D: File;

  @Field(() => [File])
  @Prop({ default: [] })
  refrences: File[];

  @Field(() => String)
  @Prop({ type:String , enum: Status, default: Status.pending })
  status: string;

  @Field(() => Date)
  createdAt

}

export const ModelingReqSchema = SchemaFactory.createForClass(ModelingReq);

