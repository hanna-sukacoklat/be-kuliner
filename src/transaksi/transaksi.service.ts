import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransaksiDto, UpdateTransaksiDto } from './dto/transaksi.dto';

@Injectable()
export class TransaksiService {
    constructor(private readonly prisma: PrismaService) { }

    // Admin - lihat semua transaksi
    async findAll() {
        try {
            const data = await this.prisma.transaction.findMany({
                include: { booking: { include: { user: { select: { name: true } }, table: true } } }
            })
            return { success: true, message: 'success', data }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - lihat transaksi sendiri
    async findMine(userId: number) {
        try {
            const data = await this.prisma.transaction.findMany({
                where: { booking: { userId } },
                include: { booking: { include: { table: true } } }
            })
            return { success: true, message: 'success', data }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Auto create transaksi dari booking
    async create(dto: CreateTransaksiDto) {
        try {
            const transaksi = await this.prisma.transaction.create({ data: dto })
            return { success: true, message: 'transaksi created', data: transaksi }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Admin - update status bayar
    async updateStatus(id: number, dto: UpdateTransaksiDto) {
        try {
            const transaksi = await this.prisma.transaction.update({
                where: { id },
                data: { status: dto.status }
            })
            return { success: true, message: 'status updated', data: transaksi }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }
}