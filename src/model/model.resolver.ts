import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModelService } from './model.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { UseInterceptors } from '@nestjs/common';
import { GraphqlFiles } from 'src/storage/file.interceptor';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { save } from 'src/storage/storage';

@Resolver(() => Model)
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Mutation(() => Model )
  //@UseInterceptors(GraphqlFiles('createModelInput'))
  async createModel(@Args('createModelInput') createModelInput: CreateModelInput, @CurrentUser() user ) {
    createModelInput.mesh = await save(createModelInput.mesh).then( f => createModelInput.mesh = f )
    //console.log(createModelInput.mesh)
    return this.modelService.create({...createModelInput , user });
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
  async updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    updateModelInput.mesh = await save(updateModelInput.mesh).then( f => updateModelInput.mesh = f )
    return this.modelService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Model)
  removeModel(@Args('id', { type: () => String }) id: string) {
    return this.modelService.remove(id);
  }
}
