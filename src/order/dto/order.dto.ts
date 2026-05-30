import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    bookingId!: number

    @IsNotEmpty()
    @IsInt()
    menuId!: number

    @IsNotEmpty()
    @IsInt()
    quantity!: number

    @IsOptional()
    @IsString()
    note?: string
}

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(['PENDING', 'PREPARING', 'SERVED', 'CANCELLED'])
    status?: 'PENDING' | 'PREPARING' | 'SERVED' | 'CANCELLED'
}