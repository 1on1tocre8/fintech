import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { TokensService } from './tokens.service.js';
import { LoginDto } from './dto/login.dto.js';
import { Permissions } from './permissions.decorator.js';
import { PermissionsGuard } from './permissions.guard.js';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private auth: AuthService, private tokens: TokensService) {}

  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.validateUser(dto.email, dto.password);
    if (!user) return { error: 'invalid' };
    const tokens = {
      accessToken: this.tokens.signAccessToken(user),
      refreshToken: this.tokens.signRefreshToken(user),
    };
    return { user, ...tokens };
  }

  @Post('auth/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: any) {
    try {
      return this.tokens.rotateRefreshToken(req.user);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Post('auth/logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  async logout(@Req() req: any) {
    this.tokens.blacklistToken(req.user.jti);
    return { success: true };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('view_me')
  me(@Req() req: any) {
    return req.user;
  }
}
