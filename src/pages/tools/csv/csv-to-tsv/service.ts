import { splitCsv, serializeCsv } from '@utils/csv';
export function csvToTsv(
  input: string,
  delimiter: string,
  quoteCharacter: string,
  commentCharacter: string,
  header: boolean,
  emptyLines: boolean
): string {
  const rows = splitCsv(
    input,
    true,
    commentCharacter,
    emptyLines,
    delimiter,
    quoteCharacter
  );
  if (!header) rows.shift();
  return serializeCsv(rows, '\t', '"');
}
