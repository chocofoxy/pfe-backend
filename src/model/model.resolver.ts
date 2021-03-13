import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModelService } from './model.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';

@Resolver(() => Model)
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Mutation(() => Model)
  createModel(@Args('createModelInput') createModelInput: CreateModelInput) {
    return this.modelService.create(createModelInput);
  }

  @Query(() => [Model], { name: 'model' })
  findAll() {
    return this.modelService.findAll();
  }

  @Query(() => Model, { name: 'model' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.modelService.findOne(id);
  }

  @Mutation(() => Model)
  updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    return this.modelService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Model)
  removeModel(@Args('id', { type: () => String }) id: string) {
    return this.modelService.remove(id);
  }
}
