export const checkValue = value => {
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.length > 200) return false;
  return true;
};
