import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test';
    process.env.JWT_REFRESH_SECRET = 'refresh';
    service = new AuthService(new JwtService({}));
  });

  it('creates and refreshes tokens', async () => {
    const user: any = { id: 1, branchId: 1, roles: [], permissions: [] };
    const tokens = await service.login(user);
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
    const payload = await service['jwtService'].verifyAsync(tokens.accessToken, { secret: 'test' });
    const refreshed = await service.refresh(payload, tokens.refreshToken);
    expect(refreshed.accessToken).toBeDefined();
    expect(refreshed.refreshToken).toBeDefined();
  });
});
