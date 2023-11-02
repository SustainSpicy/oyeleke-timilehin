import { proxy } from "valtio";
import { TokenData } from "./types";

type Store = {
  isHovering: boolean;
  fromToken: TokenData | null;
  toToken: TokenData | null;
  fromAmount: string;
  toAmount: string;
  supportedCurrencies: TokenData[];
  isOpen: { modal: string; open: boolean };
  searchQuery: string;
};
export const converterStore: Store = proxy({
  isHovering: false,
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
  supportedCurrencies: [],
  currencyImages: {},
  isOpen: { modal: "", open: false },
  searchQuery: "",
});
