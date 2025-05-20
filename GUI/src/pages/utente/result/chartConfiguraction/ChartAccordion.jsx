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
