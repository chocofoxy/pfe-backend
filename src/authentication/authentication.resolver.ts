import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientService } from 'src/client/client.service';
import { CreateClientInput } from 'src/client/dto/create-client.input';
import { Public } from 'src/guards/public.decorator';
import { save } from 'src/storage/storage';
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
  async signupStore(@Args('informations') createStoreInput: CreateStoreInput) {    
    let logo = await save(createStoreInput.image).then(f=>f)
    let images = []
    for (let file of createStoreInput.files) {
      images.push(await save(file).then((f) => file = f).catch(e => ''))
    }
    //console.log({...createStoreInput, logo: logo  , documents: images })
    return this.storeService.create({...createStoreInput, logo: logo  , documents: images });
  }

  @Mutation(() => User)
  async signupClient(@Args('informations') createClientInput: CreateClientInput) { 
    console.log(createClientInput.image)
    let image = await save(createClientInput.image).then(f=>f)
    console.log({...createClientInput, image: image })
    return this.clientService.create({...createClientInput, image: image });
  }
  
  @Mutation(() => String)
  async activateAccount(@Args('email', { type: () => String }) email: string, @Args('code', { type: () => String }) code: string ) { 
    return this.authService.confirmEmail({ code , email })
  }
}
