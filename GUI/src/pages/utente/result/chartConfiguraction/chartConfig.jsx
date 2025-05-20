// chartConfig.jsx
import { RadarChart, BarChart, StaticBarChart, LineChart } from "../../../../component/chart.jsx";

export const chartConfig = {
  radar: {
    match: /^avg ([a-zA-Z]+)_/,
    labelPrefix: "Média",
    chartComponent: RadarChart,
  },
  // bar: {
  //   match: /^([a-zA-Z]+)_\d+$/, // Ex: BBEon_1
  //   labelPrefix: "",
  //   chartComponent: BarChart,
  // },
   line: {
    match: /^([a-zA-Z]+)_\d+$/,
    labelPrefix: "",
    chartComponent: LineChart,
  },
};