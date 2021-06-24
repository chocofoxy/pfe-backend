import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class CreateModInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  username: string;

}
