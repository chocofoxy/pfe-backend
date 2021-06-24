import { InputType, Int, Field, Directive } from '@nestjs/graphql';
import { GraphQLUpload } from "apollo-server-express"

@InputType()
export class CreateMaterialInput {

  @Field(() => String)
  product: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  description: string;

  @Field(() => GraphQLUpload)
  texture
}
