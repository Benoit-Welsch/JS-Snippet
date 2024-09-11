import { describe, it, expect } from 'bun:test';
import { randomName, randomNumbers } from './index';

describe('randomName', () => {
  it('should generate a random name with default options', () => {
    const name = randomName();
    expect(typeof name).toBe('string');
    expect(name).not.toBe('');
    expect(name).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it('should generate a random name with custom separator', () => {
    const name = randomName('_');
    expect(name.includes('_')).toBe(true);
    expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
  });

  it('should generate a random name with capitalized words', () => {
    const name = randomName('-', true);
    expect(name).toMatch(/^[A-Z][a-z]+(-[A-Z][a-z]+)*$/);
  });

  it('should generate a random number', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomNumbers(0, i);
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(i);
    }
  });
});
