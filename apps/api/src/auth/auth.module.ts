import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { TokensService } from './tokens.service.js';
import { AuthController } from './auth.controller.js';
import { AccessTokenStrategy } from './strategies/access.strategy.js';
import { RefreshTokenStrategy } from './strategies/refresh.strategy.js';
import { PermissionsGuard } from './permissions.guard.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, TokensService, AccessTokenStrategy, RefreshTokenStrategy, { provide: APP_GUARD, useClass: PermissionsGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
