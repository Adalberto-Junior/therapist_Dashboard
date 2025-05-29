import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecursiveAccordion } from "./chartConfiguraction/RecursiveAccordion.jsx";
import {chartConfig} from "./chartConfiguraction/chartConfig.jsx";
import {groupChartData} from "./chartConfiguraction/groupChartData.jsx";
import {ChartAccordion} from "./chartConfiguraction/ChartAccordion.jsx";
import {RadarChart, BarChart, StaticBarChart} from "../../../component/chart.jsx"

const keyTranslations = {
    static_result: "Resultados Estáticos",
    no_static_result: "Resultados não Estáticos",
    "avg_BBEon_1": "Média BBEon 1",
    "avg_BBEon_2": "Média BBEon 2",
    "avg_BBEon_3": "Média BBEon 3",
    "avg_BBEon_4": "Média BBEon 4",
    $oid: "ID do Objeto",
    id: "Identificador",
    date: "Data",
    // Adicione outros conforme necessário
};

function translateKey(key) {
    return keyTranslations[key] || key.replace(/_/g, " ");
}

export default function PhonotionResult() {
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
    // Criar uma lista única de datas sem duplicação
    const uniqueDates = [...new Set(results.map((res) => res.date))];
    const filtered = results.filter((res) => res.date === selectedDate);
   

    // Agrupa dados estáticos para Radar
    function buildRadarData(staticArr) {
        const groups = {};
        staticArr.forEach(obj => {
        Object.entries(obj).forEach(([k, v]) => {
            const prefix = k.replace(/_\d+$/, '');
            const num = parseFloat(v);
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
                // const radarData = buildRadarData(item.static_result || []);
                // const barGroups = buildBarData(item.no_static_result || []);
                const groupedData = groupChartData(item.static_result || [], item.no_static_result || [], chartConfig);
                
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
                      {/* Dados em Gráficos */}
                      {/* <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Gráficos</h2>
                        <ChartAccordion radarData={radarData} barGroups={barGroups}/>
                      </div> */}
                      <div className="mb-6">
                        <ChartAccordion groupedData={groupedData} />
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