import { InitialValuesType } from './types';
import { splitCsv, serializeCsv } from '@utils/csv';

export function changeCsvSeparator(
  input: string,
  options: InitialValuesType
): string {
  if (!input) return '';

  const rows = splitCsv(
    input,
    true,
    options.commentCharacter,
    options.emptyLines,
    options.inputSeparator,
    options.inputQuoteCharacter
  );

  return serializeCsv(
    rows,
    options.outputSeparator,
    options.OutputQuoteCharacter,
    options.outputQuoteAll
  );
}
