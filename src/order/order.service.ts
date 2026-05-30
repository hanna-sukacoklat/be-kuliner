import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }

    // Customer - lihat order di booking tertentu
    async findByBooking(bookingId: number) {
        try {
            const orders = await this.prisma.order.findMany({
                where: { bookingId },
                include: { menu: true }
            })
            return { success: true, message: 'success', data: orders }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - tambah order
    async create(dto: CreateOrderDto) {
        try {
            const order = await this.prisma.order.create({
                data: dto,
                include: { menu: true }
            })
            return { success: true, message: 'order added', data: order }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - hapus order
    async remove(id: number) {
        try {
            await this.prisma.order.delete({ where: { id } })
            return { success: true, message: 'order removed', data: null }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }
}