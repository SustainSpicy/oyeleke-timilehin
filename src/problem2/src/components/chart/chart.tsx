import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { PriceData } from "../../constants/types";

const Chart = ({ data }: { data: PriceData[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data} margin={{}}>
        <XAxis dataKey="time" />

        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
