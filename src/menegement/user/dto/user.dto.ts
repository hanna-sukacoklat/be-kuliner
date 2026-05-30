import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsOptional()
    @IsEnum(['ADMIN', 'USER'])
    role?: 'ADMIN' | 'USER'
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsEnum(['ADMIN', 'USER'])
    role?: 'ADMIN' | 'USER'
}