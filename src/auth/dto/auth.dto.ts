import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class RegisterDto {
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

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    password?: string
}