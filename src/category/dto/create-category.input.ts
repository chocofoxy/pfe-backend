import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name:string

  @Field(() => String)
  description:string

  @Field(() => GraphQLUpload)
  image;

  @Field(() => GraphQLUpload)
  icon;
}
