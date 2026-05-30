import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}