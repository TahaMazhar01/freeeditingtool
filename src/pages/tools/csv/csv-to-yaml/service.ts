import { InitialValuesType } from './types';
import { splitCsv, validateHeaders } from '@utils/csv';
export function main(input: string, options: InitialValuesType): string {
  if (!input) return '';
  if (
    !Number.isInteger(options.spaces) ||
    options.spaces < 1 ||
    options.spaces > 10
  )
    throw new Error('Indent spaces must be a whole number between 1 and 10.');
  const rows = splitCsv(
    input,
    true,
    options.commentCharacter,
    options.emptyLines,
    options.csvSeparator,
    options.quoteCharacter
  );
  const indent = ' '.repeat(options.spaces);
  if (!rows.length) return '[]';
  if (!options.headerRow)
    return rows
      .map(
        (row) =>
          '-\n' +
          row.map((cell) => indent + '- ' + JSON.stringify(cell)).join('\n')
      )
      .join('\n');
  const headers = rows.shift()!;
  validateHeaders(headers);
  if (!rows.length) return '[]';
  return rows
    .map((row, index) => {
      if (row.length > headers.length)
        throw new Error(`Record ${index + 2} has more fields than the header.`);
      return (
        '-\n' +
        headers
          .map(
            (header, i) =>
              indent +
              JSON.stringify(header) +
              ': ' +
              JSON.stringify(row[i] ?? '')
          )
          .join('\n')
      );
    })
    .join('\n');
}
