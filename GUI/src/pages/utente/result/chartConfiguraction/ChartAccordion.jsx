import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { translateKey } from "./translateKey.jsx";
import { chartConfig } from "./chartConfig.jsx";

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
export function DisplayChart({
  groupedData,
  filterRadarOnly = false,
  labels = [],
  excludeRadarLabels = [],
  variant = "grid",
}) {
  if (!groupedData) return null;

  return (
    <div className="grid gap-6">
      {Object.entries(groupedData).map(([chartType, data], idx) => {
        if (!data || Object.keys(data).length === 0) return null;

        switch (chartType) {
          case "radar":
            return renderRadarCharts(data, idx);
          case "line":
            return renderLineCharts(data, idx);
          case "acousticSpace":
            return renderAcousticChart(data, idx);
          case "acousticSpaceGrouped":
            return renderGroupedAcousticChart(data, idx, true);
          case "acousticSpaceCompared":
            return renderGroupedAcousticChart(data, idx);
          case "Boxplot":
            return renderBoxChart(data, idx,)
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
                <h3 className="text-lg font-semibold mb-2">{date}</h3>
                <ChartComponent data={dateData} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}


// function renderBoxChart(data, idx, oneChart = false) {
//   const { chartComponent: ChartComponent } = chartConfig.Boxplot;

//   console.log("DataBox: ",data)

//   if (oneChart) {
//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-4">
//         <ChartComponent data={data} />
//       </div>
//     );
//   } else {
//     // data is an array of { id, F0 }
//     const entries = data.map(d => [d.id, d.F0]);

//     // Group into pairs
//     const pairedEntries = [];
//     for (let i = 0; i < entries.length; i += 2) {
//       pairedEntries.push(entries.slice(i, i + 2));
//     }

//     return (
//       <div key={`BoxPlot-${idx}`} className="grid gap-6">
//         {pairedEntries.map((pair, pairIdx) => (
//           <div
//             key={`chart-pair-${pairIdx}`}
//             className={`grid grid-cols-${pair.length} gap-4`}
//           >
//             {pair.map(([label, f0Values]) => (
//               <div key={`chart-${label}`} className="border p-4 rounded shadow">
//                 <h3 className="text-lg font-semibold mb-2">{label}</h3>
//                 <ChartComponent data={f0Values} />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

function renderBoxChart(data, idx, oneChart = false) {
  const { chartComponent: ChartComponent } = chartConfig.Boxplot;

  if (oneChart) {
    // Transform array of { id, F0 } into { id: F0 }
    const transformedData = data.reduce((acc, item) => {
      acc[item.id] = item.F0;
      return acc;
    }, {});

    return (
      <div key={`BoxPlot-${idx}`} className="grid gap-4">
        <ChartComponent data={transformedData} />
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
                <h3 className="text-lg font-semibold mb-2">{label}</h3>
                <ChartComponent data={{ [label]: f0Values }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
