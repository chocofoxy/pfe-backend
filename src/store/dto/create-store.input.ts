import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoreInput {
  @Field(() => String)
  id: string;
}
