// chartConfig.jsx
import { RadarChart, BarChart, StaticBarChart, LineChart, AcousticSpaceD3, AcousticSpaceD3V2, Boxplot, PauseBoxplot } from "../../../../component/chart.jsx";

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

  acousticSpace: {
    match: /^(avg) (F1|F2)$/,
    labelPrefix: "Média",
    chartComponent: AcousticSpaceD3,
  },

  acousticSpaceGrouped: {
    match: /^(avg) (F1|F2)$/,
    labelPrefix: "Média",
    chartComponent: AcousticSpaceD3V2,
  },

  acousticSpaceCompared: {
    match: /^(avg) (F1|F2)$/,
    labelPrefix: "Média",
    chartComponent: AcousticSpaceD3,
  },

  Boxplot: {
    match: /^F0$/,
    labelPrefix: "",
    chartComponent: Boxplot,
  },

  PauseDurationBoxplot: {
    match: /^pauseDurations$/,
    labelPrefix: "",
    chartComponent: PauseBoxplot,
  }

};