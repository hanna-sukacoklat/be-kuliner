import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';

@Injectable()
export class TableService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        try {
            const tables = await this.prisma.table.findMany()
            return { success: true, message: 'success', data: tables }
        } catch (error : any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async findOne(id: number) {
        try {
            const table = await this.prisma.table.findFirst({ where: { id } })
            if (!table) return { success: false, message: 'table not found', data: null }
            return { success: true, message: 'success', data: table }
        } catch (error : any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async create(dto: CreateTableDto) {
        try {
            const existing = await this.prisma.table.findFirst({ where: { number: dto.number } })
            if (existing) return { success: false, message: 'nomor meja sudah ada', data: null }

            const table = await this.prisma.table.create({ data: dto })
            return { success: true, message: 'table created', data: table }
        } catch (error : any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async update(id: number, dto: UpdateTableDto) {
        try {
            const table = await this.prisma.table.update({ where: { id }, data: dto })
            return { success: true, message: 'table updated', data: table }
        } catch (error : any) {
            return { success: false, message: error.message, data: null }
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.table.delete({ where: { id } })
            return { success: true, message: 'table deleted', data: null }
        } catch (error : any) {
            return { success: false, message: error.message, data: null }
        }
    }
}