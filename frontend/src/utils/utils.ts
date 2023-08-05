export const transformDate = (str: string) => {
  const [day, month, year] = str.split('.');
  const date = new Date(+year, +month, +day);
  return date;
};

export const genrateRandomNumber = () => {
  const min = 1;
  const max = 12;
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum < 10 ? `0${randNum}` : randNum.toString();
};
