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


// export function DisplayChart({ groupedData }) {
//     // console.log("Grouped Data:", groupedData);
//   if (!groupedData || Object.keys(groupedData).length === 0) {
//     return <p className="text-center mt-2">Nenhum dado disponível</p>;
//   }

//   return (
//         <>
//           {Object.entries(groupedData).map(([chartType, group], chartIndex) => {
//             const isRadar = chartType === "radar";
//             const title = isRadar ? "Valores Estáticos" : "Valores Não Estáticos";
//             return (  
//                   <>
//                     {Object.entries(group).map(([groupName, data], idx) => {
//                       if (!data || data.length <= 1) return null; // Ignora dados com 1 valor
//                       const { labelPrefix, chartComponent: ChartComp } = chartConfig[chartType];
//                       if (isRadar) {
//                         return (
//                         <div key={`${chartType}-${groupName}-${idx}`} className="mb-4">
//                           <h5 className="text-center">{labelPrefix} {translateKey(groupName)}</h5>
//                           <ChartComp data={data} />
//                         </div>
//                       );
//                       }
//                       else if (chartType === "line") {
//                         <Accordion alwaysOpen>
//                           return (
//                             <Accordion.Item eventKey={idx.toString()} key={groupName}>
//                               <Accordion.Header>
//                                 {labelPrefix} {translateKey(groupName)}
//                               </Accordion.Header>
//                               <Accordion.Body>
//                                 <ChartComp data={data} />
//                               </Accordion.Body>
//                             </Accordion.Item>
//                           );
//                           </Accordion>
//                       }
//                     })}
//                   </>
//             );
//           })}
//         </>
//   );
// }


// export function DisplayChart({ groupedData }) {
//   if (!groupedData || Object.keys(groupedData).length === 0) {
//     return <p className="text-center mt-2">Nenhum dado disponível</p>;
//   }

//   return (
//     <>
//       {/* Valores Estáticos - Radar */}
//       {groupedData.radar && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           {Object.entries(groupedData.radar).map(([groupName, data], idx) => {
//             if (!data || data.length <= 1) return null;

//             const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

//             return (
//               <div key={`radar-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
//                 <h5 className="text-center mb-2">{labelPrefix} {translateKey(groupName)}</h5>
//                 <ChartComp data={data} />
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Valores Não Estáticos - Line (Accordion) */}
//       {groupedData.line && (
//         <Accordion alwaysOpen>
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>Valores Não Estáticos</Accordion.Header>
//             <Accordion.Body>
//               <div className="space-y-6">
//                 {Object.entries(groupedData.line).map(([groupName, data], idx) => {
//                   if (!data || data.length <= 1) return null;
//                   const { labelPrefix, chartComponent: ChartComp } = chartConfig.line;

//                   return (
//                     <div key={`line-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
//                       <h5 className="text-center mb-2">{labelPrefix} {translateKey(groupName)}</h5>
//                       <ChartComp data={data} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       )}
//     </>
//   );
// }


// export function DisplayChart({ groupedData }) {
//   if (!groupedData || Object.keys(groupedData).length === 0) {
//     return <p className="text-center mt-2">Nenhum dado disponível</p>;
//   }

//   // Separar os gráficos de radar entre "bbeon_bbeoff" e os outros
//   const radarData = groupedData.radar || {};
//   const radarBbe = {};
//   const radarOutros = {};

//   Object.entries(radarData).forEach(([groupName, data]) => {
//     if (groupName.toLowerCase().includes("bbeon") || groupName.toLowerCase().includes("bbeoff")) {
//       radarBbe[groupName] = data;
//     } else {
//       radarOutros[groupName] = data;
//     }
//   });

//   const lineData = groupedData.line || {};

//   return (
//     <Accordion alwaysOpen defaultActiveKey="0">
//       {/* Accordion Principal: Gráficos Principais */}
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>Gráficos Principais</Accordion.Header>
//         <Accordion.Body>
//           {/* Gráficos BBEON/BBEOFF */}
//           {Object.entries(radarBbe).map(([groupName, data], idx) => (
//             <div key={`radar-bbe-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow mb-6">
//               <h4 className="text-center font-semibold mb-1">{translateKey(groupName)}</h4>
//               <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-2">Gráfico radar agregado de todos os passos</p>
//               {chartConfig.radar.chartComponent && <chartConfig.radar.chartComponent data={data} />}
//             </div>
//           ))}

//           {/* Sub-Accordion: Outros Gráficos Radar */}
//           {Object.keys(radarOutros).length > 0 && (
//             <Accordion alwaysOpen>
//               <Accordion.Item eventKey="0">
//                 <Accordion.Header>Outros Gráficos de Radar</Accordion.Header>
//                 <Accordion.Body>
//                   {Object.entries(radarOutros).map(([groupName, data], idx) => (
//                     <div key={`radar-outro-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow mb-6">
//                       <h4 className="text-center font-semibold mb-1">{translateKey(groupName)}</h4>
//                       <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-2">Radar agregado de todos os passos</p>
//                       {chartConfig.radar.chartComponent && <chartConfig.radar.chartComponent data={data} />}
//                     </div>
//                   ))}
//                 </Accordion.Body>
//               </Accordion.Item>
//             </Accordion>
//           )}
//         </Accordion.Body>
//       </Accordion.Item>

//       {/* Accordion Principal: Mais Gráficos */}
//       <Accordion.Item eventKey="1">
//         <Accordion.Header>Mais Gráficos</Accordion.Header>
//         <Accordion.Body>
//           {Object.entries(lineData).map(([groupName, data], idx) => (
//             <div key={`line-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow mb-6">
//               <h4 className="text-center font-semibold mb-1">{translateKey(groupName)}</h4>
//               <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-2">Gráfico de linha com dados não estáticos de todos os passos</p>
//               {chartConfig.line.chartComponent && <chartConfig.line.chartComponent data={data} />}
//             </div>
//           ))}
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// }

//um por linha
// export function DisplayChart({ groupedData, filterRadarOnly = false, labels = [], excludeRadarLabels = [] }) {
//   return (
//     <div className="grid gap-6">
//       {Object.entries(groupedData).map(([chartType, data], idx) => {
//         if (!data || Object.keys(data).length === 0) return null;

//         const isRadar = chartType === "radar";

//         if (isRadar) {
//           const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

//           return (
//             <div key={`${chartType}-${idx}`} className="grid gap-4">
//               {Object.entries(data).map(([dataKey, chartData], i) => (
//                 <div key={`${chartType}-${dataKey}-${i}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
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

//         return null; // caso tipo não seja nem 'radar' nem 'line'
//       })}
//     </div>
//   );
// }



//Dois em dois: Agrupa os dados de radar e linha em um único componente
export function DisplayChart({ groupedData, filterRadarOnly = false, labels = [], excludeRadarLabels = [], variant = "grid" }) {
  return (
    <div className="grid gap-6">
      {Object.entries(groupedData).map(([chartType, data], idx) => {
        if (!data || Object.keys(data).length === 0) return null;

        const isRadar = chartType === "radar";

        if (isRadar) {
          const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

          return (
            <div key={`${chartType}-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(data).map(([dataKey, chartData], i) => (
                <div key={`${chartType}-${dataKey}-${i}`} className="bg-white rounded-2xl p-4 shadow w-full h-full min-w-0"
                >
                  <h5 className="text-center mb-2">{labelPrefix} {translateKey(dataKey)}</h5>
                  <ChartComp data={chartData} />
                </div>
              ))}
            </div>
          );
        }

        if (chartType === "line") {
          const { labelPrefix, chartComponent: ChartComponent } = chartConfig.line;

          return (
            <div key={`${chartType}-${idx}`} className="grid gap-4">
              {Object.entries(data).map(([dataKey, chartData], i) => (
                <div key={`${chartType}-${dataKey}-${i}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
                  <h5 className="text-center mb-2">{labelPrefix} {translateKey(dataKey)}</h5>
                  <ChartComponent data={chartData} />
                </div>
              ))}
            </div>
          );
        }

        {/*Gráficos Agrupados por Categóprias. Ex: BBEons num só gráfico */}
        // if (chartType === "line") {
        //   const { labelPrefix, chartComponent: ChartComponent } = chartConfig.line;

        //   return (
        //     <div key={`${chartType}-${idx}`} className="grid gap-6">
        //       {Object.entries(data).map(([categoryKey, descriptorsObj], i) => (
        //         <div key={`${chartType}-${categoryKey}-${i}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
        //           <h5 className="text-center text-lg font-semibold mb-2">
        //             {labelPrefix} {translateKey(categoryKey)}
        //           </h5>
        //           {/* Passa todos os descritores da categoria */}
        //           <ChartComponent dataGroup={descriptorsObj} />
        //         </div>
        //       ))}
        //     </div>
        //   );
        // }


        return null;
      })}
    </div>
  );
}


















// export function DisplayChart({ groupedData, labels = [], excludeRadarLabels = [] }) {
//   const staticCharts = {};
//   const dynamicCharts = {};

//   Object.entries(groupedData).forEach(([label, data]) => {
//     const chartType = chartConfig[label]?.type;

//     if (chartType === 'radar') {
//       if (!excludeRadarLabels.includes(label)) {
//         staticCharts[label] = data;
//       }
//     } else {
//       dynamicCharts[label] = data;
//     }
//   });

//   return (
//     <div className="grid gap-8">
//       {/* VALORES ESTÁTICOS */}
//       {Object.keys(staticCharts).length > 0 && (
//         <div>
//           <h4 className="text-lg font-semibold mb-2">Valores Estáticos</h4>
//           <div className="grid gap-4 pl-2">
//             {Object.entries(staticCharts).map(([label, data], idx) => {
//               const ChartComponent = chartConfig[label]?.chartComponent || chartConfig.radar.chartComponent;
//               return (
//                 <div key={idx}>
//                   <h5 className="font-medium mb-1">{label}</h5>
//                   <ChartComponent data={data} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* VALORES NÃO ESTÁTICOS */}
//       {Object.keys(dynamicCharts).length > 0 && (
//         <div>
//           <h4 className="text-lg font-semibold mb-2">Valores Não Estáticos</h4>
//           <div className="grid gap-4 pl-2">
//             {Object.entries(dynamicCharts).map(([label, data], idx) => {
//               const ChartComponent =
//                 chartConfig[label]?.chartComponent || chartConfig.line?.chartComponent;
//               return (
//                 <div key={idx}>
//                   <h5 className="font-medium mb-1">{label}</h5>
//                   <ChartComponent data={data} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

