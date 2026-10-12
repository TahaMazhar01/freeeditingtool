export function escapeXml(value: string): string {
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value))
    throw new Error('Input contains characters that XML cannot represent.');
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
export function xmlTag(key: string): { name: string; attributes: string } {
  return /^[A-Za-z_][A-Za-z0-9_.-]*$/.test(key)
    ? { name: key, attributes: '' }
    : { name: 'field', attributes: ` name="${escapeXml(key)}"` };
}
export function xmlElement(key: string, value: string): string {
  const { name, attributes } = xmlTag(key);
  return `<${name}${attributes}>${escapeXml(value)}</${name}>`;
}
