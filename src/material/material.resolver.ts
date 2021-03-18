import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaterialService } from './material.service';
import { Material } from './entities/material.entity';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Public } from 'src/guards/public.decorator';
import { UseInterceptors } from '@nestjs/common';
import { GraphqlFiles } from 'src/storage/file.interceptor';

@Public()
@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @UseInterceptors(GraphqlFiles([{ name: "file" }],{ input: "createMaterialInput" }))
  @Mutation(() => Material)
  async createMaterial(@Args('createMaterialInput') createMaterialInput: CreateMaterialInput) {
    return this.materialService.create(createMaterialInput);
  }

  @Query(() => [Material], { name: 'materials' })
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
