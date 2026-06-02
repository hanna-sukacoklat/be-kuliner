import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    [x: string]: any;
    constructor(private readonly prisma: PrismaService) { }

    // Admin - lihat semua booking
    async findAll() {
        try {
            const bookings = await this.prisma.booking.findMany({
                include: { user: { select: { name: true, email: true } }, table: true }
            })
            return { success: true, message: 'success', data: bookings }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - lihat booking sendiri
    async findMyBookings(userId: number) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: { userId },
                include: { table: true, orders: { include: { menu: true } } }
            })
            return { success: true, message: 'success', data: bookings }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - buat booking
    async create(userId: number, dto: CreateBookingDto) {
    try {
        const booking = await this.prisma.booking.create({
            data: {
                userId,
                tableId: dto.tableId,
                date: new Date(dto.date),
                time: dto.time,  // ← tambah ini
                guestCount: dto.guestCount,
                status: 'PENDING'
            }
        })
        return { success: true, message: 'booking created', data: booking }
    } catch (error: any) {
        return { success: false, message: error.message, data: null }
    }
}

    // Admin - update status booking
    async updateStatus(id: number, dto: UpdateBookingDto) {
        try {
            const booking = await this.prisma.booking.update({
                where: { id },
                data: { status: dto.status }
            })
            return { success: true, message: 'booking updated', data: booking }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Customer - cancel booking sendiri
    async cancel(id: number, userId: number) {
        try {
            const booking = await this.prisma.booking.findFirst({ where: { id, userId } })
            if (!booking) return { success: false, message: 'booking not found', data: null }
            const updated = await this.prisma.booking.update({
                where: { id },
                data: { status: 'CANCELLED' }
            })
            return { success: true, message: 'booking cancelled', data: updated }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

    // Admin - laporan reservasi
    async laporan() {
        try {
            const total = await this.prisma.booking.count()
            const pending = await this.prisma.booking.count({ where: { status: 'PENDING' } })
            const confirmed = await this.prisma.booking.count({ where: { status: 'CONFIRMED' } })
            const cancelled = await this.prisma.booking.count({ where: { status: 'CANCELLED' } })
            const data = await this.prisma.booking.findMany({
                include: { user: { select: { name: true, email: true } }, table: true }
            })
            return { success: true, message: 'success', data: { total, pending, confirmed, cancelled, list: data } }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
    }

        async updatePaymentProof(id: number, url: string) {
        try {
            const booking = await this.prisma.booking.update({
                where: { id },
                // cast to any to avoid TS error if the Prisma schema uses a different field name
                data: ({ paymentProofUrl: url } as any)
            })
            return { success: true, message: 'payment proof uploaded', data: booking }
        } catch (error: any) {
            return { success: false, message: error.message, data: null }
        }
}
}