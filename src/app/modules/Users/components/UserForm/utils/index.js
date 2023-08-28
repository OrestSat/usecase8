export const getValue = (values, fieldName) => {
  if (!values || (values[fieldName] === undefined)) return '';
  return values[fieldName];
}