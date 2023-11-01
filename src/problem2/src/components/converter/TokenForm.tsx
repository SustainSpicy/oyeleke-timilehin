import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiCaretDown } from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import MyModal from "../modal";
import ConvertionForm from "../form";
import ConvertionInput from "../form";

interface TokenFormProps {
  type: string;
  img: string;
  symbol: string;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: Dispatch<SetStateAction<any>>;
}

const TokenForm = ({
  type,
  img,
  symbol,
  onAmountChange,
  setIsOpen,
}: TokenFormProps) => {
  return (
    <>
      <div className="formWrapper flex flex-col gap-2">
        <div
          onClick={() =>
            setIsOpen((prev: any) => ({ modal: type, open: true }))
          }
          className="flex gap-2 cursor-pointer hover:opacity-70 transition duration-300 ease-in-out"
        >
          <div
            className="w-6 h-6 bg-gray rounded-full "
            onClick={() => setIsOpen(true)}
          >
            <img
              src={img}
              alt="token_logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center ">
            <span className="text-white text-sm font-bold">
              {symbol.toUpperCase()}
            </span>
            <BiCaretDown color="white" />
          </div>
        </div>
        <ConvertionInput onAmountChange={onAmountChange} />
      </div>
    </>
  );
};

export default TokenForm;
