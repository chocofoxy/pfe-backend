import { CreateModelInput } from './create-model.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModelInput extends PartialType(CreateModelInput) {
  @Field(() => String, { description: 'Id' })
  id: string;
}
