import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Public } from 'src/guards/public.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/enums';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @Mutation(() => Store)
  createStore(@Args('createStoreInput') createStoreInput: CreateStoreInput) {
    return this.storeService.create(createStoreInput);
  }

  @Public()
  @Query(() => [Store], { name: 'stores' })
  findAll() {
    return this.storeService.findAll();
  }

  @Public()
  @Query(() => Store, { name: 'store' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.storeService.findOne(id);
  }

  @Roles(Role.admin,Role.store)
  @Mutation(() => Store)
  updateStore(@Args('updateStoreInput') updateStoreInput: UpdateStoreInput) {
    return this.storeService.update(updateStoreInput.id, updateStoreInput);
  }

  @Roles(Role.admin,Role.store)
  @Mutation(() => Store)
  removeStore(@Args('id', { type: () => String }) id: string) {
    return this.storeService.remove(id);
  }

  @Roles(Role.admin)
  @Mutation(() => Store)
  approveStore(@Args('id', { type: () => String }) id: string) {
    return this.storeService.approve(id);
  }
}
