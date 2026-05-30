import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto, UpdateTransaksiDto } from './dto/transaksi.dto';
import { JWTStrategy } from 'src/halper/jwt-strategy';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Transaksi')
@Controller('transaksi')
@UseGuards(JWTStrategy)
export class TransaksiController {
    constructor(private readonly transaksiService: TransaksiService) { }

    // Admin
    @Get()
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    findAll() {
        return this.transaksiService.findAll()
    }

    // Admin - update status
    @Put(':id/status')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateTransaksiDto) {
        return this.transaksiService.updateStatus(+id, dto)
    }

    // Customer - lihat transaksi sendiri
    @Get('my')
    findMine(@Request() req) {
        return this.transaksiService.findMine(req.user.id)
    }

    // Customer - buat transaksi
    @Post()
    create(@Body() dto: CreateTransaksiDto) {
        return this.transaksiService.create(dto)
    }
}