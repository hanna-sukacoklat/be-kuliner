import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JWTStrategy } from '../halper/jwt-strategy';
import { RoleGuard, Roles } from '../halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseGuards(JWTStrategy, RoleGuard)
@Roles('ADMIN')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(+id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}