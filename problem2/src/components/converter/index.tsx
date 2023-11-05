import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TokenForm from "./TokenForm";
import { AiOutlineSwap } from "react-icons/ai";

import { fetchCurrenciesList } from "../../api";
import { mapImageToToken, truncateString } from "../../constants/utils";
import { converterStore } from "../../constants/store";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import { useAlertContext } from "../../provider/alert";
import CustomModal from "../customModal";
import Honeycomb_loader from "../loaders/honeycomb_loader";
import { Dialog } from "@headlessui/react";
import { BsCurrencyExchange } from "react-icons/bs";
import TokenItem from "./TokenItem";
import { TokenData } from "../../constants/types";
import SwapButton from "./SwapButton";

const Converter = () => {
  const [openAlertBar] = useAlertContext();
  const snapshot = useSnapshot(converterStore);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldOpenTokenSelect, setShouldOpenTokenSelect] =
    useState<boolean>(false);
  const [customModalIsOpen, setCustomModalIsOpen] = useState<boolean>(false);
  // Accessing the states from the store
  const {
    fromToken,
    toToken,
    isOpen,
    supportedCurrencies,
    conversionResult,
    currencyImages,
  } = snapshot;

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const tokensList = await fetchCurrenciesList();

        converterStore.supportedCurrencies = tokensList;
        if (tokensList.length > 1) {
          converterStore.fromToken = { ...tokensList[0] }; // Set default fromToken
          converterStore.toToken = { ...tokensList[4] }; // Set default toToken
          converterStore.currencyImages = mapImageToToken(tokensList); //map token images to symbol
        }
        openAlertBar({
          type: "success",
          msg: "Tokens loaded!",
        });
      } catch (error: any) {
        openAlertBar({
          type: "error",
          msg: error.message || "An error occurred",
        });
      }
    }
    fetchCurrencies();
  }, []);

  const filteredCurrencies: TokenData[] = useMemo(() => {
    return supportedCurrencies.filter(
      (token) =>
        searchQuery === "" ||
        token.currency.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, supportedCurrencies]);

  function swapTokens() {
    setIsLoading(true);
    setCustomModalIsOpen(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: 800, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="card flex flex-col gap-6 "
    >
      {/* header  */}
      <div className="card-header">
        <h1 className="text-md text-white font-bold text-3xl mb-4">Swap</h1>
        <span className="text-gray">Trade tokens in an instant</span>
      </div>

      {/* convertion input */}
      <div className="card-body border-t-1 border-blue-50  flex flex-col gap-4">
        <TokenForm
          type="fromToken"
          symbol={fromToken}
          img={fromToken ? currencyImages[fromToken.currency] : ""}
          setModal={setShouldOpenTokenSelect}
        />
        <SwapButton />

        <TokenForm
          type="toToken"
          symbol={toToken}
          img={toToken ? currencyImages[toToken.currency] : ""}
          setModal={setShouldOpenTokenSelect}
        />
      </div>

      {/* price detail */}
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

      {/* swap button  */}
      <button
        onClick={() => swapTokens()}
        className="active:translate-y-3 rounded-3xl bg-green-700 p-4 text-white hover:bg-green-900"
      >
        Swap
      </button>

      {/* token selection Modal  */}
      <CustomModal
        shouldOpen={shouldOpenTokenSelect}
        setShouldOpen={setShouldOpenTokenSelect}
      >
        <div className="px-4">
          <input
            type="text"
            placeholder="Search for Token"
            className="w-full mb-4 rounded-2xl border-none outline-none focus:outline-[#0284c7]  p-2 text-md bg-sky-950 text-gray"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <motion.div className="tokenList overflow-x-hidden min-h-[300px] max-h-[500px] overflow-y-scroll flex flex-col ">
          <AnimatePresence>
            {filteredCurrencies.length ? (
              filteredCurrencies.map((token, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Initial animation values
                  animate={{ opacity: 1, y: 0 }} // Animation values to animate to
                  exit={{ opacity: 0, y: 20 }} // Exit animation values
                  transition={{
                    // duration: 0.2,
                    delay: index * 0.02,
                  }}
                  key={index}
                >
                  <TokenItem
                    token={token}
                    setModal={setShouldOpenTokenSelect}
                  />
                </motion.div>
              ))
            ) : (
              <motion.span className="p-6 text-gray">
                No Match Found...
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </CustomModal>

      {/* token success dialog  */}
      <CustomModal
        isLoading={isLoading}
        shouldOpen={customModalIsOpen}
        setShouldOpen={setCustomModalIsOpen}
        loaderComponent={Honeycomb_loader}
      >
        <Dialog.Panel className="z-50 w-full flex flex-col gap-6 max-w-md max-h-md transform overflow-hidden rounded-2xl bg-blue p-0 text-left align-middle shadow-xl transition-all">
          <div className="main p-6 flex flex-col items-center gap-4">
            <h1 className="font-bold font-xl text-white">Swap Completed</h1>

            <BsCurrencyExchange fontSize={"50px"} color="white" />
          </div>
        </Dialog.Panel>
      </CustomModal>
    </motion.div>
  );
};

export default Converter;
