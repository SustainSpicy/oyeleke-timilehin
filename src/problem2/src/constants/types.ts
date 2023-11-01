import { ChangeEvent } from "react";

export interface ConversionInputProps {
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type CurrencyImages = {
  [currencySymbol: string]: string;
};
