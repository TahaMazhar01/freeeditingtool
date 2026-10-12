import { splitCsv, validateHeaders } from '@utils/csv';
type CsvToJsonOptions = {
  delimiter: string;
  quote: string;
  comment: string;
  useHeaders: boolean;
  skipEmptyLines: boolean;
  dynamicTypes: boolean;
};
const defaults: CsvToJsonOptions = {
  delimiter: ',',
  quote: '"',
  comment: '#',
  useHeaders: true,
  skipEmptyLines: true,
  dynamicTypes: true
};
function parseValue(
  value: string,
  dynamic: boolean
): string | number | boolean | null {
  if (!dynamic || value === '' || value !== value.trim()) return value;
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === 'true';
  if (value === 'null') return null;
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value)) {
    const number = Number(value);
    if (
      Number.isFinite(number) &&
      (!Number.isInteger(number) || Number.isSafeInteger(number))
    )
      return number;
  }
  return value;
}
export function convertCsvToJson(
  csv: string,
  options: Partial<CsvToJsonOptions> = {}
): string {
  const opts = { ...defaults, ...options };
  const rows = splitCsv(
    csv,
    true,
    opts.comment,
    opts.skipEmptyLines,
    opts.delimiter,
    opts.quote
  );
  if (!rows.length) return '[]';
  if (!opts.useHeaders)
    return JSON.stringify(
      rows.map((row) => row.map((v) => parseValue(v, opts.dynamicTypes))),
      null,
      2
    );
  const headers = rows.shift()!;
  validateHeaders(headers);
  return JSON.stringify(
    rows.map((row, index) => {
      if (row.length > headers.length)
        throw new Error(`Record ${index + 2} has more fields than the header.`);
      return Object.fromEntries(
        headers.map((header, i) => [
          header,
          parseValue(row[i] ?? '', opts.dynamicTypes)
        ])
      );
    }),
    null,
    2
  );
}
