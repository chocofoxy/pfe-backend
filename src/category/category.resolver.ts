import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Public } from 'src/guards/public.decorator';
import { Role } from 'src/enums';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.admin, Role.store)
  @Mutation(() => Category)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput, @CurrentUser() user) {
    return this.categoryService.create({...createCategoryInput , approved: user.role == Role.admin });
  }

  @Public()
  @Query(() => [Category], { name: 'category' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Roles(Role.admin)
  @Mutation(() => Category)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
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

}
