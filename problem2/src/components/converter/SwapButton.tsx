import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineSwapVert } from "react-icons/md";
import { useSnapshot } from "valtio";
import { converterStore } from "../../constants/store";

const SwapButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const snapshot = useSnapshot(converterStore);
  const { fromToken, toToken, fromAmount, toAmount } = snapshot;

  function swapSelectedTokens() {
    const temp = fromAmount;
    converterStore.fromAmount = toAmount;
    converterStore.toAmount = temp;

    const temp2 = fromToken;
    converterStore.fromToken = toToken;
    converterStore.toToken = temp2;
  }

  return (
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
  );
};

export default SwapButton;
