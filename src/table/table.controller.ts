import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';
import { JwtAuthGuard } from 'src/halper/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/halper/roles-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    // Public - semua bisa lihat meja
    @Get()
    findAll() {
        return this.tableService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tableService.findOne(+id)
    }

    // Admin only
    @Post()
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    create(@Body() dto: CreateTableDto) {
        return this.tableService.create(dto)
    }

    @Put(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() dto: UpdateTableDto) {
        return this.tableService.update(+id, dto)
    }

    @Delete(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.tableService.remove(+id)
    }
}