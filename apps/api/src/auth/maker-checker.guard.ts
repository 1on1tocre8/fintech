import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class MakerCheckerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const user: any = req.user;
    return user?.roles?.includes('checker') && user?.permissions?.includes('approve');
  }
}
