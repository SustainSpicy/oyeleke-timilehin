import { useEffect, useState } from "react";
import TokenForm from "./TokenForm";
import { AiOutlineArrowDown, AiOutlineSwap } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineSwapVert } from "react-icons/md";
import { fetchCurrenciesList } from "../../api";
import MyModal from "../modal";
import { mapImageToToken, truncateString } from "../../constants/utils";
import { converterStore } from "../../constants/store";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";

const Converter = () => {
  const snapshot = useSnapshot(converterStore);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Accessing the states from the store
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    supportedCurrencies,
    isOpen,
    conversionResult,
    currencyImages,
  } = snapshot;

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const tokensList = await fetchCurrenciesList();

        converterStore.supportedCurrencies = await fetchCurrenciesList();
        if (tokensList.length > 1) {
          converterStore.fromToken = { ...tokensList[0] }; // Set default fromToken
          converterStore.toToken = { ...tokensList[4] }; // Set default toToken
          converterStore.currencyImages = mapImageToToken(tokensList); //map token images to symbol
        }
      } catch (error: any) {
        console.error("Error fetching currencies:", error.message);
      }
    }
    fetchCurrencies();
  }, []);

  function swapSelectedTokens() {
    const temp = fromAmount;
    converterStore.fromAmount = toAmount;
    converterStore.toAmount = temp;

    const temp2 = fromToken;
    converterStore.fromToken = toToken;
    converterStore.toToken = temp2;
  }

  const filteredCurrencies = supportedCurrencies.filter((token) => {
    return searchQuery === ""
      ? supportedCurrencies
      : token.currency.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: 800, opacity: 0 }}
      transition={{ duration: 1.1 }}
      className="card flex flex-col gap-6 "
    >
      <div className="card-header">
        <h1 className="text-md text-white font-bold text-3xl mb-4">Swap</h1>
        <span className="text-gray">Trade tokens in an instant</span>
      </div>
      <div className="card-body border-t-1 border-blue-50  flex flex-col gap-4">
        <TokenForm
          type="fromToken"
          symbol={fromToken}
          img={fromToken ? currencyImages[fromToken.currency] : ""}
        />
        <button
          className="rounded-full bg-blue w-10 h-10 hover:bg-sky-900 flex justify-center items-center self-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => swapSelectedTokens()}
        >
          {isHovering ? (
            <MdOutlineSwapVert color="white" fontSize={25} />
          ) : (
            <AiOutlineArrowDown color="#0284c7" fontSize={25} />
          )}
        </button>

        <TokenForm
          type="toToken"
          symbol={toToken}
          img={toToken ? currencyImages[toToken.currency] : ""}
        />
      </div>
      <div className="card-footer text-gray flex flex-col gap-4">
        <div className="flex justify-between">
          <span>Price</span>
          <span>
            1 {toToken?.currency} <AiOutlineSwap className="inline" />{" "}
            {conversionResult
              ? truncateString(conversionResult.toString(), 10)
              : ""}
            {fromToken?.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Slippage Tolerance</span>
          <span>0.5%</span>
        </div>
      </div>
      <button className="active:translate-y-3 rounded-3xl bg-green-700 p-4 text-white hover:bg-green-900">
        Swap
      </button>
      <MyModal>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search for Token"
            className="w-full rounded-2xl border-none outline-none focus:outline-[#0284c7]  p-2 text-md bg-sky-950 text-gray"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <motion.div className="tokenList overflow-x-hidden min-h-[300px] max-h-[500px] overflow-y-scroll flex flex-col ">
          <AnimatePresence>
            {filteredCurrencies.length ? (
              filteredCurrencies.map((token, index) => {
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
                    key={index}
                    onClick={() => {
                      if (!isCurrencySelected) {
                        isOpen.modal === "fromToken"
                          ? (converterStore.fromToken = token)
                          : (converterStore.toToken = token);
                        converterStore.isOpen = { modal: "", open: false };
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
                      <span className="text-white text-sm font-bold">
                        {token.currency}
                      </span>
                      <span className="text-gray white text-xs font-normal">
                        {token.currency.toLowerCase()}
                      </span>
                    </div>
                    <BsArrowRightShort color="white" />
                  </motion.div>
                );
              })
            ) : (
              <motion.span className="p-6 text-gray">
                No Match Found...
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </MyModal>
    </motion.div>
  );
};

export default Converter;
