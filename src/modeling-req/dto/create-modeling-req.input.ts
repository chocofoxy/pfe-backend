import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class CreateModelingReqInput {
  
  @Field(() => String)
  dimensions: string;

  @Field(() => String)
  discription: string;

  @Field(() => [GraphQLUpload])
  refrences

}
