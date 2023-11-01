export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

export const isValidMoney = (input: any) => {
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(input);
};
