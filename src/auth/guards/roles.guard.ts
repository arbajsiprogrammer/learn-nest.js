
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/common/enums/roles.enum';
import { PUBLIC_KEY, ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if no such roles means allow everyone
    // If the route has no @Roles() decorator at all, it means it's public — let everyone through.
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user , " inside RolesGuard");
    if(!user){
        throw new UnauthorizedException("you are not allowed to make request");
    }

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
