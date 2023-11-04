export type CurrencyImages = {
  [currencySymbol: string]: string;
};

export type TokenData = {
  currency: string;
  price: number;
};

export type Store = {
  isHovering: boolean;
  fromToken: TokenData | null;
  toToken: TokenData | null;
  fromAmount: string;
  toAmount: string;
  supportedCurrencies: TokenData[];
  isOpen: boolean;
  searchQuery: string;
  conversionResult: string;
  currencyImages: CurrencyImages;
  selectedToken: string;
};

export interface PriceData {
  time: string;
  price: number;
}
