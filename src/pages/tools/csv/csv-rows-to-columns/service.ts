import { splitCsv, serializeCsv } from '@utils/csv';
function compute(rows: string[][], columnCount: number): string[][] {
  const result: string[][] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < columnCount; j++) {
      if (!result[j]) {
        result[j] = [];
      }
      result[j][i] = row[j];
    }
  }
  return result;
}
export function csvRowsToColumns(
  input: string,
  emptyValuesFilling: boolean,
  customFiller: string,
  commentCharacter: string
): string {
  if (!input) {
    return '';
  }

  const rows = splitCsv(input, true, commentCharacter, false);
  if (!rows.length) return '';
  const columnCount = Math.max(...rows.map((row) => row.length));
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columnCount; j++) {
      if (!rows[i][j]) {
        rows[i][j] = emptyValuesFilling ? '' : customFiller;
      }
    }
  }
  const result = compute(rows, columnCount);
  return serializeCsv(result);
}
