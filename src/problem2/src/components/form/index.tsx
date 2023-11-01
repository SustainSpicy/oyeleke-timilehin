import React, { ChangeEvent, useState } from "react";
import { isValidMoney } from "../../constants/utils";
import { ConversionInputProps } from "../../constants/types";

const ConvertionInput = ({ onAmountChange }: ConversionInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Validate the input using isValidMoney function
    if (isValidMoney(input) || input === "") {
      setInputValue(input);
      onAmountChange(event);
    }
  };

  return (
    <div className=" rounded-3xl pb-4 border-blue-2 bg-blue hover:border-white">
      <input
        type="text"
        dir="rtl"
        className="w-full rounded-2xl outline-none p-2 text-md bg-blue text-gray"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ConvertionInput;
