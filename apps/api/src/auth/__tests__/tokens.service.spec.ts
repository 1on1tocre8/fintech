import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../tokens.service';

describe('TokensService', () => {
  const service = new TokensService(new JwtService({ secret: 'test' }));

  it('signs access and refresh tokens', () => {
    const payload = { sub: '1', email: 'a@b.com', branchId: 'HO', roles: [], perms: [] };
    const access = service.signAccessToken(payload);
    const refresh = service.signRefreshToken(payload);
    expect(access).toBeDefined();
    expect(refresh).toBeDefined();
  });
});
