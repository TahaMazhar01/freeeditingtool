import { InitialValuesType } from './types';
const objectRow = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
export function sortJson(text: string, options: InitialValuesType): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON string');
  }
  const sortObject = (obj: Record<string, unknown>) =>
    Object.fromEntries(
      Object.keys(obj)
        .sort((a, b) =>
          options.order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
        )
        .map((key) => [key, obj[key]])
    );
  if (options.mode === 'key') {
    if (Array.isArray(parsed)) {
      if (!parsed.length) throw new Error('Array is empty');
      if (!parsed.every(objectRow))
        throw new Error('Key sorting requires an object or array of objects.');
      return JSON.stringify(parsed.map(sortObject), null, 2);
    }
    if (!objectRow(parsed))
      throw new Error('Input must be a JSON object or array of objects');
    return JSON.stringify(sortObject(parsed), null, 2);
  }
  if (!Array.isArray(parsed)) throw new Error('Input must be a JSON array');
  if (!parsed.length) throw new Error('Array is empty');
  const objects = parsed.every(objectRow);
  if (!objects && parsed.some((v) => v !== null && typeof v === 'object'))
    throw new Error('Use an array of objects or an array of primitive values.');
  if (objects && !options.key)
    throw new Error('Choose an object key to sort by.');
  const value = (row: any) =>
    objects
      ? Object.hasOwn(row, options.key)
        ? row[options.key]
        : undefined
      : row;
  const sorted = [...parsed].sort((a, b) => {
    const av = value(a),
      bv = value(b);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const x = typeof av === 'object' ? JSON.stringify(av) : av,
      y = typeof bv === 'object' ? JSON.stringify(bv) : bv;
    const cmp =
      typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x).localeCompare(String(y));
    return options.order === 'asc' ? cmp : -cmp;
  });
  return JSON.stringify(sorted, null, 2);
}
