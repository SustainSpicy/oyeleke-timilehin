import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiCaretDown } from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import MyModal from "../modal";
import ConvertionForm from "../form";
import ConvertionInput from "../form";
import { TokenData } from "../../constants/types";
import { converterStore } from "../../constants/store";
import { useSnapshot } from "valtio";
import { convertCurrency } from "../../api";

interface TokenFormProps {
  type: string;
  img: string;
  symbol: TokenData | null;
  // onAmountChange: (amount: string) => void;
}

const TokenForm = ({ type, img, symbol }: TokenFormProps) => {
  const snapshot = useSnapshot(converterStore);
  const { fromToken, toToken, fromAmount, toAmount } = snapshot;

  async function handleTokenConversion(amount: string) {
    if (amount && fromToken && toToken) {
      const conversionRate = await convertCurrency(
        type === "fromToken" ? fromToken.id : toToken.id,
        type === "fromToken" ? toToken.id : fromToken.id,
        parseFloat(amount)
      );
      if (conversionRate !== "NaN")
        if (type === "fromToken") {
          converterStore.toAmount = conversionRate;
        } else {
          converterStore.fromAmount = conversionRate;
        }
    }
  }
  return (
    <>
      <div className="formWrapper flex flex-col gap-2">
        <div
          onClick={() => (converterStore.isOpen = { modal: type, open: true })}
          className="flex gap-2 cursor-pointer hover:opacity-70 transition duration-300 ease-in-out"
        >
          <div className="w-6 h-6 bg-gray rounded-full ">
            <img
              src={img && img}
              alt="token_logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center ">
            <span className="text-white text-sm font-bold">
              {symbol?.symbol.toUpperCase()}
            </span>
            <BiCaretDown color="white" />
          </div>
        </div>
        <div className=" rounded-3xl  border-blue-2 bg-blue hover:border-white">
          <ConvertionInput
            onAmountChange={handleTokenConversion}
            amount={type === "fromToken" ? fromAmount : toAmount}
          />
        </div>
      </div>
    </>
  );
};

export default TokenForm;
