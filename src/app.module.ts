import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { BookingModule } from './booking/booking.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { UserModule } from './menegement/user/user.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← tambah ini
    PrismaModule,
    AuthModule,
    MenuModule,
    OrderModule,
    BookingModule,
    TransaksiModule,
    UserModule,
    TableModule
  ],
})
export class AppModule {}