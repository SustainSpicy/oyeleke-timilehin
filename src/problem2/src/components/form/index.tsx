import React, { ChangeEvent, useEffect, useState } from "react";
import { isValidMoney } from "../../constants/utils";
import { AiFillCloseCircle } from "react-icons/ai";

interface ConversionInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const ConvertionInput = ({ amount, onAmountChange }: ConversionInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(amount);
  }, [amount]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Validate the input using isValidMoney function
    if (isValidMoney(input) || input === "") {
      setInputValue(input);
      onAmountChange(input);
      setIsInvalidInput(false);
    } else {
      setIsInvalidInput(true);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-3xl  border-blue-2 bg-blue min-h-[80px]  ${
        isInvalidInput
          ? " border border-red-500  hover:border-red-500 active:animate-bounce"
          : "hover:border-[#0284c7] border "
      }`}
    >
      <input
        type="text"
        placeholder="0.00"
        className={`w-full  rounded-3xl outline-none p-3 text-md bg-blue text-gray`}
        value={inputValue}
        onChange={handleInputChange}
      />
      {isInvalidInput && (
        <span className="text-right pr-6 text-sm text-gray">Invalid Input</span>
      )}
    </div>
  );
};

export default ConvertionInput;
