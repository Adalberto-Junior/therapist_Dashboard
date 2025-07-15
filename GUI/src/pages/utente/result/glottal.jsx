import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecursiveAccordion } from "./chartConfiguraction/RecursiveAccordion.jsx";
import {chartConfig} from "./chartConfiguraction/chartConfig.jsx";
import {ChartAccordion, DisplayChart} from "./chartConfiguraction/ChartAccordion.jsx";
import {groupChartData, groupBBEonBBEoffData, groupNotBBEonBBEoffData} from "./chartConfiguraction/groupChartData.jsx";

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

// function ChartAccordion({radarData,barGroups}) {
//   return (
//         <Accordion alwaysOpen>
//             <Accordion.Item eventKey={"0"}>
//               <Accordion.Header>Gráficos</Accordion.Header>
//               <Accordion.Body>
//                 {/* Radar Chart */}
//                 <div className="mb-6">
//                   <h2 className="text-lg font-semibold mb-2">Radar (Estáticos)</h2>
//                   <br></br>
//                   {/* <RadarChart data={radarData} /> */}
//                   <StaticBarChart data={radarData}/>
//                 </div>

//                 <div className="mb-6">
//                   <h2 className="text-lg font-semibold mb-2">Métricas Estáticas</h2>
//                   <StaticBarChart data={radarData} width={600} height={Math.max(200, radarData.length * 25)} />
//                 </div>

//                 {/* Bar Charts */}
//                 <div>
//                   <h2 className="text-lg font-semibold mb-2">Barras (Não Estáticos)</h2>
//                   {Object.entries(barGroups).map(([key, vals]) => (
//                     <div key={key} className="mb-4">
//                       <h3 className="font-medium mb-1">{translateKey(key)}</h3>
//                       <BarChart data={vals} />
//                     </div>
//                   ))}
//                 </div>
                
//               </Accordion.Body>
//             </Accordion.Item>
//         </Accordion>
//     );
// }


// export default function GlottalResult() {
//     const [results, setResults] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/analise/glotal`);
//                 setResults(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedDate(response.data[0].date); 
//                 }
//             } catch (error) {
//                 console.error("Erro ao buscar dados:", error);
//             }
//         };
//         fetchData();
//     }, [id]);
//     // Criar uma lista única de datas sem duplicação
//     const uniqueDates = [...new Set(results.map((res) => res.date))];
//     const filtered = results.filter((res) => res.date === selectedDate);
   

//     // Agrupa dados estáticos para Radar
//     // function buildRadarData(staticArr) {
//     //     const groups = {};
//     //     staticArr.forEach(obj => {
//     //     Object.entries(obj).forEach(([k, v]) => {
//     //         const prefix = k.replace(/_\d+$/, '');
//     //         const num = parseFloat(v);
//     //         groups[prefix] = groups[prefix] || [];
//     //         groups[prefix].push(num);
//     //     });
//     //     });
//     //     return Object.entries(groups).map(([axis, vals]) => ({
//     //     axis,
//     //     value: vals.reduce((a, b) => a + b, 0) / vals.length
//     //     }));
//     // }

//     // // Agrupa dados não estáticos para Barras
//     // function buildBarData(nonStaticArr) {
//     //     const result = {};
//     //     nonStaticArr.forEach(obj => {
//     //     Object.entries(obj).forEach(([k, arr]) => {
//     //         result[k] = (arr || []).map(x => parseFloat(x));
//     //     });
//     //     });
//     //     return result;
//     // }
    
//     return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="flex-1 p-1">
//         <div className=" container w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//           <h1 className="text-2xl font-bold text-center mb-5">Resultados de Glota</h1>

//           <select
//             className="mb-4 p-2 border rounded w-full"
//             value={selectedDate || ''}
//             onChange={e => setSelectedDate(e.target.value)}
//           >
//             {uniqueDates.map((d, i) => (
//               <option key={i} value={d}>{d}</option>
//             ))}
//           </select>

//           {filtered.length ? (
//             <Accordion alwaysOpen>
//               {filtered.map((item, idx) => {
//                 // const radarData = buildRadarData(item.static_result || []);
//                 // const barGroups = buildBarData(item.no_static_result || []);
//                 const groupedData = groupChartData(item.static_result || [], item.no_static_result || [], chartConfig);
//                 return (
//                   <Accordion.Item eventKey={idx.toString()} key={idx}>
//                     <Accordion.Header>{`Step ${idx + 1}`}</Accordion.Header>
//                     <Accordion.Body>

//                       {/* Dados Numéricos */}
//                       <div className="mb-6">
//                         <h2 className="text-lg font-semibold mb-2">Números</h2>
//                         {/** Reutilize seu Accordion recursivo aqui se quiser **/}
//                         <RecursiveAccordion data={item} />
                        
//                       </div>
//                       {/* Dados em Gráficos */}
//                       {/* <div className="mb-6">
//                         <h2 className="text-lg font-semibold mb-2">Gráficos</h2>
//                         <ChartAccordion radarData={radarData} barGroups={barGroups}/>
//                       </div> */}
//                       <div className="mb-6">
//                         <ChartAccordion groupedData={groupedData} />
//                       </div>
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 );
//               })}
//             </Accordion>
//           ) : (
//             <p className="text-center mt-5">Nenhum dado disponível para essa data.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


export default function GlottalResult() {
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/utente/${id}/analise/glotal`);
        setResults(response.data);
        if (response.data.length > 0) {
          setSelectedDate(response.data[response.data.length - 1].date);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const typeOfProcessing = filtered.find(item => item.date === selectedDate)?.processing_type;
    if (!typeOfProcessing) return;
    const selectedDate_ = selectedDate;
    try {
      if (!window.confirm(`Tem certeza que deseja eliminar todos os resultados desta data: ${selectedDate_}?`)) return;

      await api.delete(`/utente/${id}/analise/${typeOfProcessing}/${selectedDate}`);
      setResults((prevResults) => prevResults.filter((res) => res.date !== selectedDate));
      if (filtered.length === 0) {
        setSelectedDate(null);
      }
      alert(`Resultados da data ${selectedDate_} eliminado com sucesso!`);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar dados:", error);
      alert("Erro ao eliminar os resultados. Tente novamente.");
    }
  };

  const handleDeleteByResultId = async (resultId) => {
    try {
      if (!window.confirm("Tem certeza que deseja eliminar este resultado?")) return;

      await api.delete(`/utente/${id}/analise/${resultId.$oid || resultId}`);
      setResults((prevResults) => prevResults.filter((res) => res._id !== resultId));
      if (filtered.length === 0) {
        setSelectedDate(null);
      }
      alert("Resultado eliminado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar dados:", error);
      alert("Erro ao eliminar o resultado. Tente novamente.");
    }
  };

  const uniqueDates = [...new Set(results.map((res) => res.date))];
  const filtered = results.filter((res) => res.date === selectedDate);

  const radarLabels = ['bbeon', 'bbeoff'];

  const allRadarGroupedData = filtered.reduce((acc, item, index) => {
    const staticResult = item.static_result || [];
    const grouped = groupBBEonBBEoffData(staticResult, chartConfig);

    Object.entries(grouped).forEach(([type, charts]) => {
      if (!acc[type]) acc[type] = {};
      Object.entries(charts).forEach(([label, data]) => {
        // Adiciona passo no rótulo para distinção visual
        // acc[type][`${label} (Passo ${index + 1})`] = data;
        acc[type][`${label} (Passo ${item.step})`] = data;
      });
    });

    return acc;
  }, {});


  return (
    <div className="min-h-screen min-w-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="flex-1 p-1">
        <div className="text-4xl font-bold text-center mb-5 p-3 text-gray-900 dark:text-white">Resultados de Glota</div>

        <select
          className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          value={selectedDate || ''}
          onChange={e => setSelectedDate(e.target.value)}
        >
          {uniqueDates.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        {filtered.length ? (
          <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-6">
            <div className="w-full flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:basis-2/6 bg-gray-100 dark:bg-zinc-900 rounded-lg p-6">
                <div className="w-full bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-3">Dados Numéricos Relevantes</h2>
                  {filtered.map((item, idx) => {
                    const staticResult = item.static_result || [];
                    const camposImportantes = ["F0avg", "F0std", "F0max", "avgEvoiced", "stdEvoiced", "avglastEunvoiced", "Vrate", "avgdurvoiced", "stddurpause", "stddurunvoiced", "avgdurunvoiced", "stddurvoiced"];
                    const dadosRelevantes = staticResult.filter(obj => camposImportantes.includes(Object.keys(obj)[0]));
                    const prioridade = campo => {
                      if (campo.includes("DDF")) return 3;
                      if (campo.includes("DF")) return 2;
                      return 1;
                    };

                    dadosRelevantes.sort((a, b) => {
                      const chaveA = Object.keys(a)[0];
                      const chaveB = Object.keys(b)[0];
                      return prioridade(chaveA) - prioridade(chaveB);
                    });

                    if (dadosRelevantes.length === 0) return null;
                    return (
                      <div key={idx} className="mb-6">
                        <h3 className="text-md font-bold mb-2">Passo {item.step}</h3>
                        <table className="min-w-full bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-600">
                          <thead>
                            <tr className="bg-green-300 dark:bg-gray-500 sticky top-0 z-10">
                              <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Parâmetro</th>
                              <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dadosRelevantes.map((obj, idxs) => {
                              const chave = Object.keys(obj)[0];
                              let valor = obj[chave];
                              if (typeof valor !== 'number') valor = parseFloat(valor) || "N/A";
                              return (
                                <tr key={idxs} className="odd:bg-gray-100 odd:dark:bg-gray-300">
                                  <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2">{translateKey(chave)}</td>
                                  <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2">
                                    {typeof valor === 'number' && !isNaN(valor) ? valor.toFixed(2) : 'N/A'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full md:basis-4/5  bg-white dark:bg-zinc-700 p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Gráficos</h2>
                {/* <h3 className="text-md font-semibold mb-3">bbeon & bbeoff</h3> */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2  "> */}
                  {Object.keys(allRadarGroupedData).map((type) => (
                    <div key={type} className="w-full min-w-0">
                      <DisplayChart
                        groupedData={{ [type]: allRadarGroupedData[type] }}
                        filterRadarOnly={false}
                        labels={radarLabels}
                      />
                    </div>
                  ))}
                {/* </div> */}
                {/* <h3 className="text-md font-semibold mb-3">Radar: bbeon & bbeoff</h3>
                {filtered.map((item, idx) => {
                  const staticResult = item.static_result || [];
                  const groupedData = groupBBEonBBEoffData(staticResult, chartConfig);
                  
                  return (
                    <div key={idx} className="mb-6 items-center">
                      <h4 className="font-semibold mb-1">Passo {idx + 1}</h4>
                      <DisplayChart groupedData={groupedData} filterRadarOnly={false} labels={radarLabels} />
                    </div>
                  );
                })} */}

                <Accordion defaultActiveKey="x" className="mt-6">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Outros Gráficos de Radar</Accordion.Header>
                    <Accordion.Body>
                      {filtered.map((item, idx) => {
                        const staticResult = item.static_result || [];
                        const groupedData = groupNotBBEonBBEoffData(staticResult, chartConfig);
                        return (
                          <div key={idx} className="mb-6">
                            <h4 className="font-semibold mb-1">Passo {item.step}</h4>
                            <DisplayChart groupedData={groupedData} filterRadarOnly={true} excludeRadarLabels={radarLabels} />
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="x" className="mt-6">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Gráficos de valores não estáticos</Accordion.Header>
                    <Accordion.Body>
                      {filtered.map((item, idx) => {
                        const nonStaticResult = item.no_static_result || [];
                        const groupedData = groupChartData([], nonStaticResult, chartConfig);
                        console.log("grouped data: ", groupedData)
                        return (
                          <div key={idx} className="mb-6">
                            <h4 className="font-semibold mb-1">Passo {item.step}</h4>
                            <DisplayChart groupedData={groupedData} />
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

               {/* Dados Adicionais em Accordion */}
            <div className="w-full mt-6"></div>
            <div className="bg-white dark:bg-zinc-700 p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-3">Dados Detalhados</h2>
                <Accordion alwaysOpen>
                  { filtered.map((item, idx) => {
                     return (
                      <Accordion.Item eventKey={`extra-${idx}`} key={idx}>
                        <Accordion.Header>{`Passo ${item.step}`}</Accordion.Header>
                        <Accordion.Body>
                           <RecursiveAccordion data={item} />
                        </Accordion.Body>
                      </Accordion.Item>
                     );
                   })}
                 </Accordion>
              </div>

            <div className="w-full mt-6 flex justify-center">
              <button
                className="mb-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
                onClick={() => handleDelete()}
              >
                Eliminar Todos os Resultados
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-9">
            <p className="text-center mt-5 text-3xl dark:text-white">Nenhum dado disponível para essa data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
