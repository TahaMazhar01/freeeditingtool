import { describe, expect, it } from 'vitest';
import { splitCsv, serializeCsv, getCsvHeaders } from './csv';
const parse = (input: string, comment = '') =>
  splitCsv(input, true, comment, false);
describe('CSV record parsing', () => {
  it('preserves embedded separators, quotes, line breaks and quoted spaces', () => {
    const rows = [
      ['name', 'note'],
      ['Alice', 'She said "Hi", then\nleft'],
      ['Bob', '  padded  ']
    ];
    expect(parse(serializeCsv(rows))).toEqual(rows);
  });
  it('handles BOM, CRLF, custom separators and escaped quotes', () => {
    expect(
      splitCsv("\uFEFFa||b\r\n'x||y'||'it''s'\r\n", false, '', true, '||', "'")
    ).toEqual([
      ['a', 'b'],
      ['x||y', "it's"]
    ]);
  });
  it('skips comments only outside quoted data, including a final comment', () => {
    expect(parse('#ignore\n"#keep",1\n#last', '#')).toEqual([['#keep', '1']]);
    expect(parse('#keep,1')).toEqual([['#keep', '1']]);
    expect(parse('#only', '#')).toEqual([]);
  });
  it('reads a complete quoted header record', () => {
    expect(
      getCsvHeaders('#comment\n"full\nname",age\nAlice,20', ',', '"', '#')
    ).toEqual(['full\nname', 'age']);
  });
  it.each(['"unclosed', '"valid"unexpected'])(
    'rejects malformed data %s',
    (input) => expect(() => parse(input)).toThrow()
  );
  it('rejects empty delimiters and preserves empty cells', () => {
    expect(() => splitCsv('a,b', false, '', false, '')).toThrow();
    expect(parse('a,,b,')).toEqual([['a', '', 'b', '']]);
    expect(splitCsv('\n""\n,,\n', false, '', true)).toEqual([
      [''],
      ['', '', '']
    ]);
  });
  it('quotes output separators and doubled quotes with custom output settings', () => {
    const rows = [['a;b', 'say "hi"', 'x\ny']];
    expect(splitCsv(serializeCsv(rows, ';'), false, '', false, ';')).toEqual(
      rows
    );
  });
});
