import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { GraphqlFiles } from 'src/storage/file.interceptor';

@InputType()
export class CreateModelInput {

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => GraphQLUpload)
  mesh;

  @Field(() => String)
  description: string;
  
}
