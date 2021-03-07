import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/guards/public.decorator';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { AuthInfo } from './login-user.input';

@Public()
@Resolver()
export class AuthenticationResolver {

  constructor(private authService: AuthenticationService, private usersService: UsersService){}

  @Mutation(() => String,{ nullable: true })
  async login(@Args('authInfo') authInfo: AuthInfo) {
    return this.authService.validate(authInfo.email,authInfo.password);
  }

  @Mutation(() => User)
  signup(@Args('informations') createUserInput: CreateUserInput) {    
    return this.usersService.create(createUserInput);
  }
}
