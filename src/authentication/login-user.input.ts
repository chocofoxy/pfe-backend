import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AuthInfo {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

}
