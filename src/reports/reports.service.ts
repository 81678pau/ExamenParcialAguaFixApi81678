import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
    constructor(
        private readonly reportsRepository: ReportsRepository
    ) {}

    async create(dto: CreateReportDto): Promise<Report> {
        return this.reportsRepository.create(dto);
    }

    async findAll(): Promise<Report[]> {
        return this.reportsRepository.findAll();
    }
}