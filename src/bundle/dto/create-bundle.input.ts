import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBundleInput {
  @Field(() => String)
  id: string;
}
