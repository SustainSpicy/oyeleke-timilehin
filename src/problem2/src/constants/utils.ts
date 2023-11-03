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
    const imageName = `/tokens/${token.currency}.svg`; // Assuming token symbols are unique
    currencyImageMap[token.currency] = imageName;
  });

  return currencyImageMap;
}

export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

export function getRandomNumber(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
