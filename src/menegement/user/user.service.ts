import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcrypt: BcryptService,
    ) { }

    async findAll() {
        try {
            const users = await this.prisma.user.findMany({
                select: { id: true, name: true, email: true, role: true, createdAt: true }
            })
            return { success: true, message: 'success', data: users }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async findOne(id: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { id },
                select: { id: true, name: true, email: true, role: true, createdAt: true }
            })
            if (!user) return { success: false, message: 'user not found', data: null }
            return { success: true, message: 'success', data: user }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async create(dto: CreateUserDto) {
        try {
            const existing = await this.prisma.user.findFirst({ where: { email: dto.email } })
            if (existing) return { success: false, message: 'email already exists', data: null }

            const hashed = await this.bcrypt.hashPassword(dto.password)
            const user = await this.prisma.user.create({
                data: { ...dto, password: hashed }
            })
            return { success: true, message: 'user created', data: { id: user.id, name: user.name, email: user.email, role: user.role } }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async update(id: number, dto: UpdateUserDto) {
        try {
            const data: any = { ...dto }
            if (dto.password) {
                data.password = await this.bcrypt.hashPassword(dto.password)
            }
            const user = await this.prisma.user.update({
                where: { id },
                data,
                select: { id: true, name: true, email: true, role: true }
            })
            return { success: true, message: 'user updated', data: user }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.user.delete({ where: { id } })
            return { success: true, message: 'user deleted', data: null }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }
}