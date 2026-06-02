import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../halper/jwt-auth.guard';
import { RoleGuard, Roles } from '../halper/roles-guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(
        private readonly menuService: MenuService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    @Get()
    findAll() { return this.menuService.findAll() }

    @Get(':id')
    findOne(@Param('id') id: string) { return this.menuService.findOne(+id) }

    @Post()
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async create(@Body() dto: CreateMenuDto, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            const uploaded = await this.cloudinaryService.uploadFile(file, 'menu');
            dto.image = (uploaded as any).secure_url;
        }
        return this.menuService.create(dto)
    }

    @Put(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async update(@Param('id') id: string, @Body() dto: UpdateMenuDto, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            const uploaded = await this.cloudinaryService.uploadFile(file, 'menu');
            dto.image = (uploaded as any).secure_url;
        }
        return this.menuService.update(+id, dto)
    }

    @Delete(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) { return this.menuService.remove(+id) }
}