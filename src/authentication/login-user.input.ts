import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class AuthInfo {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string

  @Field(() => String)
  role: string

  @Field(() => User)
  user: User
}

