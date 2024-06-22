import { useEffect, useState } from "react"
import Chart from "./chart"
import { PriceData } from "../../constants/types"
import { useSnapshot } from "valtio"
import { converterStore } from "../../constants/store"
import { getChartData } from "../../constants/utils"
import { motion } from "framer-motion"
import ChartSkeleton from "./chart_skeleton"

const timeFrameData = ["24H", "1W", "1M", "1Y"]
const PriceChart = () => {
  const snapshot = useSnapshot(converterStore)
  const { fromToken, toToken, currencyImages } = snapshot
  const [chart, setChart] = useState<PriceData[]>([])

  useEffect(() => {
    if (fromToken && toToken) {
      const updatedChart = getChartData(fromToken, toToken)
      setChart(updatedChart)
    }
  }, [fromToken, toToken])

  return (
    <motion.div
      initial={{ x: -800, opacity: 0, rotate: 90 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8 }}
      className='graph flex-1 flex flex-col gap-4 text-white '
    >
      {fromToken && toToken ? (
        <>
          <div className='graph-header flex gap-2 items-center'>
            <div className='w-8 h-8 bg-gray rounded-full'>
              <img
                src={currencyImages[fromToken.currency]}
                alt='token-logo'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-8 h-8 bg-gray rounded-full'>
              <img
                src={currencyImages[toToken.currency]}
                alt='token-logo'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='font-bold'>
              {fromToken?.currency} / {toToken?.currency}
            </span>
          </div>

          <div className='flex flex-wrap items-center justify-between gap-2'>
            <span>Nov 03, 2023, 11:15 AM</span>
            <div className='graph-timeframe  w-fit px-4 py-2 flex gap-4 font-bold rounded-3xl  border-blue-2 bg-blue'>
              {timeFrameData.map((item, index) => (
                <span
                  key={index}
                  className='cursor-pointer hover:bg-[#0284c7] rounded-3xl p-1'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className='chart h-200px flex-1'>
            <Chart data={chart} />
          </div>
        </>
      ) : (
        <ChartSkeleton />
      )}
    </motion.div>
  )
}
export default PriceChart
