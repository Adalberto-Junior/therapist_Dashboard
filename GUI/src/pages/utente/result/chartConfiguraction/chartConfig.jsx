// chartConfig.jsx
import { RadarChart, BarChart, StaticBarChart, LineChart } from "../../../../component/chart.jsx";

export const chartConfig = {
  radar: {
    // match: /^avg ([a-zA-Z]+)_/,
    match: /^(avg|max|min|std)[_\s\-]?([a-zA-Z0-9.\-]+)/i,
    labelPrefix: "Média",
    chartComponent: RadarChart,
  },



  line: {
    match: /^(.+)$/,
    labelPrefix: "",
    chartComponent: LineChart,
  },

};