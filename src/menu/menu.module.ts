// menu.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';            // ← tambahkan
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { JWTStrategy } from '../halper/jwt-strategy';       // lokasi strategi

@Module({
  imports: [ConfigModule],                                // ← import di sini
  controllers: [MenuController],
  providers: [MenuService, JWTStrategy],                  // JWTStrategy dipakai di sini
})
export class MenuModule {}
