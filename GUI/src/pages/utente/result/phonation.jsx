import React, { useEffect, useState } from "react";
import api from "../../../api.jsx";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import {RadarChart, BarChart, StaticBarChart} from "../../../component/chart.jsx"

const keyTranslations = {
    static_result: "Resultados Estáticos",
    no_static_result: "Resultados não Estáticos",
    $oid: "ID do Objeto",
    id: "Identificador",
    date: "Data",
};

function translateKey(key) {
    return keyTranslations[key] || key.replace(/_/g, " ");
}

function RecursiveAccordion({ data }) {
    
    if (!data || Object.keys(data).length === 0) {
        return <p className="text-center mt-2">Nenhum dado disponível</p>;
    }

    return (
        <Accordion alwaysOpen>
            {Object.entries(data).map(([key, value], index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                    {key !== "_id" && key !== "date" && key !== "user" && key !== "recording" && key !== "processing_type" && key !== "step" && (
                        <>
                            {/* <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header> */}
                            <Accordion.Header>{translateKey(key)}</Accordion.Header>
                            <Accordion.Body>
                                {/* Se o valor for um objeto, renderiza recursivamente */}
                                {typeof value === "object" && value !== null ? (
                                    Array.isArray(value) ? (
                                        /* Se for uma lista */
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

export default function PhonationResult() {
    const [results, setResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/${id}/analise/fonacao`);
                setResults(response.data);
                if (response.data.length > 0) {
                    setSelectedDate(response.data[0].date); 
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [id]);

    const uniqueDates = [...new Set(results.map((res) => res.date))];
    const filtered = results.filter((res) => res.date === selectedDate);


    // Agrupa dados estáticos para Radar
    function buildRadarData(staticArr) {
        const groups = {};
        staticArr.forEach(obj => {
        Object.entries(obj).forEach(([k, v]) => {
            const prefix = k.replace(/_\d+$/, '');
            const num = parseFloat(v[0]);
            groups[prefix] = groups[prefix] || [];
            groups[prefix].push(num);
        });
        });
        return Object.entries(groups).map(([axis, vals]) => ({
        axis,
        value: vals.reduce((a, b) => a + b, 0) / vals.length
        }));
    }

    // Agrupa dados não estáticos para Barras
    function buildBarData(nonStaticArr) {
        const result = {};
        nonStaticArr.forEach(obj => {
        Object.entries(obj).forEach(([k, arr]) => {
            result[k] = (arr || []).map(x => parseFloat(x));
        });
        });
        return result;
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="flex-1 p-1">
        <div className=" container w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-5">Resultados de Fonação</h1>

          <select
            className="mb-4 p-2 border rounded w-full"
            value={selectedDate || ''}
            onChange={e => setSelectedDate(e.target.value)}
          >
            {uniqueDates.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          {filtered.length ? (
            <Accordion alwaysOpen>
              {filtered.map((item, idx) => {
                const radarData = buildRadarData(item.static_result || []);
                const barGroups = buildBarData(item.no_static_result || []);

                return (
                  <Accordion.Item eventKey={idx.toString()} key={idx}>
                    <Accordion.Header>{`Step ${idx + 1}`}</Accordion.Header>
                    <Accordion.Body>

                      {/* Dados Numéricos */}
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Números</h2>
                        {/** Reutilize seu Accordion recursivo aqui se quiser **/}
                        <RecursiveAccordion data={item} />
                      </div>
                      

                      {/* Radar Chart */}
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Radar (Estáticos)</h2>
                        <br></br>
                        {/* <RadarChart data={radarData} /> */}
                        <StaticBarChart data={radarData}/>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Métricas Estáticas</h2>
                        <StaticBarChart data={radarData} width={600} height={Math.max(200, radarData.length * 25)} />
                      </div>

                      {/* Bar Charts */}
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Barras (Não Estáticos)</h2>
                        {Object.entries(barGroups).map(([key, vals]) => (
                          <div key={key} className="mb-4">
                            <h3 className="font-medium mb-1">{translateKey(key)}</h3>
                            <BarChart data={vals} />
                          </div>
                        ))}
                      </div>

                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          ) : (
            <p className="text-center mt-5">Nenhum dado disponível para essa data.</p>
          )}

        </div>
      </div>
    </div>
  );
}