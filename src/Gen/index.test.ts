import { describe, it, expect } from 'bun:test';
import { randomName } from './index';

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
});
