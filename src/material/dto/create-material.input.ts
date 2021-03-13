import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaterialInput {
  @Field(() => String)
  id: string;
}
