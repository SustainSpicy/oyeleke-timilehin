import { proxy } from "valtio";
import { Store } from "./types";

export const converterStore: Store = proxy({
  isHovering: false,
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
  supportedCurrencies: [],
  currencyImages: {},
  isOpen: false,
  searchQuery: "",
  conversionResult: "",
  selectedToken: "",
});
