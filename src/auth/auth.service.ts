import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async register(dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.validateCredentials(dto.email, dto.password);
        if (!user) {
            throw new BadRequestException('Credenciales inválidas');
        }
        return user;
    }
}