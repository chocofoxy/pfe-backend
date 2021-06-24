import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class UpdateUserInput  {
 
  @Field(() => String,{ nullable: true })
  username: string;

  @Field(() => Int,{ nullable: true })
  tel: Number;

  @Field(() => GraphQLUpload,{ nullable: true })
  image

}
