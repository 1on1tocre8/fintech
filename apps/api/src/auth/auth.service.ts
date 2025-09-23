import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  password: string;
  branchId: number;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class AuthService {
  private refreshTokens = new Map<string, string>(); // userId -> hashed token

  constructor(private readonly jwtService: JwtService) {}

  private async findUser(username: string): Promise<User | undefined> {
    // Placeholder implementation. Replace with real user lookup.
    const passwordHash = await bcrypt.hash('password', 10);
    return {
      id: 1,
      username,
      password: passwordHash,
      branchId: 1,
      roles: ['checker'],
      permissions: ['approve'],
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async signTokens(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    });
    const hashed = await bcrypt.hash(refreshToken, 10);
    this.refreshTokens.set(String(payload.sub), hashed);
    return { accessToken, refreshToken };
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      branchId: user.branchId,
      roles: user.roles,
      permissions: user.permissions,
    };
    return this.signTokens(payload);
  }

  async validateRefreshToken(userId: number, token: string) {
    const stored = this.refreshTokens.get(String(userId));
    if (!stored) throw new UnauthorizedException('No refresh token stored');
    const valid = await bcrypt.compare(token, stored);
    if (!valid) throw new UnauthorizedException('Invalid refresh token');
  }

  async refresh(user: any, token: string) {
    await this.validateRefreshToken(user.sub, token);
    return this.signTokens({
      sub: user.sub,
      branchId: user.branchId,
      roles: user.roles,
      permissions: user.permissions,
    });
  }

  async revoke(userId: number) {
    this.refreshTokens.delete(String(userId));
  }
}
