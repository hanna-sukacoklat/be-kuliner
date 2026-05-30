import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../halper/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
@UseGuards(JwtAuthGuard) // pastikan semua route butuh auth
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    // Admin
    @Get()
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    findAll() {
        return this.bookingService.findAll()
    }

    // Admin
    @Get('laporan')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    laporan() {
        return this.bookingService.laporan()
    }

    // Admin - update status
    @Put(':id/status')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
        return this.bookingService.updateStatus(+id, dto)
    }

    // Customer - lihat booking sendiri
    @Get('my')
    findMyBookings(@Request() req) {
        return this.bookingService.findMyBookings(req.user.id)
    }

    // Customer - buat booking
    @Post()
    create(@Request() req, @Body() dto: CreateBookingDto) {
        return this.bookingService.create(req.user.id, dto)
    }

    // Customer - cancel booking
    @Put(':id/cancel')
    cancel(@Param('id') id: string, @Request() req) {
        return this.bookingService.cancel(+id, req.user.id)
    }
}