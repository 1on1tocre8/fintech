import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { CONFIG } from '../src';

describe('config package', () => {
  it('exports CONFIG', () => {
    expect(CONFIG.apiPort).toBeDefined();
  });
});
