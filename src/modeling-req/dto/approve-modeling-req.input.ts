import { CreateModelingReqInput } from './create-modeling-req.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class ApproveModelingReqInput  {
  
  @Field(() => String)
  id: string;

  @Field(() => GraphQLUpload )
  file
}
