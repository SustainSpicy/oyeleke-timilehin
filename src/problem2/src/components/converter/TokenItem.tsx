import { motion } from "framer-motion";
import { BsArrowRightShort } from "react-icons/bs";
import { useSnapshot } from "valtio";
import { converterStore } from "../../constants/store";
import { TokenData } from "../../constants/types";
import { Dispatch, SetStateAction } from "react";

interface TokenItemProps {
  token: TokenData;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const TokenItem = ({ token, setModal }: TokenItemProps) => {
  const snapshot = useSnapshot(converterStore);
  const { fromToken, toToken, selectedToken, currencyImages } = snapshot;

  const isCurrencySelected =
    token.currency === fromToken?.currency ||
    token.currency === toToken?.currency;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      className={`active:translate-y-2 transition duration-300 ease-in-out tokeItem flex gap-2 p-4 hover:bg-black cursor-pointer select-none items-center ${
        isCurrencySelected ? "bg-black cursor-not-allowed" : ""
      }`}
      onClick={() => {
        if (!isCurrencySelected) {
          selectedToken === "fromToken"
            ? (converterStore.fromToken = token)
            : (converterStore.toToken = token);
          setModal(false);
        }
      }}
    >
      <div className="w-6 h-6 bg-gray rounded-full ">
        <img
          src={currencyImages[token.currency]}
          alt="token_logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-white text-sm font-bold">{token.currency}</span>
        <span className="text-gray white text-xs font-normal">
          {token.currency.toLowerCase()}
        </span>
      </div>
      <BsArrowRightShort color="white" />
    </motion.div>
  );
};

export default TokenItem;
