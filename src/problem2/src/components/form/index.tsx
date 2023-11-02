import React, { ChangeEvent, useEffect, useState } from "react";
import { isValidMoney } from "../../constants/utils";

interface ConversionInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const ConvertionInput = ({ amount, onAmountChange }: ConversionInputProps) => {
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    setInputValue(amount);
  }, [amount]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Validate the input using isValidMoney function
    if (isValidMoney(input) || input === "") {
      setInputValue(input);
      onAmountChange(input);
    }
  };

  return (
    <input
      type="text"
      placeholder="0.00"
      className="w-full rounded-2xl outline-none p-3 text-md bg-blue text-gray"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default ConvertionInput;
