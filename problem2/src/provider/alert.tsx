import React, { useState, createContext, useContext, ReactNode } from "react";
import "./alert.css";
import { motion } from "framer-motion";
interface AlertData {
  type: string;
  msg: string;
}

type AlertContextType = [(data: AlertData) => void, () => void];

const defaultAlertContext: AlertContextType = [
  () => {
    throw new Error("AlertContextProvider not found");
  },
  () => {
    throw new Error("AlertContextProvider not found");
  },
];

const AlertContext = createContext<AlertContextType>(defaultAlertContext);

interface AlertContextProviderProps {
  children: ReactNode;
}

const AlertContextProvider: React.FC<AlertContextProviderProps> = ({
  children,
}: AlertContextProviderProps) => {
  const [barOpen, setBarOpen] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>({
    type: "info",
    msg: "",
  });

  const openAlertBar = ({ type, msg }: AlertData) => {
    setBarOpen(true);
    setAlertData({ type, msg });

    setTimeout(() => {
      closeAlertBar();
    }, 6000);
  };

  const closeAlertBar = () => {
    setBarOpen(false);
    setAlertData({ type: "info", msg: "" });
  };

  return (
    <AlertContext.Provider value={[openAlertBar, closeAlertBar]}>
      {children}
      {barOpen && (
        <motion.div
          animate={{ y: -100, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
          className={`text-center min-w-[250px] text-white absolute border-none -bottom-20 left-[40%] p-4 bg-white border rounded-md z-50 ${alertData.type}`}
        >
          {alertData.msg}
        </motion.div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within an AlertContextProvider"
    );
  }
  return context;
};
