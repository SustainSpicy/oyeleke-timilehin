import { Dispatch, SetStateAction, useEffect } from "react";
import { BiCaretDown } from "react-icons/bi";
import ConvertionInput from "../form";
import { TokenData } from "../../constants/types";
import { converterStore } from "../../constants/store";
import { useSnapshot } from "valtio";
import { tokenConversion } from "../../api";
import { useAlertContext } from "../../provider/alert";

interface TokenFormProps {
  type: string;
  img: string;
  symbol: TokenData | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const TokenForm = ({ type, img, symbol, setModal }: TokenFormProps) => {
  const [openAlertBar] = useAlertContext();
  const snapshot = useSnapshot(converterStore);
  const {
    fromToken,
    toToken,
    conversionResult,
    fromAmount,
    toAmount,
    supportedCurrencies,
  } = snapshot;

  useEffect(() => {
    async function quickPriceConvertion() {
      try {
        if (fromToken && toToken) {
          const mutableSupportedCurrencies: TokenData[] = [
            ...supportedCurrencies,
          ];
          const result = await tokenConversion(
            conversionResult,
            fromToken,
            toToken,
            mutableSupportedCurrencies
          );
          if (result) {
            converterStore.conversionResult = result.toString();
          }
        }
      } catch (error: any) {
        openAlertBar({
          type: "error",
          msg: error.message || "An error occurred",
        });
      }
    }
    quickPriceConvertion();
    // eslint-disable-next-line
  }, [fromToken, toToken]);

  async function handleTokenConversion(amount: string) {
    if (type === "fromToken") {
      converterStore.fromAmount = amount;
    }
    if (type === "toToken") {
      converterStore.toAmount = amount;
    }
    if (amount && fromToken && toToken) {
      const mutableSupportedCurrencies: TokenData[] = [...supportedCurrencies];
      const result = await tokenConversion(
        amount,
        fromToken,
        toToken,
        mutableSupportedCurrencies
      );
      if (result) {
        if (type === "fromToken") {
          converterStore.toAmount = result.toString();
        }
        if (type === "toToken") {
          converterStore.fromAmount = result.toString();
        }
        converterStore.conversionResult = result.toString();
      }
    }
  }
  return (
    <>
      <div className="formWrapper flex flex-col gap-2">
        <div
          onClick={() => {
            setModal(true);
            converterStore.selectedToken = type;
          }}
          className="active:translate-y-2 flex gap-2 cursor-pointer hover:opacity-70 transition duration-300 ease-in-out w-fit"
        >
          <div className="w-6 h-6 bg-gray rounded-full ">
            <img
              src={img}
              alt="token_logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center ">
            <span className="text-white text-sm font-bold">
              {symbol?.currency}
            </span>
            <BiCaretDown color="white" />
          </div>
        </div>

        <ConvertionInput
          onAmountChange={handleTokenConversion}
          amount={type === "fromToken" ? fromAmount : toAmount}
        />
      </div>
    </>
  );
};

export default TokenForm;
