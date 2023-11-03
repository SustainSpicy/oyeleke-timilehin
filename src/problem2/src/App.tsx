import PriceChart from "./components/chart";
import Converter from "./components/converter";
import Navbar from "./components/navbar";
import { chartData } from "./constants/data";

function App() {
  return (
    <>
      <Navbar />
      <div className="main wrapper p-custom justify-self-center flex flex-wrap sm:justify-center w-full pt-12 gap-2 ">
        <PriceChart chartData={chartData} />
        <Converter />
      </div>
    </>
  );
}

export default App;
