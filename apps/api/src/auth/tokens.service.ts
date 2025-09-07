import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokensService {
  private blacklist = new Set<string>();

  constructor(private readonly jwt: JwtService) {}

  signAccessToken(payload: any): string {
    return this.jwt.sign({ ...payload, typ: 'access', jti: uuid() }, { expiresIn: '900s' });
  }

  signRefreshToken(payload: any): string {
    return this.jwt.sign({ ...payload, typ: 'refresh', jti: uuid() }, { expiresIn: '14d' });
  }

  rotateRefreshToken(payload: any): { accessToken: string; refreshToken: string } {
    if (this.blacklist.has(payload.jti)) {
      throw new Error('blacklisted');
    }
    const { sub, email, branchId, roles, perms } = payload;
    const base = { sub, email, branchId, roles, perms };
    const tokens = { accessToken: this.signAccessToken(base), refreshToken: this.signRefreshToken(base) };
    this.blacklist.add(payload.jti);
    return tokens;
  }

  blacklistToken(jti: string) {
    this.blacklist.add(jti);
  }
}
