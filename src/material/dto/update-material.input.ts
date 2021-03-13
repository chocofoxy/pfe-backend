import { CreateMaterialInput } from './create-material.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMaterialInput extends PartialType(CreateMaterialInput) {
  @Field(() => String)
  id: string;
}
