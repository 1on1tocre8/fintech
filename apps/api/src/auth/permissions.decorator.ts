import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'perms';
export const Permissions = (...perms: string[]) => SetMetadata(PERMISSIONS_KEY, perms);
