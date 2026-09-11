import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    async create(dto: CreateUserDto, hashedPassword: string): Promise<User> {
        const user = this.repository.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            isNotificationEnabled: dto.isNotificationEnabled,
        });
        return this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }
}