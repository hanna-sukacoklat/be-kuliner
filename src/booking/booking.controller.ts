import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../halper/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@ApiTags('Booking')
@Controller('booking')
@UseGuards(JwtAuthGuard) // pastikan semua route butuh auth
export class BookingController {

    constructor(
    private readonly bookingService: BookingService,
    private readonly cloudinaryService: CloudinaryService,
) {}

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

    @Post()
    create(@Request() req, @Body() dto: CreateBookingDto) {
        return this.bookingService.create(req.user.id, dto)
    }

    // Customer - buat booking
    @Post(':id/payment-proof')
    @UseInterceptors(FileInterceptor('payment_proof', { storage: memoryStorage() }))
    async uploadPaymentProof(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const uploaded = await this.cloudinaryService.uploadFile(file, 'payment-proof');
        const url = (uploaded as any).secure_url;
        return this.bookingService.updatePaymentProof(+id, url);
    }

    // Customer - cancel booking
    @Put(':id/cancel')
    cancel(@Param('id') id: string, @Request() req) {
        return this.bookingService.cancel(+id, req.user.id)
    }
}