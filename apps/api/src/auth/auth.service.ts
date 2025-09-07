import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  branchId: string;
  roles: string[];
  perms: string[];
}

const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('password', 10),
    branchId: 'HO',
    roles: ['admin'],
    perms: ['view_me'],
  },
];

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(email: string, password: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = users.find((u) => u.email === email);
    if (!user) return null;
    const valid = await this.verifyPassword(password, user.passwordHash);
    if (!valid) return null;
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
