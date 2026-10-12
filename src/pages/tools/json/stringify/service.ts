export const stringifyJson = (
  input: string,
  indentationType: 'tab' | 'space',
  spacesCount: number,
  escapeHtml: boolean
): string => {
  let parsedInput;
  try {
    parsedInput = JSON.parse(input);
  } catch (e) {
    throw new Error(
      'Invalid JSON. Use double-quoted keys and strings; JavaScript expressions are not supported.'
    );
  }

  if (!Number.isInteger(spacesCount) || spacesCount < 0 || spacesCount > 10) {
    throw new Error('Indentation must be a whole number between 0 and 10.');
  }
  const indent = indentationType === 'tab' ? '\t' : spacesCount;
  let result = JSON.stringify(parsedInput, null, indent);

  if (escapeHtml) {
    result = result
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return result;
};
