import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

type Payload = { // ini harus sama dengan token untuk sigh di jwt agar bisa mendapatkan token 
    id: number
    name: string
    role: string
}
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private ConfigService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.get<string>('JWT_SECRET') || 'HanNagi',
        });
    }

    async validate(Payload: Payload) {
        return Payload
    }
}