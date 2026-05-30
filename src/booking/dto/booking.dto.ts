import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsInt()
    tableId!: number

    @IsNotEmpty()
    @IsDateString()
    date!: string

    @IsNotEmpty()
    @IsString()
    time!: string

    @IsNotEmpty()
    @IsInt()
    guestCount!: number
}

export class UpdateBookingDto {
    @IsOptional()
    @IsEnum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}