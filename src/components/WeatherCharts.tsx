import ReactEcharts from "echarts-for-react";
import { WeatherInfo } from "../App";
import { useMemo } from "react";
import { prepareChartsOptions } from "./helper";

type WeatherChartsProps = {
  data: Array<WeatherInfo>;
};
const WeatherCharts = ({ data }: WeatherChartsProps) => {
  const options = useMemo(() => prepareChartsOptions(data), [data]);

  return (
    <div className="chartContainer">
      <ReactEcharts
        option={options}
        className="chart"
        style={{ width: "500px", height: "300px" }}
      />
    </div>
  );
};

export default WeatherCharts;
