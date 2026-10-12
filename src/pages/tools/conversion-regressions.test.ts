import { describe, expect, it } from 'vitest';
import { XMLValidator, XMLParser } from 'fast-xml-parser';
import { convertCsvToJson } from './csv/csv-to-json/service';
import { convertCsvToXml } from './csv/csv-to-xml/service';
import { convertTsvToJson } from './csv/tsv-to-json/service';
import { main as csvToYaml } from './csv/csv-to-yaml/service';
import { convertJsonToXml } from './json/json-to-xml/service';
import { convertJsonToCsv } from './json/json-to-csv/service';
import { sortJson } from './json/sort/service';
import { getJsonHeaders } from '../../utils/json';
const xmlOptions = {
  delimiter: ',',
  quote: '"',
  comment: '',
  useHeaders: true,
  skipEmptyLines: true
};
const csvOptions = {
  delimiter: ',',
  includeHeaders: true,
  quoteStrings: 'auto' as const
};
describe('conversion data integrity', () => {
  it('round trips JSON strings through quoted CSV, including multiline values', () => {
    const rows = [
      {
        name: 'Alice',
        note: 'He said "Hi", then\nleft',
        path: 'C:\\new\\test',
        id: '00123'
      }
    ];
    expect(
      JSON.parse(
        convertCsvToJson(convertJsonToCsv(JSON.stringify(rows), csvOptions), {
          comment: '',
          dynamicTypes: false
        })
      )
    ).toEqual(rows);
  });
  it('fills missing cells without crashes and rejects extra cells and duplicate headers', () => {
    expect(JSON.parse(convertCsvToJson('name,age\nAlice'))).toEqual([
      { name: 'Alice', age: '' }
    ]);
    expect(() => convertCsvToJson('name\nAlice,20')).toThrow('more fields');
    expect(() => convertCsvToJson('name,name\nAlice,Bob')).toThrow('unique');
  });
  it('preserves empty cells, leading zeros, large integers and prototype keys', () => {
    const result = JSON.parse(
      convertCsvToJson(
        '__proto__,id,big,empty\nvalue,00123,9007199254740993,',
        { comment: '' }
      )
    )[0];
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result).toEqual(
      JSON.parse(
        '{"__proto__":"value","id":"00123","big":"9007199254740993","empty":""}'
      )
    );
  });
  it('shares CSV correctness with TSV-to-JSON', () => {
    const options = {
      delimiter: '\t',
      quote: '"',
      comment: '',
      useHeaders: true,
      skipEmptyLines: true,
      dynamicTypes: false,
      indentationType: 'space' as const,
      spacesCount: 2
    };
    expect(
      JSON.parse(convertTsvToJson('name\tnote\nAlice\t"hello\nworld"', options))
    ).toEqual([{ name: 'Alice', note: 'hello\nworld' }]);
  });
  it('exports valid XML with unsafe headers and escaped content', () => {
    const xml = convertCsvToXml(
      'first name,note\nAlice,"A&B <hello>"',
      xmlOptions
    );
    expect(XMLValidator.validate(xml)).toBe(true);
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml);
    expect(parsed.root.row.field['@_name']).toBe('first name');
    expect(parsed.root.row.note).toBe('A&B <hello>');
  });
  it('preserves all values when CSV headers are disabled', () => {
    const xml = convertCsvToXml('Alice,20', {
      ...xmlOptions,
      useHeaders: false
    });
    expect(new XMLParser().parse(xml).root.row).toMatchObject({
      column1: 'Alice',
      column2: 20
    });
  });
  it('safely quotes YAML keys and values rather than interpreting them', () => {
    const options = {
      csvSeparator: ',',
      quoteCharacter: '"',
      commentCharacter: '',
      emptyLines: true,
      headerRow: true,
      spaces: 2
    };
    const yaml = csvToYaml('a: b,note,id\ntrue,"# text: value",00123', options);
    expect(yaml).toBe(
      '-\n  "a: b": "true"\n  "note": "# text: value"\n  "id": "00123"'
    );
  });
  it('produces valid XML from arbitrary JSON keys and primitive roots', () => {
    for (const input of [
      '{"first name":"A&B","xmlns:test":"value"}',
      'null',
      '42',
      '[1,true,null]'
    ]) {
      expect(
        XMLValidator.validate(
          convertJsonToXml(input, {
            indentationType: 'space',
            addMetaTag: true
          })
        )
      ).toBe(true);
    }
  });
  it('does not crash while discovering headers from null or primitives', () => {
    expect(getJsonHeaders('null')).toEqual([]);
    expect(getJsonHeaders('[null,2,{"a":1}]')).toEqual(['a']);
  });
  it('sorts primitive arrays and reports invalid object sorting instead of crashing', () => {
    expect(
      JSON.parse(sortJson('[10,2,1]', { mode: 'value', order: 'asc', key: '' }))
    ).toEqual([1, 2, 10]);
    expect(() =>
      sortJson('[null,{}]', { mode: 'key', order: 'asc', key: '' })
    ).toThrow('requires');
    expect(() =>
      sortJson('[{}]', { mode: 'value', order: 'asc', key: '' })
    ).toThrow('Choose');
  });
  it('preserves prototype-shaped JSON fields and rejects flattened collisions', () => {
    expect(convertJsonToCsv('{"__proto__":"safe"}', csvOptions)).toBe(
      '__proto__\r\nsafe'
    );
    expect(() => convertJsonToCsv('{"a.b":1,"a":{"b":2}}', csvOptions)).toThrow(
      'collision'
    );
  });
});
