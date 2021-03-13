import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaterialService } from './material.service';
import { Material } from './entities/material.entity';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';

@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Mutation(() => Material)
  createMaterial(@Args('createMaterialInput') createMaterialInput: CreateMaterialInput) {
    return this.materialService.create(createMaterialInput);
  }

  @Query(() => [Material], { name: 'material' })
  findAll() {
    return this.materialService.findAll();
  }

  @Query(() => Material, { name: 'material' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.materialService.findOne(id);
  }

  @Mutation(() => Material)
  updateMaterial(@Args('updateMaterialInput') updateMaterialInput: UpdateMaterialInput) {
    return this.materialService.update(updateMaterialInput.id, updateMaterialInput);
  }

  @Mutation(() => Material)
  removeMaterial(@Args('id', { type: () => String }) id: string) {
    return this.materialService.remove(id);
  }
}
