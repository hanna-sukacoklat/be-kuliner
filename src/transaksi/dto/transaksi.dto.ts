import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTransaksiDto {
    @IsNotEmpty()
    @IsInt()
    bookingId!: number

    @IsNotEmpty()
    total!: number

    @IsOptional()
    @IsEnum(['CASH', 'QRIS'])
    paymentMethod?: 'CASH' | 'QRIS'
}

export class UpdateTransaksiDto {
    @IsNotEmpty()
    @IsEnum(['UNPAID', 'PAID', 'REFUNDED'])
    status!: 'UNPAID' | 'PAID' | 'REFUNDED'
}