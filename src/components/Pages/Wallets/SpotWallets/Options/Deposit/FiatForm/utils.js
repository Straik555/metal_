export const expiryDateValidator = str => {
  if (str.length !== 5 || str[2] !== '/') return false;

  const [month, year] = str.split('/').map(n => Number(n));

  const isMonthValid = Number.isInteger(month) && month <= 12;
  const isYearValid = Number.isInteger(year) && year > 0;

  return isMonthValid && isYearValid;
};
export const expiryDatePatternTest = str => /^[0-9/]+$/i.test(str);
