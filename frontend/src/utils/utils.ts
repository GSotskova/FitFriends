export const transformDate = (str: string) => {
  const [day, month, year] = str.split('.');
  const date = new Date(+year, +month, +day);
  return date;
};
