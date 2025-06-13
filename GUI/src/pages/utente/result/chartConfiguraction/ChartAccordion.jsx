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


export function DisplayChart({ groupedData }) {
  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p className="text-center mt-2">Nenhum dado disponível</p>;
  }

  return (
    <>
      {/* Valores Estáticos - Radar */}
      {groupedData.radar && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(groupedData.radar).map(([groupName, data], idx) => {
            if (!data || data.length <= 1) return null;
            const { labelPrefix, chartComponent: ChartComp } = chartConfig.radar;

            return (
              <div key={`radar-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
                <h5 className="text-center mb-2">{labelPrefix} {translateKey(groupName)}</h5>
                <ChartComp data={data} />
              </div>
            );
          })}
        </div>
      )}

      {/* Valores Não Estáticos - Line (Accordion) */}
      {groupedData.line && (
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Valores Não Estáticos</Accordion.Header>
            <Accordion.Body>
              <div className="space-y-6">
                {Object.entries(groupedData.line).map(([groupName, data], idx) => {
                  if (!data || data.length <= 1) return null;
                  const { labelPrefix, chartComponent: ChartComp } = chartConfig.line;

                  return (
                    <div key={`line-${groupName}-${idx}`} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
                      <h5 className="text-center mb-2">{labelPrefix} {translateKey(groupName)}</h5>
                      <ChartComp data={data} />
                    </div>
                  );
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}
