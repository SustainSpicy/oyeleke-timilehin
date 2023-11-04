import { useEffect, useState } from "react";
import PriceChart from "./components/chart";
import Converter from "./components/converter";
import Navbar from "./components/navbar";
import HoneycombLoader from "./components/loaders/honeycomb_loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Navbar />
      <div className="main wrapper p-custom justify-self-center flex flex-wrap sm:justify-center w-full pt-12 gap-2 ">
        {isLoading ? (
          <HoneycombLoader />
        ) : (
          <>
            <PriceChart />
            <Converter />
          </>
        )}
      </div>
    </>
  );
}

export default App;
