import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { BodyResponse } from '../common/dto/body-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        const response: BodyResponse = { status: 201, error: false, errorMessage: undefined, data: undefined };
        const user = await this.authService.register(dto);
        response.data = { id: user.id, name: user.name, email: user.email };
        return response;
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        // Si las credenciales son inválidas, authService.login ya lanza el
        // BadRequestException solo — Nest lo convierte automáticamente en
        // una respuesta HTTP 400 con el mensaje, no necesitamos capturarlo aquí.
        const user = await this.authService.login(dto);
        const response: BodyResponse = {
            status: 200, error: false, errorMessage: undefined,
            data: { id: user.id, name: user.name, email: user.email },
        };
        return response;
    }
}