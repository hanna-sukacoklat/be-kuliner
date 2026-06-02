import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
