import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Public } from 'src/guards/public.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { userInfo } from 'os';
import { Role } from 'src/enums';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Public()
  @Mutation(() => Client)
  createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientService.create(createClientInput);
  }

  @Roles('Admin',Role.moderator)
  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Public()
  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.clientService.findOne(id);
  }

  @Roles('Client')
  @Query(() => Client, { name: 'CurrentClient' })
  CurrentClient(@CurrentUser() user) {
    return this.clientService.profile(user.id);
  }

  @Roles('Client')
  @Query(() => [String], { name: 'watchlist' })
  watchlist(@CurrentUser() user) {
    return this.clientService.watchlist(user.id);
  }

  @Roles('Client')
  @Mutation(() => Client)
  updateClient(@Args('updateClientInput') updateClientInput: UpdateClientInput) {
    return this.clientService.update(updateClientInput.id, updateClientInput);
  }

  @Roles('Admin','Client')
  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => String }) id: string) {
    return this.clientService.remove(id);
  }
  
}
