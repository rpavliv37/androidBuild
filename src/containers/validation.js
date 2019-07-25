export const required = (value) => (
  (typeof value !== 'undefined' && value !== null && value !== '')
    ? undefined
    : 'required'
);