import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { AuthInfo } from './login-user.input';

@Resolver()
export class AuthenticationResolver {

  constructor(private authservice: AuthenticationService){}

  @Mutation(() => Object)
  login(@Args('authInfo') authInfo: AuthInfo) {
    return this.authservice.validateUser(authInfo.email,authInfo.password);
  }
}
