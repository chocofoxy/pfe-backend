import { InputType, Int, Field, Directive } from '@nestjs/graphql';
import { GraphQLUpload } from "apollo-server-express"

@InputType()
export class CreateMaterialInput {
  @Field(() => String)
  color: string;

  @Field(() => GraphQLUpload)
  file
}
