import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto, UpdateProfileDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../halper/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }

    @Get('profile')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    profile(@Request() req) {
        return this.authService.profile(req.user.id)
    }

    @Put('profile')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
        return this.authService.updateProfile(req.user.id, dto)
    }

    // Dashboard Admin
    @Get('dashboard')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    dashboard() {
        return this.authService.dashboard()
    }

    // Dashboard Customer
    @Get('dashboard/customer')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('USER')
    dashboardCustomer(@Request() req) {
        return this.authService.dashboardCustomer(req.user.id)
    }
}