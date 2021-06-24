import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BundleService } from './bundle.service';
import { Bundle } from './entities/bundle.entity';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';
import { Public } from 'src/guards/public.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Role } from 'src/enums';

@Resolver(() => Bundle)
export class BundleResolver {
  constructor(private readonly bundleService: BundleService) {}

  @Roles(Role.admin,Role.store)
  @Mutation(() => Bundle)
  createBundle(@Args('createBundleInput') createBundleInput: CreateBundleInput, @CurrentUser() user ) {
    return this.bundleService.create({...createBundleInput, store: user.id });
  }

  @Public()
  @Query(() => [Bundle], { name: 'bundles' })
  findAll() {
    return this.bundleService.findAll();
  }

  @Public()
  @Query(() => Bundle, { name: 'bundle' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bundleService.findOne(id);
  }

  @Roles(Role.admin,Role.store)
  @Mutation(() => Bundle)
  updateBundle(@Args('updateBundleInput') updateBundleInput: UpdateBundleInput) {
    return this.bundleService.update(updateBundleInput.id, updateBundleInput);
  }

  @Roles(Role.admin,Role.store)
  @Mutation(() => Bundle)
  removeBundle(@Args('id', { type: () => String }) id: string) {
    return this.bundleService.remove(id);
  }
}
