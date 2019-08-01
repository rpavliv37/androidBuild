export const required = (value) => (
  (typeof value !== 'undefined' && value !== null && value !== '')
    ? undefined
    : 'required'
);

export const greaterDate = (fieldName) => (value, values) => {
  const compareValue = values[fieldName];
  return (!compareValue || !value || value > compareValue) ? undefined : 'Due date must be greater than start date';
};