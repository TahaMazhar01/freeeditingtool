import { InitialValuesType } from './types';
import { convertCsvToJson } from '../csv-to-json/service';
export function convertTsvToJson(
  input: string,
  options: InitialValuesType
): string {
  if (!input) return '';
  const data = JSON.parse(convertCsvToJson(input, options));
  if (
    options.indentationType === 'space' &&
    (!Number.isInteger(options.spacesCount) ||
      options.spacesCount < 0 ||
      options.spacesCount > 10)
  )
    throw new Error('Indentation must be a whole number between 0 and 10.');
  return JSON.stringify(
    data,
    null,
    options.indentationType === 'none'
      ? undefined
      : options.indentationType === 'tab'
        ? '\t'
        : options.spacesCount
  );
}
