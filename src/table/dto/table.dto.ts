import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    @IsInt()
    number!: number

    @IsNotEmpty()
    @IsInt()
    capacity!: number
}

export class UpdateTableDto {
    @IsOptional()
    @IsInt()
    number?: number

    @IsOptional()
    @IsInt()
    capacity?: number

    @IsOptional()
    @IsBoolean()
    status?: boolean
}