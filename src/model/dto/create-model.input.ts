import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModelInput {
  @Field(() => String, { description: 'Id' })
  id: string;
}
