import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Public } from 'src/guards/public.decorator';
import { Role, Status } from 'src/enums';
import { save } from 'src/storage/storage';
import { UseInterceptors } from '@nestjs/common';
import { GraphqlFiles } from 'src/storage/file.interceptor';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.admin)
  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput, @CurrentUser() user) {
    createCategoryInput.icon = await save(createCategoryInput.icon).then( f => f )
    createCategoryInput.image = await save(createCategoryInput.image).then( f => f )
    return this.categoryService.create({...createCategoryInput , status: Status.confirmed });
  }

  @Roles(Role.store)
  @Mutation(() => Category)
  async requestCategory(@Args('name', { type: () => String }) name , @CurrentUser() user) {
    return this.categoryService.create({ name , status: Status.pending });
  }

  @Public()
  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Roles(Role.admin)
  @Query(() => [Category], { name: 'categoriesAdmin' })
  findAllForAdmin() {
    return this.categoryService.findAllForAdmin();
  }

  @Public()
  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Roles(Role.admin)
  @Query(() => [Category], { name: 'AllCategories' })
  findAllStatus() {
    return this.categoryService.findAllStatus();
  }

  @Roles(Role.admin)
  @Mutation(() => Category)
  async updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    if ( updateCategoryInput.icon)
    updateCategoryInput.icon = await save(updateCategoryInput.icon).then( f => f )
    if ( updateCategoryInput.image )
    updateCategoryInput.image = await save(updateCategoryInput.image).then( f => f )
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Roles(Role.admin)
  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.remove(id);
  }

  @Roles(Role.admin)
  @Mutation(() => Category)
  approveCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.approve(id);
  }

  @Public()
  @Query(() => [Category],)
  discover() {
    return this.categoryService.discover();
  }

}
