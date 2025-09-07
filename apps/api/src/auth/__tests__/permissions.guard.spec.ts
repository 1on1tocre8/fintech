import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from '../permissions.guard';
import { PERMISSIONS_KEY } from '../permissions.decorator';

describe('PermissionsGuard', () => {
  const reflector = new Reflector();
  const guard = new PermissionsGuard(reflector);

  it('denies when no permission metadata', () => {
    const ctx = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({ getRequest: () => ({ user: { perms: ['a'] } }) }),
    } as any as ExecutionContext;
    expect(guard.canActivate(ctx)).toBe(false);
  });

  it('allows when user has permission', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['a']);
    const ctx = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({ getRequest: () => ({ user: { perms: ['a'] } }) }),
    } as any as ExecutionContext;
    expect(guard.canActivate(ctx)).toBe(true);
  });
});
