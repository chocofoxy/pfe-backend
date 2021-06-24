import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Public } from 'src/guards/public.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/enums';
import { Order } from 'src/order/entities/order.entity';
import { Inject } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { CurrentUser, getUser } from 'src/guards/current-user.decorator';
import { save } from 'src/storage/storage';

@Resolver(() => Store)
export class StoreResolver {

  constructor(
    private readonly storeService: StoreService,
    @Inject('PUB_SUB') private pubSub: PubSub
  ) { }

  @Public()
  @Mutation(() => Store)
  async createStore(@Args('createStoreInput') createStoreInput: CreateStoreInput) {
    let logo = await save(createStoreInput.image).then(f=>f)
    let images = []
    for (let file of createStoreInput.files) {
      images.push(await save(file).then((f) => file = f).catch(e => ''))
    }
    console.log({...createStoreInput, logo: logo  , documents: images })
    return this.storeService.create({...createStoreInput, logo: logo  , documents: images });
  }

  @Public()
  @Query(() => [Store], { name: 'stores' })
  findAll() {
    return this.storeService.findAllApproved();
  }

  @Roles(Role.admin,Role.moderator)
  @Query(() => [Store], { name: 'storesAll' })
  storesAll() {
    return this.storeService.findAll();
  }

  @Public()
  @Query(() => Store, { name: 'store' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.storeService.findOneApproved(id);
  }

  @Roles(Role.store)
  @Query(() => Store, { name: 'currentStore' })
  currentStore(@CurrentUser() user) {
    return this.storeService.findOneApprovedInventory(user.id);
  }

  @Roles(Role.admin, Role.store)
  @Mutation(() => Store)
  updateStore(@Args('updateStoreInput') updateStoreInput: UpdateStoreInput) {
    return this.storeService.update(updateStoreInput.id, updateStoreInput);
  }

  @Roles(Role.admin, Role.store)
  @Mutation(() => Store)
  removeStore(@Args('id', { type: () => String }) id: string) {
    return this.storeService.remove(id);
  }

  @Roles(Role.admin,Role.moderator)
  @Mutation(() => Store)
  approveStore(@Args('id', { type: () => String }) id: string) {
    return this.storeService.approve(id);
  }

  
  @Roles(Role.store)
  @Mutation(() => Store)
  subscribeToPremium(@CurrentUser() user )  {
    return this.storeService.subscribeToPremium(user.id);
  }

  @Roles(Role.store)
  @Query(() => Store)
  approvedProduct(@CurrentUser() user )  {
    return this.storeService.storeApprovedProducts(user.id);
  }

}
