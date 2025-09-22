import React, { useMemo }  from "react";
import Accordion from "react-bootstrap/Accordion";
import { translateKey } from "./translateKey.jsx";
import { chartConfig } from "./chartConfig.jsx";
import {HistogramChart, F0Chart} from "../../../../component/chart.jsx";
import PropTypes from "prop-types";


export function ChartAccordion({ groupedData }) {
    // console.log("Grouped Data:", groupedData);
  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p className="text-center mt-2">Nenhum dado disponível</p>;
  }

  return (
    <Accordion alwaysOpen>
      <Accordion.Item eventKey="main">
        <Accordion.Header>Gráficos</Accordion.Header>
        <Accordion.Body>

          {Object.entries(groupedData).map(([chartType, group], chartIndex) => {
            const isRadar = chartType === "radar";
            const title = isRadar ? "Valores Estáticos" : "Valores Não Estáticos";

            return (
              <Accordion.Item eventKey={chartIndex.toString()} key={chartType}>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                  <Accordion alwaysOpen>
                    {Object.entries(group).map(([groupName, data], idx) => {
                      if (!data || data.length <= 1) return null; // Ignora dados com 1 valor
                      const { labelPrefix, chartComponent: ChartComp } = chartConfig[chartType];
                      return (
                        <Accordion.Item eventKey={idx.toString()} key={groupName}>
                          <Accordion.Header>
                            {labelPrefix} {translateKey(groupName)}
                          </Accordion.Header>
                          <Accordion.Body>
                            <ChartComp data={data} />
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

//Dois em dois: Agrupa os dados de radar e linha em um único componente
// export function DisplayChart({ groupedData, filterRadarOnly = false, labels = [], excludeRadarLabels = [], variant = "grid" }) {
//   return (
//     <div className="grid gap-6">
//       {Object.entries(groupedData).map(([chartType, data], idx) => {
//         if (!data || Object.keys(data).length === 0) return null;

//         const isRadar = chartType === "radar";

//         if (isRadar) {
//           const {labelPrefix, chartComponent: ChartComp } = chartConfig.radar;
//           console.log("data: ",data)
//           return (
//             <div key={`${chartType}-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.entries(data).map(([dataKey, chartData], i) => (
//                 <div key={`${chartType}-${dataKey}-${i}`} className="bg-white rounded-2xl p-4 shadow w-full h-full min-w-0"
//                 >
//                   <h5 className="text-center mb-2">{labelPrefix} {translateKey(dataKey)}</h5>
//                   <ChartComp data={chartData} />
//                 </div>
//               ))}
//             </div>
//           );
//         }

//         if (chartType === "line") {
//           const { labelPrefix, chartComponent: ChartComponent } = chartConfig.line;
          
//           return (
//             <div key={`${chartType}-${idx}`} className="grid gap-4">
//               {Object.entries(data).map(([dataKey, chartData], i) => (
                
//                 <div key={`${chartType}-${dataKey}-${i}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
//                   <h5 className="text-center mb-2">{labelPrefix} {translateKey(dataKey)}</h5>
//                   <ChartComponent data={chartData} />
//                 </div>
//               ))}
//             </div>
//           );
//         }

//         if (chartType === "acousticSpace"){
//           const { labelPrefix, chartComponent: ChartComponent } = chartConfig.acousticSpace;
//           console.log("chartData: ",data)
//           return(
//             <div key={`${chartType}-${idx}`} className="grid gap-4">
//                 <ChartComponent data={data} />
//             </div>

//           );
//         }

//         if (chartType === "acousticSpaceGrouped"){
//           const { labelPrefix, chartComponent: ChartComponent } = chartConfig.acousticSpaceGrouped;
//           console.log("chartData: ",data)
//           return(
//             <div key={`${chartType}-${idx}`} className="grid gap-4">
//                 <ChartComponent data={data} />
//             </div>

//           );
//         }



       

//         return null;
//       })}
//     </div>
//   );
// }



// DisplayChart.jsx
// export function DisplayChart({
//   groupedData,
//   filterRadarOnly = false,
//   labels = [],
//   excludeRadarLabels = [],
//   variant = "grid",
// }) {
//   if (!groupedData) return null;

//   return (
//     <div className="grid gap-6">
//       {Object.entries(groupedData).map(([chartType, data], idx) => {
//         if (!data || Object.keys(data).length === 0) return null;
//         console.log("DataAntes: ",data)

//         switch (chartType) {
//           case "radar":
//             return renderRadarCharts(data, idx);
//           case "line":
//             return renderLineCharts(data, idx);
//           case "acousticSpace":
//             return renderAcousticChart(data, idx);
//           case "acousticSpaceGrouped":
//             return renderGroupedAcousticChart(data, idx, true);
//           case "acousticSpaceCompared":
//             return renderGroupedAcousticChart(data, idx);
//           case "Boxplot":
//             return renderBoxChart(data, idx,"Boxplot",false);
//           case "PauseDurationBoxplot":
//             return renderBoxChart(data, idx,"PauseDurationBoxplot",false);
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// }

export function DisplayChart({
  groupedData,
  comparedValue = false,
  labels = [],
  excludeRadarLabels = [],
  variant = "grid",
}) {
  if (!groupedData) return null;

  

  return (
    <div className="grid gap-6">
      {Object.entries(groupedData).map(([chartType, chartPayload], idx) => {
        if (!chartPayload || Object.keys(chartPayload).length === 0) return null;
        switch (chartType) {
          case "radar":
            return renderRadarCharts(chartPayload, idx);
          case "line":
            return renderLineCharts(chartPayload, idx);
          case "acousticSpace":
            return renderAcousticChart(chartPayload, idx);
          case "acousticSpaceGrouped":
            return renderGroupedAcousticChart(chartPayload, idx, true);
          case "acousticSpaceCompared":
            return renderGroupedAcousticChart(chartPayload, idx);
          case "F0Boxplot":
            return renderF0BoxChart(chartPayload, idx,"Boxplot",false);
          case "Boxplot": {
            const { data, valueKey } = chartPayload;
            // console.log("Data:",data)
            // console.log("valueskeeee: ",valueKey)
            return renderBoxChart(data, idx, valueKey, false);
          }
          case "Intensityplot":
            return IntensityChartWrapper( chartPayload,idx);
          default:
            return null;
        }
      })}
    </div>
  );
}


function renderRadarCharts(data, idx) {
  const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

  return (
    <div
      key={`radar-${idx}`}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {Object.entries(data).map(([dataKey, chartData], i) => (
        <div
          key={`radar-${dataKey}-${i}`}
          className="bg-white rounded-2xl p-4 shadow w-full h-full min-w-0"
        >
          <h5 className="text-center mb-2">
            {labelPrefix} {translateKey(dataKey)}
          </h5>
          <ChartComp data={chartData} />
        </div>
      ))}
    </div>
  );
}

function renderLineCharts(data, idx) {
  const { labelPrefix, chartComponent: ChartComponent } = chartConfig.line;

  return (
    <div key={`line-${idx}`} className="grid gap-4">
      {Object.entries(data).map(([dataKey, chartData], i) => (
        <div
          key={`line-${dataKey}-${i}`}
          className="bg-white dark:bg-zinc-800 p-4 rounded shadow"
        >
          <h5 className="text-center mb-2">
            {labelPrefix} {translateKey(dataKey)}
          </h5>
          <ChartComponent data={chartData} />
        </div>
      ))}
    </div>
  );
}

function renderAcousticChart(data, idx) {
  const { chartComponent: ChartComponent } = chartConfig.acousticSpace;

  return (
    <div key={`acousticSpace-${idx}`} className="grid gap-4 items-center justify-center ">
      <ChartComponent data={data} />
    </div>
  );
}

function renderGroupedAcousticChart(data, idx, oneChart = false) {
  if (oneChart) {
    const { chartComponent: ChartComponent } = chartConfig.acousticSpaceGrouped;
    return (
      <div key={`acousticSpaceGrouped-${idx}`} className="grid gap-4">
        <ChartComponent data={data} />
      </div>
    );
  } else {
    const { chartComponent: ChartComponent } = chartConfig.acousticSpaceCompared;
    const entries = Object.entries(data);
    console.log("data: ", data)
    console.log("Entries: ", entries)

    // Group entries into pairs
    const pairedEntries = [];
    for (let i = 0; i < entries.length; i += 2) {
      pairedEntries.push(entries.slice(i, i + 2));
    }
    console.log("paired: ",pairedEntries)

    return (
      <div key={`acousticSpaceGrouped-${idx}`} className="grid gap-6">
        {pairedEntries.map((pair, pairIdx) => (
          <div key={`chart-pair-${pairIdx}`} className="grid grid-cols-2 gap-4">
            {pair.map(([date, dateData]) => (
              <div key={`chart-${date}`} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{date.replace(/_/g, " ")}</h3>
                <ChartComponent data={dateData} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}


function renderF0BoxChart(data, idx, oneChart = false) {
  const { chartComponent: ChartComponent } = chartConfig.F0Boxplot;

  
  if (oneChart) {
    return (
      <div key={`BoxPlot-${idx}`} className="grid gap-4">
        <ChartComponent data={data} />
      </div>
    );
  } else {
    // data is an array of { id, F0 }
    const entries = data.map(d => [d.id, d.F0]);

    // Group into pairs
    const pairedEntries = [];
    for (let i = 0; i < entries.length; i += 2) {
      pairedEntries.push(entries.slice(i, i + 2));
    }

    return (
      <div key={`BoxPlot-${idx}`} className="grid gap-6">
        {pairedEntries.map((pair, pairIdx) => (
          <div
            key={`chart-pair-${pairIdx}`}
            className={`grid grid-cols-${pair.length} gap-4`}
          >
            {pair.map(([label, f0Values]) => (
              <div key={`chart-${label}`} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{label.replace(/_/g, " ")}</h3>
                <ChartComponent data={f0Values} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

// function renderBoxChart(data, idx, valueKey = "F0", oneChart = false) {
//   const { chartComponent: ChartComponent } = chartConfig.Boxplot;

  

//   if (oneChart) {
//     const transformedData = data.reduce((acc, item) => {
//       acc[item.id] = Array.isArray(item[valueKey]) ? item[valueKey] : [item[valueKey]];
//       return acc;
//     }, {});
//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-4">
//         <ChartComponent data={transformedData} />
//       </div>
//     );
//   } else {
//     const entries = data.map(d => [d.id, Array.isArray(d[valueKey]) ? d[valueKey] : [d[valueKey]]]);
//     // const entries = data.map(d => [d.id, d[valueKey]]);
//     const pairedEntries = [];
//     for (let i = 0; i < entries.length; i += 2) {
//       pairedEntries.push(entries.slice(i, i + 2));
//     }
//     console.log("ValueKey: ",pairedEntries)
//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-6">
//         {pairedEntries.map((pair, pairIdx) => (
//           <div
//             key={`chart-pair-${pairIdx}`}
//             className={`grid grid-cols-${pair.length} gap-4`}
//           >
//             {pair.map(([label, values]) => (
//               <div key={`chart-${label}`} className="border p-4 rounded shadow">
//                 <h3 className="text-lg font-semibold mb-2">{label}</h3>
//                 <ChartComponent data={{ [label]: values }} />
//               </div>
              
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }


function renderBoxChart(data, idx, valueKey = "F0", oneChart = false) {
  const { chartComponent: ChartComponent } = chartConfig.Boxplot;

  const normalizeData = (arr) =>
    arr.reduce((acc, item) => {
      acc[item.id] = Array.isArray(item[valueKey])
        ? item[valueKey]
        : [item[valueKey]];
      return acc;
    }, {});

  if (oneChart) {
    const transformedData = normalizeData(data);
    return (
      <div key={`BoxPlot-${idx}`} className="grid gap-6">
        <ChartComponent  parameterName={valueKey} data={transformedData} />
        {/* Histograma único combinando todos os valores */}
         {/* Só mostra histograma se for jitter ou shimmer */}
        {(valueKey === "Jitter" || valueKey === "Shimmer") && (
          <HistogramChart values={Object.values(transformedData).flat()} label={valueKey} />
        )}
        {/* <HistogramChart
          values={Object.values(transformedData).flat()}
          label={valueKey}
        /> */}
      </div>
    );
  } else {
    // Agrupa de 2 em 2
    const paired = [];
    for (let i = 0; i < data.length; i += 2) {
      paired.push(data.slice(i, i + 2));
    }

    return (
      <div key={`BoxPlot-${idx}`} className="grid gap-8">
        {paired.map((subset, pairIdx) => {
          const transformed = normalizeData(subset);
          return (
            <div
              key={`chart-pair-${pairIdx}`}
              className={`grid grid-cols-${Object.keys(transformed).length} gap-6`}
            >
              {Object.entries(transformed).map(([label, values]) => (
                <div
                  key={`chart-${label}-${pairIdx}`}
                  className="border p-4 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-4">{label.replace(/_/g, " ")}</h3>
                  {/* Boxplot */}
                  <ChartComponent  parameterName={valueKey} data={{ [label]: values }} />
                  {/* Histograma para este conjunto */}
                  <div className="mt-4">
                    {/* <h4 className="text-md font-semibold mb-2">Histograma de {label}</h4> */}
                    {/* <HistogramChart values={values} label={valueKey} /> */}
                    {/* Histograma individual, só se for jitter/shimmer */}
                    {(valueKey === "Jitter" || valueKey === "Shimmer") && (
                      <div className="mt-4">
                        <HistogramChart values={values} label={valueKey} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

// function renderBoxChart(data, idx, valueKey = "F0", oneChart = false) {
//   const { chartComponent: ChartComponent } = chartConfig.Boxplot;
//   console.log("renderBoxChart - data:", data);

//   const normalizeData = (arr) =>
//     arr.reduce((acc, item) => {
//       acc[item.id] = Array.isArray(item[valueKey])
//         ? item[valueKey]
//         : [item[valueKey]];
//       return acc;
//     }, {});

//   if (oneChart) {
//     const transformedData = normalizeData(data);
//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-4">
//         <ChartComponent data={transformedData} />
//       </div>
//     );
//   } else {
//     // group into pairs but normalize each subgroup
//     const paired = [];
//     for (let i = 0; i < data.length; i += 2) {
//       paired.push(data.slice(i, i + 2));
//     }

//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-6">
//         {paired.map((subset, pairIdx) => {
//           const transformed = normalizeData(subset);
//           return (
//             <div
//               key={`chart-pair-${pairIdx}`}
//               className={`grid grid-cols-${Object.keys(transformed).length} gap-4`}
//             >
//               {Object.entries(transformed).map(([label, values]) => (
//                 <div
//                   key={`chart-${label}-${pairIdx}`}
//                   className="border p-4 rounded shadow"
//                 >
//                   <h3 className="text-lg font-semibold mb-2">{label}</h3>
//                   <ChartComponent data={{ [label]: values }} />
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }


function IntensityChartWrapper(data, idx) {
  const { chartComponent: ChartComponent } = chartConfig.Intensityplot;
  console.log("IntensityChartWrapper: ", data);
  if (!data || data.length === 0) {
    return (
      <div key={`IntensityChartWrapper-${idx}`} className="grid gap-6">
        <h2>Nenhum dado encontrado</h2>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data.map((d, idx) => (
        <div key={`Intensityplot-${d.id || idx}`} className="grid gap-4">
          <h3 className="text-lg font-semibold">Gráfico de Intensidade – {d.id.replace(/_/g, " ")}</h3>
          <ChartComponent data={d.Intensidade} width={800} height={300} />
        </div>
      ))}
    </div>
  );
}



export function RenderF0LineChart({data, idx, oneChart = false}) {
  if (!data || data.length === 0)  return <div>Nenhum dado para exibir</div>;
  // console.log("RenderF0LineChart - data:", data);

  if (oneChart) {
    // Mostra todos os F0 num único gráfico (pode ser útil para comparação)
    const combined = data.flatMap((d) =>
      d.F0.map((val, i) => ({ id: d.id, timeIndex: i, f0: val }))
    );

    return (
      <div key={`F0Chart-${idx}`} className="grid gap-4">
        <F0Chart
          f0={combined.map((d) => d.f0)}
          timeStepMs={5} // altera se o teu frame period não for 5 ms
        />
      </div>
    );
  } else {

    // Divide os dados em pares para mostrar lado a lado
    const pairedEntries = [];
    for (let i = 0; i <  data.F0Boxplot.length; i += 2) {
      pairedEntries.push(data.F0Boxplot.slice(i, i + 2));
    }

    console.log("pairedEntries: ", pairedEntries);

    return (
      <div key={`F0Chart-${idx}`} className="grid gap-6">
        {pairedEntries.map((pair, pairIdx) => (
          <div
            key={`chart-pair-${pairIdx}`}
            className={`grid grid-cols-${pair.length} gap-4`}
          >
            {pair.map((d) => (
              <div key={`chart-${d.id}`} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{d.id.replace(/_/g, " ")}</h3>
                <F0Chart
                  f0={d.F0}
                  timeStepMs={5} // altera se necessário
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}





// import { chartConfig } from "@/config/chartConfig"; // garante que está centralizado
// import { HistogramChart, F0Chart } from "@/components/charts";

// export function DisplayChart({ groupedData }) {
//   if (!groupedData) return null;

//   return (
//     <div className="grid gap-8">
//       {Object.entries(groupedData).map(([chartType, chartPayload], idx) => {
//         if (!chartPayload || Object.keys(chartPayload).length === 0) return null;

//         const renderers = {
//           radar: () => <RadarCharts key={idx} data={chartPayload} />,
//           line: () => <LineCharts key={idx} data={chartPayload} />,
//           acousticSpace: () => <AcousticChart key={idx} data={chartPayload} />,
//           acousticSpaceGrouped: () => (
//             <GroupedAcousticChart key={idx} data={chartPayload} oneChart />
//           ),
//           acousticSpaceCompared: () => (
//             <GroupedAcousticChart key={idx} data={chartPayload} />
//           ),
//           F0Boxplot: () => <F0BoxChart key={idx} data={chartPayload} />,
//           Boxplot: () => (
//             <BoxChart key={idx} data={chartPayload.data} valueKey={chartPayload.valueKey} />
//           ),
//           Intensityplot: () => (
//             <IntensityChartWrapper key={idx} data={chartPayload} />
//           ),
//         };

//         return renderers[chartType]?.() ?? null;
//       })}
//     </div>
//   );
// }

// /* ---------- RADAR CHART ---------- */
// function RadarCharts({ data }) {
//   const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {Object.entries(data).map(([key, chartData]) => (
//         <ChartCard key={key} title={`${labelPrefix} ${translateKey(key)}`}>
//           <ChartComp data={chartData} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /* ---------- LINE CHART ---------- */
// function LineCharts({ data }) {
//   const { labelPrefix, chartComponent: ChartComp } = chartConfig.line;

//   return (
//     <div className="grid gap-6">
//       {Object.entries(data).map(([key, chartData]) => (
//         <ChartCard key={key} title={`${labelPrefix} ${translateKey(key)}`}>
//           <ChartComp data={chartData} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /* ---------- ACOUSTIC SPACE ---------- */
// function AcousticChart({ data }) {
//   const { chartComponent: ChartComp } = chartConfig.acousticSpace;
//   return (
//     <div className="grid place-items-center">
//       <ChartComp data={data} />
//     </div>
//   );
// }

// /* ---------- GROUPED ACOUSTIC SPACE ---------- */
// function GroupedAcousticChart({ data, oneChart = false }) {
//   const { chartComponent: ChartComp } = oneChart
//     ? chartConfig.acousticSpaceGrouped
//     : chartConfig.acousticSpaceCompared;

//   const pairedEntries = useMemo(() => {
//     const entries = Object.entries(data);
//     return oneChart ? [entries] : Array.from({ length: Math.ceil(entries.length / 2) }, (_, i) =>
//       entries.slice(i * 2, i * 2 + 2)
//     );
//   }, [data, oneChart]);

//   return (
//     <div className="grid gap-8">
//       {pairedEntries.map((pair, idx) => (
//         <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {pair.map(([date, chartData]) => (
//             <ChartCard key={date} title={date}>
//               <ChartComp data={chartData} />
//             </ChartCard>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ---------- F0 BOX CHART ---------- */
// // function F0BoxChart({ data, oneChart = false }) {
// //   const { chartComponent: ChartComp } = chartConfig.F0Boxplot;

// //   if (!data || data.length === 0) return null;

// //   const paired = useMemo(() => {
// //     return Array.from({ length: Math.ceil(data.length / 2) }, (_, i) =>
// //       data.slice(i * 2, i * 2 + 2)
// //     );
// //   }, [data]);

// //   return (
// //     <div className="grid gap-8">
// //       {paired.map((subset, idx) => (
// //         <div key={idx} className={`grid grid-cols-1 md:grid-cols-${subset.length} gap-6`}>
// //           {subset.map((item) => (
// //             <ChartCard key={item.id} title={item.id}>
// //               <ChartComp data={item.F0} />
// //             </ChartCard>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// function F0BoxChart({ data, oneChart = false }) {
//   const { chartComponent: ChartComp } = chartConfig.F0Boxplot;

//   const paired = useMemo(() => {
//     if (!data || data.length === 0) return [];
//     return Array.from({ length: Math.ceil(data.length / 2) }, (_, i) =>
//       data.slice(i * 2, i * 2 + 2)
//     );
//   }, [data]);

//   if (!data || data.length === 0) {
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-400">
//         Nenhum dado F0 disponível
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-8">
//       {paired.map((subset, idx) => (
//         <div key={idx} className={`grid grid-cols-1 md:grid-cols-${subset.length} gap-6`}>
//           {subset.map((item) => (
//             <ChartCard key={item.id} title={item.id}>
//               <ChartComp data={item.F0} />
//             </ChartCard>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }



// /* ---------- BOX CHART ---------- */
// function BoxChart({ data, valueKey }) {
//   const { chartComponent: ChartComp } = chartConfig.Boxplot;

//   const normalizeData = (arr) =>
//     arr.reduce((acc, item) => {
//       acc[item.id] = Array.isArray(item[valueKey])
//         ? item[valueKey]
//         : [item[valueKey]];
//       return acc;
//     }, {});

//   const paired = useMemo(() => {
//     return Array.from({ length: Math.ceil(data.length / 2) }, (_, i) =>
//       data.slice(i * 2, i * 2 + 2)
//     );
//   }, [data]);

//   return (
//     <div className="grid gap-8">
//       {paired.map((subset, idx) => {
//         const transformed = normalizeData(subset);
//         return (
//           <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {Object.entries(transformed).map(([label, values]) => (
//               <ChartCard key={label} title={label}>
//                 <ChartComp parameterName={valueKey} data={{ [label]: values }} />
//                 {(valueKey === "Jitter" || valueKey === "Shimmer") && (
//                   <div className="mt-4">
//                     <HistogramChart values={values} label={valueKey} />
//                   </div>
//                 )}
//               </ChartCard>
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ---------- INTENSITY CHART ---------- */
// function IntensityChartWrapper({ data }) {
//   const { chartComponent: ChartComp } = chartConfig.Intensityplot;

//   if (!data || data.length === 0) {
//     return <p className="text-center text-gray-500">Nenhum dado encontrado</p>;
//   }

//   return (
//     <div className="grid gap-6">
//       {data.map((d) => (
//         <ChartCard key={d.id} title={`Gráfico de Intensidade – ${d.id}`}>
//           <ChartComp data={d.Intensidade} width={800} height={300} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /* ---------- REUSABLE CARD ---------- */
// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-md">
//       <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
//       {children}
//     </div>
//   );
// }

// ChartCard.propTypes = {
//   title: PropTypes.string,
//   children: PropTypes.node,
// };



// import { useMemo } from "react";
// import chartConfig from "./chartConfig";
// import HistogramChart from "./HistogramChart"; // assumindo que exista
// import F0Chart from "./F0Chart"; // assumindo que exista

// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white dark:bg-zinc-800 border rounded-xl shadow-md p-4">
//       {title && <h3 className="text-lg font-semibold mb-4 text-center dark:text-white">{title}</h3>}
//       {children}
//     </div>
//   );
// }

// export function DisplayChart({ groupedData, variant = "grid" }) {
//   const entries = useMemo(() => (groupedData ? Object.entries(groupedData) : []), [groupedData]);

//   return (
//     <div className="grid gap-6">
//       {entries.map(([chartType, chartPayload], idx) => {
//         if (!chartPayload || Object.keys(chartPayload).length === 0) return null;

//         switch (chartType) {
//           case "radar":
//             return <RadarCharts key={idx} data={chartPayload} />;
//           case "line":
//             return <LineCharts key={idx} data={chartPayload} />;
//           case "acousticSpace":
//             return <AcousticChart key={idx} data={chartPayload} />;
//           case "acousticSpaceGrouped":
//             return <GroupedAcousticChart key={idx} data={chartPayload} oneChart />;
//           case "acousticSpaceCompared":
//             return <GroupedAcousticChart key={idx} data={chartPayload} />;
//           case "F0Boxplot":
//             return <F0BoxChart key={idx} data={chartPayload} />;
//           case "Boxplot":
//             return <BoxChart key={idx} data={chartPayload.data} valueKey={chartPayload.valueKey} />;
//           case "Intensityplot":
//             return <IntensityChartWrapper key={idx} data={chartPayload} />;
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// }

// /** ------------------ RADAR ------------------ */
// function RadarCharts({ data }) {
//   const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;
//   const entries = useMemo(() => Object.entries(data), [data]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {entries.map(([key, chartData], i) => (
//         <ChartCard key={i} title={`${labelPrefix} ${key}`}>
//           <ChartComp data={chartData} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /** ------------------ LINE ------------------ */
// function LineCharts({ data }) {
//   const { labelPrefix, chartComponent: ChartComp } = chartConfig.line;
//   const entries = useMemo(() => Object.entries(data), [data]);

//   return (
//     <div className="grid gap-4">
//       {entries.map(([key, chartData], i) => (
//         <ChartCard key={i} title={`${labelPrefix} ${key}`}>
//           <ChartComp data={chartData} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /** ------------------ ACOUSTIC ------------------ */
// function AcousticChart({ data }) {
//   const { chartComponent: ChartComp } = chartConfig.acousticSpace;
//   return (
//     <div className="grid gap-4 justify-center items-center">
//       <ChartComp data={data} />
//     </div>
//   );
// }
// /** ------------------ GROUPED ACOUSTIC ------------------ */
//  function GroupedAcousticChart(data, idx, oneChart = false) {
//   if (oneChart) {
//     const { chartComponent: ChartComponent } = chartConfig.acousticSpaceGrouped;
//     return (
//       <div key={`acousticSpaceGrouped-${idx}`} className="grid gap-4">
//         <ChartComponent data={data} />
//       </div>
//     );
//   } else {
//     const { chartComponent: ChartComponent } = chartConfig.acousticSpaceCompared;
//     const entries = Object.entries(data);
//     console.log("data: ", data)
//     console.log("Entries: ", entries)

//     // Group entries into pairs
//     const pairedEntries = [];
//     for (let i = 0; i < entries.length; i += 2) {
//       pairedEntries.push(entries.slice(i, i + 2));
//     }
//     console.log("paired: ",pairedEntries)

//     return (
//       <div key={`acousticSpaceGrouped-${idx}`} className="grid gap-6">
//         {pairedEntries.map((pair, pairIdx) => (
//           <div key={`chart-pair-${pairIdx}`} className="grid grid-cols-2 gap-4">
//             {pair.map(([date, dateData]) => (
//               <div key={`chart-${date}`} className="border p-4 rounded shadow">
//                 <h3 className="text-lg font-semibold mb-2">{date}</h3>
//                 <ChartComponent data={dateData} />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// // function GroupedAcousticChart({ data, oneChart = false }) {
// //   const ChartComp = oneChart
// //     ? chartConfig.acousticSpaceGrouped.chartComponent
// //     : chartConfig.acousticSpaceCompared.chartComponent;

    


// //   const pairs = useMemo(() => {
// //     const entries = Object.entries(data);
// //     if (oneChart) return data ? [entries] : [];
// //     const result = [];
// //     for (let i = 0; i < entries.length; i += 2) result.push(entries.slice(i, i + 2));
// //     return result;
// //   }, [data, oneChart]);
  


// //   return (
// //     <div className="grid gap-6">
// //       {pairs.map((pair, idx) => (
// //         <div key={idx} className={`grid grid-cols-${pair.length} gap-4`}>
// //           {pair.map(([label, chartData]) => (
// //             <ChartCard key={label} title={label}>
// //               <ChartComp data={chartData} />
// //             </ChartCard>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// /** ------------------ F0 BOX ------------------ */
// export function F0BoxChart({ data, oneChart = false }) {
//   const ChartComp = chartConfig.F0Boxplot.chartComponent;
//   const normalizedData = useMemo(
//     () =>
//       data?.reduce((acc, item) => {
//         acc[item.id] = Array.isArray(item.F0) ? item.F0 : [item.F0];
//         return acc;
//       }, {}) || {},
//     [data]
//   );

//   if (!data || data.length === 0) {
//     return <div className="text-center text-gray-500 dark:text-gray-400">Nenhum dado F0 disponível</div>;
//   }

//   const pairs = useMemo(() => {
//     const items = Object.entries(normalizedData);
//     const res = [];
//     for (let i = 0; i < items.length; i += 2) res.push(items.slice(i, i + 2));
//     return res;
//   }, [normalizedData]);

//   return (
//     <div className="grid gap-8">
//       {pairs.map((subset, idx) => (
//         <div key={idx} className={`grid grid-cols-${subset.length} gap-6`}>
//           {subset.map(([label, f0Values]) => (
//             <ChartCard key={label} title={label}>
//               <ChartComp data={f0Values} />
//             </ChartCard>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// /** ------------------ BOX ------------------ */
// export function BoxChart({ data, valueKey = "F0", oneChart = false }) {
//   const ChartComp = chartConfig.Boxplot.chartComponent;

//   const normalizedData = useMemo(
//     () =>
//       data?.reduce((acc, item) => {
//         acc[item.id] = Array.isArray(item[valueKey]) ? item[valueKey] : [item[valueKey]];
//         return acc;
//       }, {}) || {},
//     [data, valueKey]
//   );

//   if (!data || data.length === 0) {
//     return <div className="text-center text-gray-500 dark:text-gray-400">Nenhum dado disponível</div>;
//   }

//   const pairs = useMemo(() => {
//     const items = Object.entries(normalizedData);
//     const res = [];
//     for (let i = 0; i < items.length; i += 2) res.push(items.slice(i, i + 2));
//     return res;
//   }, [normalizedData]);

//   return (
//     <div className="grid gap-8">
//       {pairs.map((subset, idx) => (
//         <div key={idx} className={`grid grid-cols-${subset.length} gap-6`}>
//           {subset.map(([label, values]) => (
//             <ChartCard key={label} title={label}>
//               <ChartComp parameterName={valueKey} data={{ [label]: values }} />
//               {(valueKey === "Jitter" || valueKey === "Shimmer") && (
//                 <div className="mt-4">
//                   <HistogramChart values={values} label={valueKey} />
//                 </div>
//               )}
//             </ChartCard>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// /** ------------------ INTENSITY ------------------ */
// export function IntensityChartWrapper({ data }) {
//   const ChartComp = chartConfig.Intensityplot.chartComponent;
//   const items = useMemo(() => (data ? data : []), [data]);

//   if (!items.length) {
//     return <div className="text-center text-gray-500 dark:text-gray-400">Nenhum dado de intensidade disponível</div>;
//   }

//   return (
//     <div className="grid gap-6">
//       {items.map((d, idx) => (
//         <ChartCard key={d.id || idx} title={`Gráfico de Intensidade – ${d.id}`}>
//           <ChartComp data={d.Intensidade} width={800} height={300} />
//         </ChartCard>
//       ))}
//     </div>
//   );
// }

// /** ------------------ F0 LINE ------------------ */
// export function RenderF0LineChart({ data, oneChart = false }) {
//   if (!data || data.length === 0) {
//     return <div className="text-center text-gray-500 dark:text-gray-400">Nenhum F0 disponível</div>;
//   }

//   const combined = useMemo(() => {
//     if (!oneChart) return [];
//     return data.flatMap((d) => d.F0.map((val, i) => ({ id: d.id, timeIndex: i, f0: val })));
//   }, [data, oneChart]);

//   if (oneChart) {
//     return (
//       <div className="grid gap-4">
//         <F0Chart f0={combined.map((d) => d.f0)} timeStepMs={5} />
//       </div>
//     );
//   }

//   const pairs = useMemo(() => {
//     const items = data.F0Boxplot || [];
//     const res = [];
//     for (let i = 0; i < items.length; i += 2) res.push(items.slice(i, i + 2));
//     return res;
//   }, [data]);

//   return (
//     <div className="grid gap-6">
//       {pairs.map((pair, idx) => (
//         <div key={idx} className={`grid grid-cols-${pair.length} gap-4`}>
//           {pair.map((d) => (
//             <ChartCard key={d.id} title={d.id}>
//               <F0Chart f0={d.F0} timeStepMs={5} />
//             </ChartCard>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
