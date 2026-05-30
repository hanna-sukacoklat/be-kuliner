import { Injectable } from '@nestjs/common';
import { hash, compare} from 'bcrypt';

@Injectable()
export class BcryptService { // method untuk menyembunyikan password 
    async hashPassword(password: string): Promise<string> {
        const saltRound = 10 // ini paling tinggi dan paling lama lvl nya 
        return await hash(password, saltRound) 
    }


    async comparePassword(password: string, hashPassword: string): Promise<boolean> { 
        return await compare(password, hashPassword)  // menggunakan compare untuk membandingkan hasil
    } // method ini buat ngecek password apa bener atau ga
}
