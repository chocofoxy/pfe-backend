import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  id: string;
}
