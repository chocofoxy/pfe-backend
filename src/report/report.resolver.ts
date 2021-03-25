import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/enums';
import { CurrentUser } from 'src/guards/current-user.decorator';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Roles(Role.admin,Role.client,Role.store)
  @Mutation(() => Report)
  createReport(@Args('createReportInput') createReportInput: CreateReportInput,@CurrentUser() user) {
    return this.reportService.create({...createReportInput, reporter: user.id , reporterType: user.role } as CreateReportInput);
  }

  @Query(() => [Report], { name: 'report' })
  findAll() {
    return this.reportService.findAll();
  }

  @Query(() => Report, { name: 'report' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reportService.findOne(id);
  }

  @Mutation(() => Report)
  updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput) {
    return this.reportService.update(updateReportInput.id, updateReportInput);
  }

  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => String }) id: string) {
    return this.reportService.remove(id);
  }
}
