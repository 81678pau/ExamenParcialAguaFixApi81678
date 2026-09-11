import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { EmailService } from '../email/email.service';
import { CreateReportDto } from './dto/create-report.dto';
import { generateReportTemplate } from './templates/report.template';
import { BodyResponse } from '../common/dto/body-response.dto';
import { envs } from '../config/envs';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
        private readonly emailService: EmailService,
    ) {}

    @Post()
    async createReport(@Body() dto: CreateReportDto) {
        const response: BodyResponse = { status: 201, error: false, errorMessage: undefined, data: undefined };
        try {
            const report = await this.reportsService.create(dto);

            const html = generateReportTemplate(dto);
            await this.emailService.sendEmail(
                envs.CREW_EMAIL,
                `Nuevo reporte de fuga: ${dto.address}`,
                html,
            );

            response.data = report;
            return response;
        } catch (e) {
            response.status = 500;
            response.error = true;
            response.errorMessage = 'Ocurrió un error';
            return response;
        }
    }

    @Get()
    async getAllReports() {
        const response: BodyResponse = { status: 200, error: false, errorMessage: undefined, data: undefined };
        try {
            response.data = await this.reportsService.findAll();
            return response;
        } catch (e) {
            response.status = 500;
            response.error = true;
            response.errorMessage = 'Ocurrió un error';
            return response;
        }
    }
}