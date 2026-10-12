/** Parse complete CSV records, including quoted newlines and doubled quotes. */
export function splitCsv(
  input: string,
  deleteComment: boolean,
  commentCharacter: string,
  deleteEmptyLines: boolean,
  delimiter = ',',
  quoteChar = '"'
): string[][] {
  if (!delimiter || /[\r\n]/.test(delimiter))
    throw new Error('Choose a non-empty CSV separator without line breaks.');
  if (
    quoteChar.length > 1 ||
    /[\r\n]/.test(quoteChar) ||
    quoteChar === delimiter
  )
    throw new Error(
      'Choose a single quote character different from the separator.'
    );
  if (!input) return [];
  const text = input.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [],
    cell = '',
    quoted = false,
    inQuotes = false,
    closed = false,
    skippedComment = false,
    recordHasFields = false;
  const pushCell = () => {
    row.push(quoted ? cell : cell.trim());
    cell = '';
    quoted = false;
    closed = false;
  };
  const pushRow = () => {
    pushCell();
    if (
      !deleteEmptyLines ||
      recordHasFields ||
      row.some((v) => v.trim() !== '')
    )
      rows.push(row);
    row = [];
    recordHasFields = false;
  };
  for (let i = 0; i < text.length; i++) {
    if (
      !inQuotes &&
      row.length === 0 &&
      cell.trim() === '' &&
      !quoted &&
      deleteComment &&
      commentCharacter &&
      text.startsWith(commentCharacter, i)
    ) {
      while (i < text.length && text[i] !== '\n' && text[i] !== '\r') i++;
      if (text[i] === '\r' && text[i + 1] === '\n') i++;
      cell = '';
      skippedComment = true;
      continue;
    }
    skippedComment = false;
    const char = text[i];
    if (inQuotes) {
      if (char === quoteChar) {
        if (text[i + 1] === quoteChar) {
          cell += quoteChar;
          i++;
        } else {
          inQuotes = false;
          closed = true;
        }
      } else cell += char;
      continue;
    }
    if (text.startsWith(delimiter, i)) {
      recordHasFields = true;
      pushCell();
      i += delimiter.length - 1;
    } else if (char === '\r' || char === '\n') {
      pushRow();
      if (char === '\r' && text[i + 1] === '\n') i++;
    } else if (
      quoteChar &&
      char === quoteChar &&
      cell.trim() === '' &&
      !closed
    ) {
      cell = '';
      quoted = true;
      recordHasFields = true;
      inQuotes = true;
    } else if (closed && char.trim() !== '')
      throw new Error('Unexpected text after a quoted CSV field.');
    else if (!closed) cell += char;
  }
  if (inQuotes) throw new Error('Unclosed quoted CSV field.');
  if (
    !skippedComment &&
    (row.length || cell || quoted || !/[\r\n]$/.test(text))
  )
    pushRow();
  return rows;
}
export function getCsvHeaders(
  input: string,
  delimiter = ',',
  quote = '"',
  comment = ''
): string[] {
  return splitCsv(input, true, comment, true, delimiter, quote)[0] ?? [];
}
export function validateHeaders(headers: string[]): void {
  if (new Set(headers).size !== headers.length)
    throw new Error(
      'CSV headers must be unique; duplicate headers would lose data.'
    );
}
export function serializeCsv(
  rows: string[][],
  delimiter = ',',
  quote = '"',
  quoteAll = false
): string {
  if (!delimiter) throw new Error('Choose a non-empty output separator.');
  if (quote.length > 1 || quote === delimiter)
    throw new Error(
      'Choose a single output quote character different from the separator.'
    );
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const needsQuote =
            quoteAll ||
            cell.includes(delimiter) ||
            /[\r\n]/.test(cell) ||
            cell !== cell.trim() ||
            (!!quote && cell.includes(quote));
          if (!needsQuote) return cell;
          if (!quote)
            throw new Error(
              'An output quote character is required to preserve this data.'
            );
          return quote + cell.split(quote).join(quote + quote) + quote;
        })
        .join(delimiter)
    )
    .join('\n');
}
