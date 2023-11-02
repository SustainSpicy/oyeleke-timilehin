export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

export const isValidMoney = (input: any) => {
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(input);
};

export function mapImageToToken(tokensList: any) {
  // Create a mapping object for toekn symbols to image filenames
  const currencyImageMap: any = {};
  tokensList.forEach((token: any) => {
    const imageName = `/tokens/${token}.svg`; // Assuming token symbols are unique
    currencyImageMap[token] = imageName;
  });
  return currencyImageMap;
}
