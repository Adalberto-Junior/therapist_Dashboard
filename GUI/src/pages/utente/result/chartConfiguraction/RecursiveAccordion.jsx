// Accordion Recursivo
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { translateKey } from "./translateKey.jsx";

export function RecursiveAccordion({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p className="text-center mt-2">Nenhum dado disponível</p>;
  }
  return (
    <Accordion alwaysOpen>
      {Object.entries(data).map(([key, value], index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          {key !== "_id" && key !== "date" && key !== "user" && key !== "recording" && key !== "processing_type" && key !== "step" && (
            <>
              <Accordion.Header>{translateKey(key)}</Accordion.Header>
              <Accordion.Body>
                {typeof value === "object" && value !== null ? (
                  Array.isArray(value) ? (
                    value.map((item, subIndex) => (
                      <div key={subIndex} className="border p-2 rounded">
                        {typeof item === "object" && item !== null ? (
                          <RecursiveAccordion data={item} />
                        ) : (
                          item.toString()
                        )}
                      </div>
                    ))
                  ) : (
                    <RecursiveAccordion data={value} />
                  )
                ) : (
                  value.toString()
                )}
              </Accordion.Body>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}