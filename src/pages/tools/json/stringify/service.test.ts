import { describe, expect, it } from 'vitest';
import { stringifyJson } from './service';

describe('safe JSON stringification', () => {
  it('formats nested JSON and preserves escaped strings', () => {
    const data = {
      name: 'John',
      path: 'C:\\new\\test',
      items: [true, null, 2]
    };
    const output = stringifyJson(JSON.stringify(data), 'space', 2, false);
    expect(JSON.parse(output)).toEqual(data);
    expect(output).toContain('\n  "name"');
  });
  it.each(['null', 'true', '42', '"hello"', '[1,2]'])(
    'supports valid JSON %s',
    (input) => {
      expect(JSON.parse(stringifyJson(input, 'space', 0, false))).toEqual(
        JSON.parse(input)
      );
    }
  );
  it('does not execute expressions or getters', () => {
    const marker = '__stringifySecurityTest';
    for (const input of [
      `(()=>{globalThis.${marker}=true;return {ok:true}})()`,
      `({get value(){globalThis.${marker}=true;return 1}})`,
      `{value: (globalThis.${marker}=true)}`,
      '{"value": undefined}',
      '{"value": NaN}'
    ]) {
      expect(() => stringifyJson(input, 'space', 2, false)).toThrow(
        'Invalid JSON'
      );
      expect((globalThis as any)[marker]).toBeUndefined();
    }
  });
  it('treats prototype-shaped keys as ordinary data', () => {
    const output = stringifyJson(
      '{"__proto__":{"polluted":true}}',
      'space',
      2,
      false
    );
    const parsed = JSON.parse(output);
    expect(Object.hasOwn(parsed, '__proto__')).toBe(true);
    expect(parsed.__proto__).toEqual({ polluted: true });
    expect(({} as any).polluted).toBeUndefined();
  });
  it('supports tab indentation and HTML escaping', () => {
    expect(stringifyJson('{"x":1}', 'tab', 0, false)).toContain('\n\t"x"');
    expect(stringifyJson('{"x":"<&"}', 'space', 0, true)).toBe(
      '{&quot;x&quot;:&quot;&lt;&amp;&quot;}'
    );
  });
  it.each([-1, 1.5, 11, NaN, Infinity])(
    'rejects invalid indentation %s',
    (spaces) => {
      expect(() => stringifyJson('{}', 'space', spaces, false)).toThrow(
        'Indentation'
      );
    }
  );
});
