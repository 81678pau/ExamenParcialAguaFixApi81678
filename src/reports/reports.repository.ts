import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsRepository {
    constructor(
        @InjectRepository(Report)
        private readonly repository: Repository<Report>
    ) {}

    async create(dto: CreateReportDto, photoUrl: string): Promise<Report> {
        const report = this.repository.create({
            address: dto.address,
            description: dto.description,
            severity: dto.severity,
            reporterPhone: dto.reporterPhone,
            photoUrl,
        });
        return this.repository.save(report);
    }

    async findAll(): Promise<Report[]> {
        return this.repository.find();
    }
}