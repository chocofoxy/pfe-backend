import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatsService } from './stats.service';
import { Stat } from './entities/stat.entity';
import { CreateStatInput } from './dto/create-stat.input';
import { UpdateStatInput } from './dto/update-stat.input';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/enums';

@Resolver(() => Stat)
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  //@Roles(Role.admin,Role.moderator)
  @Query(() => Stat, { name: 'stats' })
  findAll() {
    return this.statsService.adminStats();
  }

}
