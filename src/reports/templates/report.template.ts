import { CreateReportDto } from '../dto/create-report.dto';

export function generateReportTemplate(dto: CreateReportDto): string {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Nuevo reporte de fuga de agua</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border-collapse: collapse;">
            <tr>
                <td style="background-color: #0077b6; padding: 16px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Nuevo reporte de fuga de agua</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="color: #333333; font-size: 15px; margin: 0 0 16px 0;">
                        Se ha registrado un nuevo reporte ciudadano. Estos son los detalles:
                    </p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555;">Dirección</td>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333333;">${dto.address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555;">Descripción</td>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333333;">${dto.description}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555;">Severidad</td>
                            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333333;">${dto.severity}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #555555;">Teléfono de contacto</td>
                            <td style="padding: 8px; color: #333333;">${dto.reporterPhone}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="background-color: #f0f0f0; padding: 12px; text-align: center;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">AguaFix · Sistema municipal de reportes</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}