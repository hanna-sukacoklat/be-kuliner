// untuk perizinan 
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate { 
    constructor (private reflector: Reflector ) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(`roles`, context.getHandler()) // membandingakan role 
        if (!roles) return true

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return roles.includes(user?.role)
    }
}

export const Roles = (...roles: string[]) => {
    return SetMetadata(`roles`, roles)
}

//implements Dia harus bikin sendiri semua yang ada di dalam “aturan” (interface).
//extends itu adi dia ikut punya semua barang (fungsi & data) dari class yang dia ikutin. 