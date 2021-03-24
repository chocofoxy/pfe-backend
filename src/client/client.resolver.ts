import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Public } from 'src/guards/public.decorator';
import { Roles } from 'src/guards/roles.decorator';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Public()
  @Mutation(() => Client)
  createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientService.create(createClientInput);
  }

  @Roles('Admin')
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
