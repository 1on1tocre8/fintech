import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  const service = new AuthService();

  it('hashes and verifies password', async () => {
    const hash = await service.hashPassword('secret');
    expect(await service.verifyPassword('secret', hash)).toBe(true);
  });
});
