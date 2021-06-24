import { CreateModelInput } from './create-model.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class UpdateModelInput extends PartialType(CreateModelInput) {

  @Field(() => String, { description: 'Id' })
  productId: string;

  @Field(() => String, { description: 'Id' })
  id: string;

  @Field(() => GraphQLUpload)
  mesh;
}
