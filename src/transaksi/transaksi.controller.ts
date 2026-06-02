import { Body, Controller, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto, UpdateTransaksiDto } from './dto/transaksi.dto';
import { JWTStrategy } from 'src/halper/jwt-strategy';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaksi')
@Controller('transaksi')
@UseGuards(JWTStrategy)
export class TransaksiController {
    constructor(
        private readonly transaksiService: TransaksiService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    findAll() {
        return this.transaksiService.findAll()
    }

    @Put(':id/status')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateTransaksiDto) {
        return this.transaksiService.updateStatus(+id, dto)
    }

    @Get('my')
    findMine(@Request() req) {
        return this.transaksiService.findMine(req.user.id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('paymentProof', { storage: memoryStorage() }))
    async create(@Body() dto: CreateTransaksiDto, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            const uploaded = await this.cloudinaryService.uploadFile(file, 'transaksi');
            dto.paymentProofUrl = (uploaded as any).secure_url;
        }
        return this.transaksiService.create(dto)
    }
}