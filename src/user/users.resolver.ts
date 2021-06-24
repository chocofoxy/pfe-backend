import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role } from 'src/enums';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { save } from 'src/storage/storage';
import { CreateModInput } from './dto/create-mod.input';
import { Admin } from './entities/admin.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.admin,Role.moderator)
  @Mutation(() => User)
  banToggel(@Args('email', { type: () => String }) email: string) {
    return this.usersService.banToggel(email);
  }

  @Mutation(() => User)
  async updateProfile(@Args('UpdateUserInput') input: UpdateUserInput, @CurrentUser() user) {
    if (input.image)
    {
      let image = await save(input.image).then(f => f)
      input.image = image
    } 
    let userdata = input.image ? {...input , logo: input.image , email: user.email}  : {...input, email: user.email}
    return this.usersService.save(userdata);
  }

  @Roles(Role.admin)
  @Mutation(() => User)
  async addMod(@Args('CreateModInput') input: CreateModInput) {
    return this.usersService.create({...input , role: Role.moderator });
  }

  @Roles(Role.admin)
  @Query(() => [Admin], { name: 'mods' })
  findAll() {
    return this.usersService.getMods()
  }

  /*
  @Query(() => User, { name: 'user' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.email, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('email', { type: () => String }) email: string) {
    return this.usersService.remove(email);
  }*/
}
