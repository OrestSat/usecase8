export const getValue = (values, fieldName) => {
  return (values && values[fieldName]) || '';
}