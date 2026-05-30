import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, RegisterDto, UpdateProfileDto } from './dto/auth.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcrypt: BcryptService,
        private readonly Jwt: JwtService
    ) { }

    async register(dto: RegisterDto) {
        try {
             const existing = await this.prisma.user.findFirst({
            where: { email: dto.email }
        })

        if (existing) {
            return {
                success: false,
                message: 'email already exists',
                data: null
            }
        }

        const hashed = await this.bcrypt.hashPassword(dto.password)

       const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashed,
                role: dto.role ?? 'USER'  // kalau gak diisi, default USER
            }
        })

            return { success: true, message: 'register successful', data: { name: user.name, email: user.email } }
        } catch (error:any) {
            return { success: false, message: `error: ${error.message}`, data: null }
        }
    }

    async login(dto: AuthDto) {
        try {
            const findUser = await this.prisma.user.findFirst({
                where: { email: dto.email }
            })
            if (!findUser) {
                return { success: false, message: 'invalid email', data: null }
            }

            const isMatch = await this.bcrypt.comparePassword(dto.password, findUser.password)
            if (!isMatch) {
                return { success: false, message: 'invalid password', data: null }
            }

            const token = this.Jwt.sign({
                id: findUser.id,
                name: findUser.name,
                role: findUser.role
            })

            return {
                success: true,
                message: 'login successful',
                data: { token, name: findUser.name, role: findUser.role }
            }
        } catch (error: any) {
            return { success: false, 
              message: `error: ${error.message}`, 
              data: null }
        }
    }

      async profile(id: number) {
      try {
          const user = await this.prisma.user.findFirst({
              where: { id },
              select: { id: true, name: true, email: true, role: true, createdAt: true }
          })
          return { success: true, message: 'success', data: user }
      } catch (error: any) {
          return { success: false,  message: `error: ${error.message}`, data: null }
      }
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
      try {
          const data: any = { ...dto }
          if (dto.password) {
              data.password = await this.bcrypt.hashPassword(dto.password)
          }
          const user = await this.prisma.user.update({
              where: { id },
              data,
              select: { id: true, name: true, email: true, role: true }
          })
          return { success: true, message: 'profile updated', data: user }
      } catch (error: any) {
          return { success: false,  message: `error: ${error.message}`, data: null }
      }
  }

        async dashboard() {
          try {
              const totalUser = await this.prisma.user.count({ where: { role: 'USER' } })
              const totalMenu = await this.prisma.menu.count()
              const totalBooking = await this.prisma.booking.count()
              const totalTransaksi = await this.prisma.transaction.count({ where: { status: 'PAID' } })
              const pendingBooking = await this.prisma.booking.count({ where: { status: 'PENDING' } })

              return {
                  success: true,
                  message: 'success',
                  data: {
                      totalUser,
                      totalMenu,
                      totalBooking,
                      totalTransaksi,
                      pendingBooking
                  }
              }
          } catch (error: any) {
              return { success: false, message: error.message, data: null }
          }
      }

      // Dashboard Customer
        async dashboardCustomer(userId: number) {
            try {
        const totalBooking = await this.prisma.booking.count({ where: { userId } })
        const pendingBooking = await this.prisma.booking.count({ where: { userId, status: 'PENDING' } })
        const confirmedBooking = await this.prisma.booking.count({ where: { userId, status: 'CONFIRMED' } })
        const totalTransaksi = await this.prisma.transaction.count({ where: { booking: { userId } } })

        return {
            success: true,
            message: 'success',
            data: { totalBooking, pendingBooking, confirmedBooking, totalTransaksi }
        }
    } catch (error :any) {
        return { success: false, message: error.message, data: null }
    }
}
}