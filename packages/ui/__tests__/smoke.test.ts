import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { Button } from '../src';

describe('ui package', () => {
  it('exports Button', () => {
    expect(typeof Button).toBe('function');
  });
});
