import React, { useEffect, useState } from "react";
import TokenForm from "./TokenForm";
import { AiOutlineArrowDown, AiOutlineSwap } from "react-icons/ai";
import { MdOutlineSwapVert } from "react-icons/md";
import { fetchCurrenciesList, mapImageToToken } from "../../api";
import MyModal from "../modal";
import { log } from "console";
import { CurrencyImages } from "../../constants/types";

const Converter = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [amount, setAmount] = useState<number | null>();
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [currencyImages, setCurrencyImages] = useState<CurrencyImages>({});
  const [isOpen, setIsOpen] = useState({ modal: "", open: false });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const tokensList = await fetchCurrenciesList();

        setSupportedCurrencies(tokensList);
        setFromToken(tokensList[0]); // Set default fromToken
        setToToken(tokensList[1]); // Set default toToken
        setCurrencyImages(mapImageToToken(tokensList)); //map token images to symbol
      } catch (error: any) {
        console.error("Error fetching currencies:", error.message);
      }
    }
    fetchCurrencies();
  }, []);

  function swapSelectedTokens() {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  }
  const filteredCurrencies = supportedCurrencies.filter((token) => {
    return searchQuery === ""
      ? supportedCurrencies
      : token.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="card flex flex-col gap-6 ">
      <div className="card-header">
        <h1 className="text-md text-white font-bold text-3xl mb-4">Swap</h1>
        <span className="text-gray">Trade tokens in an instant</span>
      </div>
      <div className="card-body border-t-1 border-blue-50  flex flex-col gap-4">
        <TokenForm
          type="fromToken"
          symbol={fromToken}
          img={currencyImages[fromToken]}
          onAmountChange={() => {}}
          setIsOpen={setIsOpen}
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
          img={currencyImages[toToken]}
          onAmountChange={() => {}}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="card-footer text-gray flex flex-col gap-4">
        <div className="flex justify-between">
          <span>Price</span>
          <span>
            1 CAKE <AiOutlineSwap className="inline" /> 0.0387581 BNB
          </span>
        </div>
        <div className="flex justify-between">
          <span>Slippage Tolerance</span>
          <span>0.5%</span>
        </div>
      </div>
      <button className="rounded-3xl bg-green-700 p-4 text-white hover:bg-green-900">
        Swap
      </button>
      <MyModal isOpen={isOpen.open} setIsOpen={setIsOpen}>
        <input
          type="text"
          placeholder="Search for Token"
          className="w-full rounded-2xl border-none outline-none focus:outline-[#0284c7]  p-2 text-md bg-sky-950 text-gray"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="tokenList min-h-[300px] max-h-[500px] overflow-y-scroll">
          {filteredCurrencies.map((token, index) => (
            <div
              className="tokeItem flex gap-2 p-4 hover:bg-black cursor-pointer select-none"
              key={index}
              onClick={() => {
                isOpen.modal === "fromToken"
                  ? setFromToken(token)
                  : setToToken(token);
                setIsOpen({ modal: "", open: false });
              }}
            >
              <div className="w-6 h-6 bg-gray rounded-full ">
                <img
                  src={currencyImages[token]}
                  alt="token_logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white text-sm font-bold">
                {token.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </MyModal>
    </div>
  );
};

export default Converter;
