import { PriceData, TokenData } from "./types";

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

export function getChartData(fromToken: TokenData, toToken: TokenData) {
  const chartData: PriceData[] = [];
  const timeSlots = [
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
  ];

  for (const time of timeSlots) {
    const minPrice = fromToken && 10; // Replace with appropriate minimum price logic for fromToken
    const maxPrice = toToken && 700; // Replace with appropriate maximum price logic for toToken
    const price = getRandomNumber(minPrice, maxPrice);
    chartData.push({ time, price });
  }

  return chartData;
}

export function checkLocalImage(src: string) {
  var img = new Image();
  img.onload = function () {
    return true;
  };
  // img.onerror = function () {
  //   onError();
  // };
}
