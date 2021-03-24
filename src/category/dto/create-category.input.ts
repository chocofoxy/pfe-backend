import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name:string

  @Field(() => Boolean)
  approved:boolean
}
