import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../halper/jwt-auth.guard';
import { RoleGuard, Roles } from '../halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    // Public - semua bisa lihat menu
    @Get()
    findAll() {
        return this.menuService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(+id)
    }

    // Admin only - tambah, edit, hapus
    @Post()
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    create(@Body() dto: CreateMenuDto) {
        return this.menuService.create(dto)
    }

    @Put(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
        return this.menuService.update(+id, dto)
    }

    @Delete(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.menuService.remove(+id)
    }
}