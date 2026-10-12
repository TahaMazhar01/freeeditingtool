import { describe, expect, it } from 'vitest';
import { compute } from './service';

describe('compute function', () => {
  it.each(['smart', 'delimiter'] as const)(
    'preserves signs and decimal values in %s mode',
    (mode) => {
      expect(compute('10\n-2\n3.5', mode, false, '\\n')).toBe('11.5');
    }
  );
  it('supports signed fractions and scientific notation', () => {
    expect(compute('Values: -.5 +.25 1e2 -2.5e1', 'smart', false, ',')).toBe(
      '74.75'
    );
  });
  it('decodes escaped tabs and handles CRLF records', () => {
    expect(compute('10\t-2\t3.5', 'delimiter', false, '\\t')).toBe('11.5');
    expect(compute('10\r\n-2\r\n3.5', 'delimiter', true, '\\n')).toBe(
      '10\n8\n11.5\n'
    );
  });
  it('rejects values outside the finite number range', () => {
    expect(() => compute('1e309', 'smart', false, ',')).toThrow('finite');
  });
  it('should correctly sum numbers in smart extraction mode', () => {
    const input = 'The 2 cats have 4 and 7 kittens';
    const result = compute(input, 'smart', false, ',');
    expect(result).toBe('13');
  });

  it('should correctly sum numbers with custom delimiter', () => {
    const input = '2,4,7';
    const result = compute(input, 'delimiter', false, ',');
    expect(result).toBe('13');
  });

  it('should return running sum in smart extraction mode', () => {
    const input = 'The 2 cats have 4 and 7 kittens';
    const result = compute(input, 'smart', true, ',');
    expect(result).toBe('2\n6\n13\n');
  });

  it('should return running sum with custom delimiter', () => {
    const input = '2,4,7';
    const result = compute(input, 'delimiter', true, ',');
    expect(result).toBe('2\n6\n13\n');
  });

  it('should handle empty input gracefully in smart mode', () => {
    const input = '';
    const result = compute(input, 'smart', false, ',');
    expect(result).toBe('0');
  });

  it('should handle empty input gracefully in delimiter mode', () => {
    const input = '';
    const result = compute(input, 'delimiter', false, ',');
    expect(result).toBe('0');
  });

  it('should handle input with no numbers in smart mode', () => {
    const input = 'There are no numbers here';
    const result = compute(input, 'smart', false, ',');
    expect(result).toBe('0');
  });

  it('should handle input with no numbers in delimiter mode', () => {
    const input = 'a,b,c';
    const result = compute(input, 'delimiter', false, ',');
    expect(result).toBe('0');
  });

  it('should ignore non-numeric parts in delimiter mode', () => {
    const input = '2,a,4,b,7';
    const result = compute(input, 'delimiter', false, ',');
    expect(result).toBe('13');
  });

  it('should handle different separators', () => {
    const input = '2;4;7';
    const result = compute(input, 'delimiter', false, ';');
    expect(result).toBe('13');
  });
});
