import { splitCsv, validateHeaders } from '@utils/csv';
import { xmlElement } from '@utils/xml';
type CsvToXmlOptions = {
  delimiter: string;
  quote: string;
  comment: string;
  useHeaders: boolean;
  skipEmptyLines: boolean;
};
export function convertCsvToXml(csv: string, options: CsvToXmlOptions): string {
  const rows = splitCsv(
    csv,
    true,
    options.comment,
    options.skipEmptyLines,
    options.delimiter,
    options.quote
  );
  const headers = options.useHeaders ? rows.shift() ?? [] : [];
  validateHeaders(headers);
  const output = rows
    .map((row, index) => {
      if (options.useHeaders && row.length > headers.length)
        throw new Error(`Record ${index + 2} has more fields than the header.`);
      const names = options.useHeaders
        ? headers
        : row.map((_, i) => `column${i + 1}`);
      return `  <row id="${index}">\n${names
        .map((name, i) => `    ${xmlElement(name, row[i] ?? '')}\n`)
        .join('')}  </row>\n`;
    })
    .join('');
  return `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${output}</root>`;
}
