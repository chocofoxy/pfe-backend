import { forwardRef, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';
import { UsersService } from 'src/user/users.service';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    forwardRef(() => UsersModule)
    ],
  providers: [ReportResolver, ReportService],
  exports: [ReportService]
})
export class ReportModule {}
