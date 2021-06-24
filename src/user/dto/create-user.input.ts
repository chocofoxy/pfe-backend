import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  tel: Number;

  @Field(() => String)
  username: string;

  @Field(() => [GraphQLUpload] , { nullable: true })
  files

  @Field(() => GraphQLUpload)
  image
}
