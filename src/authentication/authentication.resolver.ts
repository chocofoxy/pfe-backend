import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientService } from 'src/client/client.service';
import { CreateClientInput } from 'src/client/dto/create-client.input';
import { Public } from 'src/guards/public.decorator';
import { CreateStoreInput } from 'src/store/dto/create-store.input';
import { StoreService } from 'src/store/store.service';
import { User } from 'src/user/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { AuthInfo, AuthResponse } from './login-user.input';

@Public()
@Resolver()
export class AuthenticationResolver {

  constructor(
    private authService: AuthenticationService, 
    private storeService: StoreService,
    private clientService: ClientService,
    ){}

  @Mutation(() => AuthResponse ,{ nullable: true })
  async login(@Args('authInfo') authInfo: AuthInfo) {
    return this.authService.validate(authInfo.email,authInfo.password);
  }

  @Mutation(() => User)
  signupStore(@Args('informations') createStoreInput: CreateStoreInput) {    
    return this.storeService.create(createStoreInput);
  }

  @Mutation(() => User)
  signupClient(@Args('informations') createClientInput: CreateClientInput) {    
    return this.clientService.create(createClientInput);
  }
  
}
