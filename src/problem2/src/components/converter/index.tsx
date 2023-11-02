import React, { useEffect, useState } from "react";
import TokenForm from "./TokenForm";
import { AiOutlineArrowDown, AiOutlineSwap } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineSwapVert } from "react-icons/md";
import { convertCurrency, fetchCurrenciesList } from "../../api";
import MyModal from "../modal";

import { CurrencyImages, TokenData } from "../../constants/types";
import { mapImageToToken } from "../../constants/utils";
import { converterStore } from "../../constants/store";
import { useSnapshot } from "valtio";

const Converter = () => {
  const snapshot = useSnapshot(converterStore);
  const [isHovering, setIsHovering] = useState(false);

  const [currencyImages, setCurrencyImages] = useState<CurrencyImages>({});
  // const [isOpen, setIsOpen] = useState({ modal: "", open: false });
  const [searchQuery, setSearchQuery] = useState("");

  // Accessing the states from the store
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    supportedCurrencies,
    isOpen,
  } = snapshot;

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        // const tokensList = await fetchCurrenciesList2();
        const tokensList = tokenData;

        converterStore.supportedCurrencies = tokensList;
        converterStore.fromToken = tokensList[0]; // Set default fromToken
        converterStore.toToken = tokensList[1]; // Set default toToken
        setCurrencyImages(mapImageToToken(tokensList)); //map token images to symbol
      } catch (error: any) {
        console.error("Error fetching currencies:", error.message);
      }
    }
    fetchCurrencies();
  }, []);

  function swapSelectedTokens() {
    const temp = fromToken;
    converterStore.fromToken = toToken;
    converterStore.toToken = temp;

    const temp2 = fromAmount;
    converterStore.fromAmount = toAmount;
    converterStore.toAmount = temp2;
  }
  const filteredCurrencies = supportedCurrencies.filter((token) => {
    return searchQuery === ""
      ? supportedCurrencies
      : token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
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
          img={fromToken ? currencyImages[fromToken.symbol] : ""}
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
          img={toToken ? currencyImages[toToken.symbol] : ""}
        />
      </div>
      <div className="card-footer text-gray flex flex-col gap-4">
        <div className="flex justify-between">
          <span>Price</span>
          <span>
            1 {toToken?.symbol} <AiOutlineSwap className="inline" /> {toAmount}
            {fromToken?.symbol}
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
      <MyModal isOpen={isOpen.open} setIsOpen={converterStore.isOpen}>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search for Token"
            className="w-full rounded-2xl border-none outline-none focus:outline-[#0284c7]  p-2 text-md bg-sky-950 text-gray"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="tokenList overflow-x-hidden min-h-[300px] max-h-[500px] overflow-y-scroll">
          {filteredCurrencies.map((token, index) => (
            <div
              className="tokeItem flex gap-2 p-4 hover:bg-black cursor-pointer select-none items-center"
              key={index}
              onClick={() => {
                isOpen.modal === "fromToken"
                  ? (converterStore.fromToken = token)
                  : (converterStore.toToken = token);
                converterStore.isOpen = { modal: "", open: false };
              }}
            >
              <div className="w-6 h-6 bg-gray rounded-full ">
                <img
                  src={currencyImages[token.symbol]}
                  alt="token_logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-white text-sm font-bold">
                  {token.symbol.toUpperCase()}
                </span>
                <span className="text-gray white text-xs font-normal">
                  {token.name}
                </span>
              </div>
              <BsArrowRightShort color="white" />
            </div>
          ))}
        </div>
      </MyModal>
    </div>
  );
};

export default Converter;

const tokenData = [
  { id: "01coin", symbol: "zoc", name: "01coin" },
  { id: "0chain", symbol: "zcn", name: "Zus" },
  { id: "0-knowledge-network", symbol: "0kn", name: "0 Knowledge Network" },
  { id: "0-mee", symbol: "ome", name: "O-MEE" },
  { id: "0vix-protocol", symbol: "vix", name: "0VIX Protocol" },
  { id: "0x", symbol: "zrx", name: "0x Protocol" },
  {
    id: "0x0-ai-ai-smart-contract",
    symbol: "0x0",
    name: "0x0.ai: AI Smart Contract",
  },
  {
    id: "0x1-tools-ai-multi-tool",
    symbol: "0x1",
    name: "0x1.tools: AI Multi-tool",
  },
  {
    id: "0xauto-io-contract-auto-deployer",
    symbol: "0xa",
    name: "0xAuto.io : Contract Auto Deployer",
  },
  { id: "0xcoco", symbol: "coco", name: "0xCoco" },
  { id: "0xdao", symbol: "oxd", name: "0xDAO" },
  { id: "0xdefcafe", symbol: "cafe", name: "0xDEFCAFE" },
  { id: "0xfreelance", symbol: "0xfree", name: "0xFreelance" },
  { id: "0xfriend", symbol: "0xf", name: "0xFriend" },
  { id: "0xgambit", symbol: "0xg", name: "0xgambit" },
  { id: "0xgasless", symbol: "0xgas", name: "0xGasless" },
  { id: "0x-leverage", symbol: "oxl", name: "0x Leverage" },
  { id: "0xlsd", symbol: "0xlsd", name: "0xLSD" },
  { id: "0xmonero", symbol: "0xmr", name: "0xMonero" },
  { id: "0xs", symbol: "$0xs", name: "0xS" },
  { id: "0xshield", symbol: "shield", name: "0xShield" },
  { id: "0xsniper", symbol: "0xs", name: "0xSniper" },
  { id: "12ships", symbol: "tshp", name: "12Ships" },
  { id: "1art", symbol: "1art", name: "OneArt" },
  { id: "1eco", symbol: "1eco", name: "1eco" },
  { id: "1hive-water", symbol: "water", name: "1Hive Water" },
  { id: "1inch", symbol: "1inch", name: "1inch" },
  { id: "1inch-yvault", symbol: "yv1inch", name: "1INCH yVault" },
  { id: "1million-nfts", symbol: "1mil", name: "1MillionNFTs" },
  { id: "1minbet", symbol: "1mb", name: "1minBET" },
  { id: "1move token", symbol: "1mt", name: "1Move Token" },
  { id: "1peco", symbol: "1peco", name: "1peco" },
  { id: "1reward-token", symbol: "1rt", name: "1Reward Token" },
  { id: "1safu", symbol: "safu", name: "1SAFU" },
  { id: "1sol", symbol: "1sol", name: "1Sol" },
  { id: "1sol-io-wormhole", symbol: "1sol", name: "1sol.io (Wormhole)" },
  { id: "-2", symbol: "₿", name: "₿" },
  { id: "2049", symbol: "2049", name: "2049" },
  { id: "2080", symbol: "2080", name: "2080" },
  { id: "20weth-80bal", symbol: "20weth-80bal", name: "20WETH-80BAL" },
  { id: "28", symbol: "28", name: "28" },
  { id: "28vck", symbol: "vck", name: "28VCK" },
  { id: "2acoin", symbol: "arms", name: "2ACoin" },
  { id: "2dai-io", symbol: "2dai", name: "2DAI.io" },
  { id: "2g-carbon-coin", symbol: "2gcc", name: "2G Carbon Coin" },
  { id: "2moon", symbol: "moon", name: "2MOON" },
  { id: "2omb-finance", symbol: "2omb", name: "2omb" },
  { id: "2share", symbol: "2shares", name: "2SHARE" },
  { id: "300fit", symbol: "fit", name: "300FIT" },
  { id: "3d3d", symbol: "3d3d", name: "3d3d" },
  { id: "3dpass", symbol: "p3d", name: "3DPass" },
  { id: "3-kingdoms-multiverse", symbol: "3km", name: "3 Kingdoms Multiverse" },
  { id: "3shares", symbol: "3share", name: "3Share" },
  { id: "3xcalibur", symbol: "xcal", name: "3xcalibur Ecosystem Token" },
  { id: "42-coin", symbol: "42", name: "42-coin" },
  { id: "4artechnologies", symbol: "4art", name: "4ART Coin" },
  { id: "4chan", symbol: "4chan", name: "4Chan" },
  { id: "4d-twin-maps-2", symbol: "4dmaps", name: "4D Twin Maps" },
  { id: "4int", symbol: "4int", name: "4INT" },
  { id: "4jnet", symbol: "4jnet", name: "4JNET" },
  { id: "50cent", symbol: "50c", name: "50Cent" },
  { id: "5g-cash", symbol: "vgc", name: "5G-CASH" },
  { id: "5km-run", symbol: "run", name: "5KM RUN" },
  { id: "888tron", symbol: "888", name: "888tron" },
  { id: "88mph", symbol: "mph", name: "88mph" },
  { id: "8bitearn", symbol: "8bit", name: "8BITEARN" },
  { id: "8pay", symbol: "8pay", name: "8Pay" },
  { id: "99starz", symbol: "stz", name: "99Starz" },
  { id: "9-lives-network", symbol: "ninefi", name: "9 Lives Network" },
  { id: "a3s", symbol: "aa", name: "A3S" },
  { id: "a4-finance", symbol: "a4", name: "A4 Finance" },
  { id: "aada-finance", symbol: "lenfi", name: "Lenfi" },
  { id: "aag-ventures", symbol: "aag", name: "AAG" },
  { id: "aardvark", symbol: "ardvrk", name: "Aardvark" },
  { id: "aave", symbol: "aave", name: "Aave" },
  { id: "aave-aave", symbol: "aaave", name: "Aave AAVE" },
  {
    id: "aave-amm-bptbalweth",
    symbol: "aammbptbalweth",
    name: "Aave AMM BptBALWETH",
  },
  {
    id: "aave-amm-bptwbtcweth",
    symbol: "aammbptwbtcweth",
    name: "Aave AMM BptWBTCWETH",
  },
  { id: "aave-amm-dai", symbol: "aammdai", name: "Aave AMM DAI" },
  {
    id: "aave-amm-uniaaveweth",
    symbol: "aammuniaaveweth",
    name: "Aave AMM UniAAVEWETH",
  },
  {
    id: "aave-amm-unibatweth",
    symbol: "aammunibatweth",
    name: "Aave AMM UniBATWETH",
  },
  {
    id: "aave-amm-unicrvweth",
    symbol: "aammunicrvweth",
    name: "Aave AMM UniCRVWETH",
  },
  {
    id: "aave-amm-unidaiusdc",
    symbol: "aammunidaiusdc",
    name: "Aave AMM UniDAIUSDC",
  },
  {
    id: "aave-amm-unidaiweth",
    symbol: "aammunidaiweth",
    name: "Aave AMM UniDAIWETH",
  },
  {
    id: "aave-amm-unilinkweth",
    symbol: "aammunilinkweth",
    name: "Aave AMM UniLINKWETH",
  },
  {
    id: "aave-amm-unimkrweth",
    symbol: "aammunimkrweth",
    name: "Aave AMM UniMKRWETH",
  },
  {
    id: "aave-amm-unirenweth",
    symbol: "aammunirenweth",
    name: "Aave AMM UniRENWETH",
  },
  {
    id: "aave-amm-unisnxweth",
    symbol: "aammunisnxweth",
    name: "Aave AMM UniSNXWETH",
  },
  {
    id: "aave-amm-uniuniweth",
    symbol: "aammuniuniweth",
    name: "Aave AMM UniUNIWETH",
  },
  {
    id: "aave-amm-uniusdcweth",
    symbol: "aammuniusdcweth",
    name: "Aave AMM UniUSDCWETH",
  },
  {
    id: "aave-amm-uniwbtcusdc",
    symbol: "aammuniwbtcusdc",
    name: "Aave AMM UniWBTCUSDC",
  },
  {
    id: "aave-amm-uniwbtcweth",
    symbol: "aammuniwbtcweth",
    name: "Aave AMM UniWBTCWETH",
  },
  {
    id: "aave-amm-uniyfiweth",
    symbol: "aammuniyfiweth",
    name: "Aave AMM UniYFIWETH",
  },
];
