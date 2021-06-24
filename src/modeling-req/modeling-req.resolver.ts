import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModelingReqService } from './modeling-req.service';
import { ModelingReq } from './entities/modeling-req.entity';
import { CreateModelingReqInput } from './dto/create-modeling-req.input';
import { ApproveModelingReqInput } from './dto/approve-modeling-req.input';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/enums';
import { save } from 'src/storage/storage';
import { ConversationResolver } from 'src/conversation/conversation.resolver';

@Resolver(() => ModelingReq)
export class ModelingReqResolver {
  constructor(private readonly modelingReqService: ModelingReqService) {}

  @Roles(Role.store)
  @Mutation(() => ModelingReq)
  async createModelingReq(@Args('createModelingReqInput') createModelingReqInput: CreateModelingReqInput, @CurrentUser() user ) {
    let images = []
    for (let file of createModelingReqInput.refrences) {
      images.push(await save(file).then((f) => file = f).catch(e => ''))
    }
    createModelingReqInput.refrences = images
    return this.modelingReqService.create(createModelingReqInput, user.id);
  }

  @Roles(Role.admin,Role.moderator)
  @Query(() => [ModelingReq], { name: 'modelingReqs' })
  findAll() {
    return this.modelingReqService.findAll();
  }

  /*
  @Query(() => ModelingReq, { name: 'modelingReq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.modelingReqService.findOne(id);
  }*/

  @Mutation(() => ModelingReq)
  async approveModelingReq(@Args('updateModelingReqInput') updateModelingReqInput: ApproveModelingReqInput) {
    //console.log('dfdf')
    updateModelingReqInput.file = await save(updateModelingReqInput.file).then(f => f)
    return this.modelingReqService.approve(updateModelingReqInput);
  }

  @Roles(Role.admin,Role.moderator)
  @Mutation(() => ModelingReq)
  declineModelingReq(@Args('id', { type: () => String }) id: string) {
    return this.modelingReqService.decline(id);
  }

  @Roles(Role.store)
  @Mutation(() => ModelingReq)
  removeModelingReq(@Args('id', { type: () => String }) id: string, @CurrentUser() user) {
    return this.modelingReqService.remove(id,user.id);
  }
}
