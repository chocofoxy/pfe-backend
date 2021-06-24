import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { GraphqlFiles } from 'src/storage/file.interceptor';

@InputType()
export class CreateModelInput {

  @Field(() => String)
  product: string;


  @Field(() => GraphQLUpload)
  mesh;

}
