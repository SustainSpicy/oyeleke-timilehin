import React from "react";
import Chart from "./chart";
import { PriceData } from "../../constants/types";

const PriceChart = ({ chartData }: { chartData: PriceData[] }) => {
  return (
    <div className="graph flex-1 flex flex-col gap-4 text-white ">
      <div className="graph-header flex gap-2 items-center">
        <div className="w-8 h-8 bg-gray rounded-full"></div>
        <div className="w-8 h-8 bg-gray rounded-full"></div>
        <span className="font-bold">BTC /USD</span>
      </div>

      <span>Nov 03, 2023, 11:15 AM</span>

      <div className="graph-timeframe rounded-md font-bold">
        <span>24</span> <span>1W</span> <span>1M</span> <span>1Y</span>
      </div>
      <div className="chart h-200px flex-1">
        <Chart data={chartData} />
      </div>
    </div>
  );
};
export default PriceChart;
