import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/user/users.service';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private ReportModel: Model<Report>,
    private userService: UsersService
  ) {}
  
  async create(createReportInput: CreateReportInput ) {
    const info = await this.userService.findOne(createReportInput.reported)
    if ( info ) {
      createReportInput.reported =  info.user._id
      return await new this.ReportModel({...createReportInput , reportedType: info.role }).save()
    }
  }
   

  async findAll(): Promise<Report[]> {
    return await this.ReportModel.find().populate(['reported','reporter'])
  }

  async findOne(id: string): Promise<Report> {
    return await this.ReportModel.findOne({ id: id })
  }

  async update(id: string, updateReportInput: UpdateReportInput): Promise<Report> {
    return await this.ReportModel.findOneAndUpdate({ id: id },UpdateReportInput)
  }

  async remove(id: string): Promise<Report> {
    return await this.ReportModel.findOneAndRemove({ id: id })
  }
}
