import { escapeXml, xmlTag } from '@utils/xml';
type JsonToXmlOptions = {
  indentationType: 'space' | 'tab' | 'none';
  addMetaTag: boolean;
};
export function convertJsonToXml(
  json: string,
  options: JsonToXmlOptions
): string {
  const obj: unknown = JSON.parse(json);
  const newline = options.indentationType === 'none' ? '' : '\n';
  const indent = (depth: number) =>
    options.indentationType === 'space'
      ? '  '.repeat(depth)
      : options.indentationType === 'tab'
        ? '\t'.repeat(depth)
        : '';
  const element = (key: string, value: unknown, depth: number): string => {
    const { name, attributes } = xmlTag(key);
    const open = `<${name}${attributes}>`,
      close = `</${name}>`;
    if (value === null || typeof value !== 'object')
      return (
        indent(depth) +
        open +
        (value === null ? '' : escapeXml(String(value))) +
        close +
        newline
      );
    const entries = Array.isArray(value)
      ? value.map((item, i) => [`row-${i}`, item] as const)
      : Object.entries(value);
    const body = entries
      .map(([childKey, child]) =>
        Array.isArray(child) && !Array.isArray(value)
          ? child.map((item) => element(childKey, item, depth + 1)).join('')
          : element(childKey, child, depth + 1)
      )
      .join('');
    return (
      indent(depth) + open + newline + body + indent(depth) + close + newline
    );
  };
  const body =
    obj !== null && typeof obj === 'object'
      ? (Array.isArray(obj)
          ? obj.map((v, i) => [`row-${i}`, v] as const)
          : Object.entries(obj)
        )
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map((item) => element(key, item, 1)).join('')
              : element(key, value, 1)
          )
          .join('')
      : element('value', obj, 1);
  return (
    (options.addMetaTag
      ? '<?xml version="1.0" encoding="UTF-8"?>' + newline
      : '') +
    '<root>' +
    newline +
    body +
    '</root>'
  );
}
