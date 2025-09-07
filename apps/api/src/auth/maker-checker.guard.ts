import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MakerCheckerGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    // TODO: implement maker-checker logic in later steps
    return true;
  }
}
