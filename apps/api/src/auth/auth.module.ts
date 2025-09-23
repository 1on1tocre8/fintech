import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BranchGuard } from './branch.guard';
import { MakerCheckerGuard } from './maker-checker.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    JwtAuthGuard,
    BranchGuard,
    MakerCheckerGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
