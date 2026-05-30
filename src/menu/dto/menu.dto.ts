import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    category!: string;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    @IsOptional()
    @IsString()
    image?: string

    @IsOptional()
    @IsString()
    description?: string
}

export class UpdateMenuDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    category?: string

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsString()
    image?: string

    @IsOptional()
    @IsString()
    description?: string
}