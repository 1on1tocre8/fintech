import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { getHealth } from '../src';

describe('sdk package', () => {
  it('exports getHealth', () => {
    expect(typeof getHealth).toBe('function');
  });
});
