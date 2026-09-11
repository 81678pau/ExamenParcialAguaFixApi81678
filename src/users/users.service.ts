import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const existing = await this.usersRepository.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException('El email ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.usersRepository.create(dto, hashedPassword);
    }

    // Regresa el usuario si las credenciales son correctas, o null si no
    async validateCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
    }
}