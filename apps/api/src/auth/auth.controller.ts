import { Controller, Post, Body, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.get('authorization')?.replace('Bearer ', '') || '';
    return this.authService.refresh(req.user, refreshToken);
  }
}
