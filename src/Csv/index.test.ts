import CSV from '.';
import { describe, it, expect } from 'bun:test';

describe('CSV', () => {
  const header = ['Name', 'Age', 'Email'];
  const headersEncoded = header.map((h) => `"${h}"`).join(',') + '\r\n';

  describe('constructor', () => {
    it('should set the header and maxCol properties', () => {
      const csv = new CSV({ header });
      expect(csv.getHeader()).toEqual(['Name', 'Age', 'Email']);
      expect(csv.maxCol).toBe(3);
    });
  });

  describe('setHeader', () => {
    it('should update the header and maxCol properties', () => {
      const csv = new CSV({ header });
      csv.setHeader(['ID', 'Name', 'Email', 'Phone']);
      expect(csv.getHeader()).toEqual(['ID', 'Name', 'Email', 'Phone']);
      expect(csv.maxCol).toBe(4);
    });
  });

  describe('addSequentially', () => {
    it('should add values to the next row sequentially', () => {
      const csv = new CSV({ header });
      csv.addSequentially('John');
      csv.addSequentially(30);
      csv.addSequentially('john@example.com');
      expect(csv).toEqual([header, ['John', 30, 'john@example.com']]);
    });
  });

  describe('toString', () => {
    it('should return the CSV as a string with the specified separator', () => {
      const csv = new CSV({ header });
      csv.addSequentially('John');
      csv.addSequentially(30);
      csv.addSequentially('john@example.com');
      expect(csv.toString(',')).toBe(
        headersEncoded + '"John",30,"john@example.com"',
      );
    });

    it('should not include the header if specified', () => {
      const csv = new CSV({ header });
      csv.addSequentially('John');
      csv.addSequentially(30);
      csv.addSequentially('john@example.com');
      expect(csv.toString(',', false)).toBe('"John",30,"john@example.com"');
    });
  });

  describe('toStringEncoded', () => {
    it('should return the CSV as a string with the specified separator and encoded values', () => {
      const csv = new CSV({ header });
      csv.addSequentially('John');
      csv.addSequentially(30);
      csv.addSequentially('john@example.com');
      const rules = [
        { from: /\./g, to: '\\.' }, // escape dots
        { from: /@/g, to: '\\@' }, // escape @
      ];
      expect(csv.toStringEncoded(',', rules)).toBe(
        headersEncoded + '"John",30,"john\\@example\\.com"',
      );
    });
  });

  describe('clean', () => {
    it('should clean the CSV and keep the header', () => {
      const csv = new CSV({ header });
      csv.addSequentially('John');
      csv.addSequentially(30);
      csv.addSequentially('john@example.com');
      expect(csv.toString(',', false)).toBe('"John",30,"john@example.com"');
      csv.clear();
      expect(csv).toEqual([header]);
      expect(csv.length).toBe(1);
    });
  });

  describe('readString', () => {
    it('should parse a CSV string and return a CSV object', () => {
      const csvString = header.join(';') + '\r\nJohn;30;email@test.com';
      const csv = CSV.readString(csvString);
      expect(csv).toEqual([header, ['John', '30', 'email@test.com']]);
    });

    it('should parse a CSV string and return a CSV object with a custom separator', () => {
      const csvString =
        'Name,Age,Email\r\nJohn,30,john@example.com\r\nJane,25,jane@example.com\r\n';
      const csv = CSV.readString(csvString, ',');
      expect(csv).toEqual([
        ['Name', 'Age', 'Email'],
        ['John', '30', 'john@example.com'],
        ['Jane', '25', 'jane@example.com'],
      ]);
    });

    it('should parse a CSV string and return a CSV object with a custom header', () => {
      const csvString = 'John;30';
      const csv = CSV.readString(
        csvString,
        ';',
        ['test', 'test', 'test'],
        false,
      );
      expect(csv).toEqual([
        ['test', 'test', 'test'],
        ['John', '30'],
      ]);
    });
  });
});
