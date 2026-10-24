import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { CreateReportDto } from './dto/create-report.dto';
import { generateReportTemplate } from './templates/report.template';
import { BodyResponse } from '../common/dto/body-response.dto';
import { envs } from '../config/envs';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
        private readonly emailService: EmailService,
        private readonly storageService: StorageService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo', { limits: { fileSize: 5 * 1024 * 1024 } }))
    async createReport(
        @Body() dto: CreateReportDto,
               @UploadedFile() photo: { buffer: Buffer; originalname: string; mimetype: string },
    ) {
        // Fuera del try/catch a propósito, para que Nest lo convierta en un 400 real
        if (!photo) {
            throw new BadRequestException('La foto es obligatoria (campo "photo")');
        }
        if (!photo.mimetype.startsWith('image/')) {
            throw new BadRequestException('El archivo debe ser una imagen');
        }

        const response: BodyResponse = { status: 201, error: false, errorMessage: undefined, data: undefined };
        try {
            const photoUrl = await this.storageService.uploadFile(photo, 'reports');
            const report = await this.reportsService.create(dto, photoUrl);

            const html = generateReportTemplate(dto, photoUrl);
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