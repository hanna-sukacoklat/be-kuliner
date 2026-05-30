import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        try {
            const menus = await this.prisma.menu.findMany()
            return { success: true, message: 'success', data: menus }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async findOne(id: number) {
        try {
            const menu = await this.prisma.menu.findFirst({ where: { id } })
            if (!menu) return { success: false, message: 'menu not found', data: null }
            return { success: true, message: 'success', data: menu }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async create(dto: CreateMenuDto) {
        try {
            const menu = await this.prisma.menu.create({ data: dto })
            return { success: true, message: 'menu created', data: menu }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async update(id: number, dto: UpdateMenuDto) {
        try {
            const menu = await this.prisma.menu.update({ where: { id }, data: dto })
            return { success: true, message: 'menu updated', data: menu }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.menu.delete({ where: { id } })
            return { success: true, message: 'menu deleted', data: null }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }
}