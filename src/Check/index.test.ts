import is from '.';
import { describe, it, expect } from 'bun:test';

describe('is', () => {
  it('should check the ip', () => {
    expect(is.ip('127.0.0.1')).toBe(true);
    expect(is.ip('0.0.0')).toBe(false);
  });

  it('should check if the email', () => {
    expect(is.email('test@local.dev')).toBe(true);
    expect(is.email('test.local.dev')).toBe(false);
  });

  it('should check if the number', () => {
    expect(is.number('1')).toBe(true);
    expect(is.number('a')).toBe(false);
  });

  it('should check if the alpha', () => {
    expect(is.alpha('1')).toBe(false);
    expect(is.alpha('a')).toBe(true);
  });

  it('should check if the alphaNumeric', () => {
    expect(is.alphaNumeric('a1')).toBe(true);
    expect(is.alphaNumeric('a-')).toBe(false);
  });

  it('should check if the hexColor', () => {
    expect(is.hexColor('#ffffff')).toBe(true);
    expect(is.hexColor('ffffff')).toBe(false);
  });

  it('should check if the hexadecimal', () => {
    expect(is.hexadecimal('ff')).toBe(true);
    expect(is.hexadecimal('ffz')).toBe(false);
  });
  it('should check if the uuid', () => {
    expect(is.uuid('00000000-0000-0000-0000-000000000000')).toBe(true);
    expect(is.uuid('00000000-0000-0000-0000-00000000000')).toBe(false);
  });

  it('should check if the slug', () => {
    expect(is.slug('test-slug')).toBe(true);
    expect(is.slug('test slug')).toBe(false);
  });
  it('should check if the semver', () => {
    expect(is.semver('1.0.0')).toBe(true);
    expect(is.semver('1.0')).toBe(false);
  });
  it('should check if the base64', () => {
    expect(is.base64('dGVzdA==')).toBe(true);
    expect(is.base64('%%')).toBe(false);
  });

  it('should check if the mimeType', () => {
    expect(is.mimeType('text/plain')).toBe(true);
    expect(is.mimeType('text plain')).toBe(false);
  });
});
