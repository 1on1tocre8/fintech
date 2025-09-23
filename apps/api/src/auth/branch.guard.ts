import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BranchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const user: any = req.user;
    const branchId = req.params['branchId'] || req.body.branchId;
    return user?.branchId !== undefined && String(user.branchId) === String(branchId);
  }
}
