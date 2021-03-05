import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { AuthInfo } from './login-user.input';

@Resolver()
export class AuthenticationResolver {

  constructor(private authService: AuthenticationService, private usersService: UsersService){}

  @Mutation(() => Object)
  login(@Args('authInfo') authInfo: AuthInfo) {
    return this.authService.validateUser(authInfo.email,authInfo.password);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
