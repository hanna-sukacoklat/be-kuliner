import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/halper/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
@UseGuards(JwtAuthGuard) // pastikan semua route butuh auth
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get('booking/:bookingId')
    findByBooking(@Param('bookingId') bookingId: string) {
        return this.orderService.findByBooking(+bookingId)
    }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.orderService.create(dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id)
    }
}