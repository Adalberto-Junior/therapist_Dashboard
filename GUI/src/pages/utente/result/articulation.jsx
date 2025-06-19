import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadarChart, BarChart, StaticBarChart } from "../../../component/chart.jsx";
import {chartConfig} from "./chartConfiguraction/chartConfig.jsx";
import {groupChartData, groupBBEonBBEoffData, groupNotBBEonBBEoffData} from "./chartConfiguraction/groupChartData.jsx";
import {ChartAccordion, DisplayChart} from "./chartConfiguraction/ChartAccordion.jsx";
import { RecursiveAccordion } from "./chartConfiguraction/RecursiveAccordion.jsx";


// Traduções de chave
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
};

function translateKey(key) {
  return keyTranslations[key] || key.replace(/_/g, " ");
}

// // Configuração escalável de gráficos
// const chartConfig = {
//   radar: {
//     match: /^avg ([a-zA-Z]+)_/,
//     labelPrefix: "Média",
//     chartComponent: RadarChart,
//   },
//   // Pode adicionar mais aqui, ex:
//   // bar: { match: /^sum_([a-zA-Z]+)_/, labelPrefix: "Soma", chartComponent: BarChart }
// };

// // Agrupador genérico de dados de gráfico
// function groupChartData(staticData, config) {
//   const result = {};

//   Object.entries(config).forEach(([chartType]) => {
//     result[chartType] = {};
//   });

//   staticData.forEach(item => {
//     Object.entries(item).forEach(([key, value]) => {
//       Object.entries(config).forEach(([chartType, { match }]) => {
//         const matchResult = key.match(match);
//         if (matchResult) {
//           const group = matchResult[1]; // exemplo: BBEon
//           if (!result[chartType][group]) result[chartType][group] = [];
//           result[chartType][group].push({ axis: key, value: parseFloat(value) });
//         }
//       });
//     });
//   });

//   return result;
// }

// function groupAvgRadarData(staticArr) {
//   const grouped = {};

//   staticArr.forEach(obj => {
//     Object.entries(obj).forEach(([k, v]) => {
//       if (k.startsWith("avg")) {
//         const prefix = k.replace(/_\d+$/, ''); // agrupa por ex: avg_BBEon
//         grouped[prefix] = grouped[prefix] || [];
//         grouped[prefix].push({ axis: k, value: parseFloat(v) });
//       }
//     });
//   });

//   return grouped;
// }




// // Agrupamento para dados não estáticos
// function buildBarData(nonStaticArr) {
//   const result = {};
//   nonStaticArr.forEach(obj => {
//     Object.entries(obj).forEach(([k, arr]) => {
//       result[k] = (arr || []).map(x => parseFloat(x));
//     });
//   });
//   return result;
// }

// // Accordion Recursivo
// function RecursiveAccordion({ data }) {
//   if (!data || Object.keys(data).length === 0) {
//     return <p className="text-center mt-2">Nenhum dado disponível</p>;
//   }

//   return (
//     <Accordion alwaysOpen>
//       {Object.entries(data).map(([key, value], index) => (
//         <Accordion.Item eventKey={index.toString()} key={index}>
//           {key !== "_id" && key !== "date" && key !== "user" && key !== "recording" && key !== "processing_type" && key !== "step" && (
//             <>
//               <Accordion.Header>{translateKey(key)}</Accordion.Header>
//               <Accordion.Body>
//                 {typeof value === "object" && value !== null ? (
//                   Array.isArray(value) ? (
//                     value.map((item, subIndex) => (
//                       <div key={subIndex} className="border p-2 rounded">
//                         {typeof item === "object" && item !== null ? (
//                           <RecursiveAccordion data={item} />
//                         ) : (
//                           item.toString()
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <RecursiveAccordion data={value} />
//                   )
//                 ) : (
//                   value.toString()
//                 )}
//               </Accordion.Body>
//             </>
//           )}
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// }

// function ChartAccordion({ radarGroups, barGroups }) {
//   return (
//     <Accordion alwaysOpen>
//       <Accordion.Item eventKey="main">
//         <Accordion.Header>Gráficos</Accordion.Header>
//         <Accordion.Body>

//           {/* Sub-accordion: Valores Estáticos */}
//           <Accordion alwaysOpen>
//             <Accordion.Item eventKey="static">
//               <Accordion.Header>Valores Estáticos</Accordion.Header>
//               <Accordion.Body>
//                 <Accordion alwaysOpen>
//                   {Object.entries(radarGroups).map(([groupName, groupData], idx) => (
//                     <Accordion.Item eventKey={idx.toString()} key={groupName}>
//                       <Accordion.Header>{translateKey(groupName)}</Accordion.Header>
//                       <Accordion.Body>
//                         <RadarChart data={groupData} />
//                       </Accordion.Body>
//                     </Accordion.Item>
//                   ))}
//                 </Accordion>
//               </Accordion.Body>
//             </Accordion.Item>

//             {/* Sub-accordion: Valores Não Estáticos */}
//             <Accordion.Item eventKey="nonstatic">
//               <Accordion.Header>Valores Não Estáticos</Accordion.Header>
//               <Accordion.Body>
//                 <Accordion alwaysOpen>
//                   {Object.entries(barGroups).map(([key, vals], idx) => (
//                     <Accordion.Item eventKey={idx.toString()} key={key}>
//                       <Accordion.Header>{translateKey(key)}</Accordion.Header>
//                       <Accordion.Body>
//                         <BarChart data={vals} />
//                       </Accordion.Body>
//                     </Accordion.Item>
//                   ))}
//                 </Accordion>
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>

//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// }

//TODO: FUNÇÃO A FUNCIONAR
// Componente Principal
// export default function ArticulationResult() {
//   const [results, setResults] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/${id}/analise/articulacao`);
//         setResults(response.data);
//         if (response.data.length > 0) {
//           setSelectedDate(response.data[response.data.length - 1].date);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleDelete = async () => {
//     const typeOfProcessing = filtered.find(item => item.date === selectedDate)?.processing_type;
//     if (!typeOfProcessing) return;
//     const selectedDate_ = selectedDate;
//     try {
//       if (!typeOfProcessing) return;
//       if (!window.confirm(`Tem certeza que deseja eliminar todos os resultados desta data: ${selectedDate_}?`)) return;

//       await api.delete(`/utente/${id}/analise/${typeOfProcessing}/${selectedDate}`);
//       setResults((prevResults) =>
//         prevResults.filter((res) => res.date !== selectedDate)
//       );
//       if (filtered.length === 0) {
//         setSelectedDate(null);
//       }
//       alert(`Resultados da data ${selectedDate_} eliminado com sucesso!`);
//       window.location.reload(); // Recarrega a página para atualizar os dados
//     } catch (error) {
//       console.error("Erro ao deletar dados:", error);
//       alert("Erro ao eliminar os resultados. Tente novamente.");
//     }
//   };

//   const handleDeleteByResultId = async (resultId) => {
//     try {
//       if (!window.confirm("Tem certeza que deseja eliminar este resultado?")) return;

//       await api.delete(`/utente/${id}/analise/${resultId.$oid || resultId}`);
//       setResults((prevResults) =>
//         prevResults.filter((res) => res._id !== resultId)
//       );
//       if (filtered.length === 0) {
//         setSelectedDate(null);
//       }
//       alert("Resultado eliminado com sucesso!");
//       window.location.reload(); // Recarrega a página para atualizar os dados

//     } catch (error) {
//       console.error("Erro ao deletar dados:", error);
//       alert("Erro ao eliminar o resultado. Tente novamente.");
//     }
//   };

//   const uniqueDates = [...new Set(results.map((res) => res.date))];
//   const filtered = results.filter((res) => res.date === selectedDate);

//   return (
//     <div className="min-h-screen min-w-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="flex-1 p-1">
//         {/* <div className=" container w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
//           {/* <div className=" container w-full max-w-xl text-gray-900 bg-white  dark:bg-zinc-800  dark:text-white shadow-md rounded-lg p-6"> */}
//           <div className="text-4xl font-bold text-center mb-5 p-3 text-gray-900 dark:text-white">Resultados de Articulação</div>

//           <select
//            className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//             value={selectedDate || ''}
//             onChange={e => setSelectedDate(e.target.value)}
//           >
//             {uniqueDates.map((d, i) => (
//               <option key={i} value={d}>{d}</option>
//             ))}
//           </select>
          
//           {filtered.length ? (
//             <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-6">
              
//               <div className="w-full flex flex-col md:flex-row gap-4 items-start">
               
//                 {/* Esquerda: Valores númericos */}
//                 <div className="w-full md:basis-2/6 bg-gray-100 dark:bg-zinc-900  rounded-lg p-6">
//                   <div className="w-full bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                     <h2 className="text-lg font-semibold mb-3">Dados Numéricos Relevantes</h2>
                    
//                     {filtered.map((item, idx) => {
//                       const staticResult = item.static_result || [];
//                       // console.log("Static Result:", staticResult);
//                       // Define os campos que deseja destacar
//                       const camposImportantes = [
//                         "avg DF1",
//                         "avg F1",
//                         "avg DDF1",
//                         "avg F2",
//                         "avg DF2",
//                         "avg DDF2",
//                       ];

//                       const dadosRelevantes = staticResult.filter(obj => {
//                         const chave = Object.keys(obj)[0]; // pega a única chave do objeto
//                         return camposImportantes.includes(chave);
//                       });

//                       if (dadosRelevantes.length === 0) return null;
//                       return (
//                         <div key={idx} className="mb-6 ">
//                           <h3 className="text-md font-bold mb-2">{`Passo ${idx + 1}`}</h3>
//                           <table className="min-w-full bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-600">
//                             <thead>
//                               {/* <tr  className="bg-gray-200 dark:bg-gray-500">
//                                 <th className="border-b p-2">Parâmetro</th>
//                                 <th className="border-b p-2">Valor</th>
//                               </tr> */}
//                               <tr className="bg-green-300 dark:bg-gray-500 sticky top-0 z-10">
//                             <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Parâmetro</th>
//                             <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Valor</th>
//                             </tr>
//                               </thead>
//                               <tbody>
//                                 {dadosRelevantes.map((obj, idxs) => {
//                                   const chave = Object.keys(obj)[0];
//                                   let valor = obj[chave];
//                                   if (typeof valor !== 'number') {
//                                     valor = parseFloat(valor) || "N/A"; // Tenta converter para número, se falhar, define como "N/A"
//                                   }
//                                   return (
//                                     // <tr key={idxs}>
//                                     //   <td className="border-b p-2">{chave}</td>
//                                     //   <td className="border-b p-2">{typeof valor === 'number' && !isNaN(valor) ? valor.toFixed(2) : 'N/A'}</td>
//                                     // </tr>

//                                     <tr key={idxs} className="odd:bg-gray-100 odd:dark:bg-gray-300">
//                                       <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2">{translateKey(chave)}</td>
//                                       <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2">
//                                         {typeof valor === 'number' && !isNaN(valor) ? valor.toFixed(2) : 'N/A'}
//                                       </td>
//                                     </tr>
//                                   );
//                                 })}
//                               </tbody>
//                            </table>
//                           {/* <div className="w-full mt-6 flex justify-center ">
//                               <button
//                                 className="mb-4 bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-500 dark:hover:bg-red-800"
//                                 // className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
//                                 onClick={() => handleDeleteByResultId(item._id)}
//                               >
//                                 Eliminar este passo
//                               </button>
//                          </div> */}
//                         </div>

//                       );
//                     })}
//                   </div>
//                 </div>
//                 {/* Direita: Gráficos */}
//                 <div className="w-full md:basis-4/5 bg-white dark:bg-zinc-700 p-6 rounded shadow">
//                   <h2 className="text-lg font-semibold mb-3">Gráficos</h2>
//                   {/* <Accordion alwaysOpen defaultActiveKey="0">
//                       {filtered.map((item, idx) => {
//                         const staticResult = item.static_result || [];
//                         const nonStaticResult = item.no_static_result || [];
//                         const groupedData = groupChartData(staticResult, nonStaticResult, chartConfig);

//                         return (
//                           <Accordion.Item eventKey={idx.toString()} key={idx}>
//                             <Accordion.Header>{`Passo ${idx + 1}`}</Accordion.Header>
//                             <Accordion.Body>
//                               <div className="mb-6">
//                                 <DisplayChart groupedData={groupedData} />
//                               </div>
//                             </Accordion.Body>
//                           </Accordion.Item>
//                         );
//                       })}
//                     </Accordion> */}

//                     {/* Accordion 1: Gráficos Principais */}
//                     <Accordion defaultActiveKey="0" alwaysOpen>
//                       <Accordion.Item eventKey="0">
//                         <Accordion.Header>Gráficos Principais</Accordion.Header>
//                         <Accordion.Body>
//                           <h3 className="text-md font-semibold mb-3">Radar: BBE On/Off por Passo</h3>
//                           {filtered.map((item, idx) => {
//                             const radarGraphs = (item.static_result || []).filter(g => g.chart_type === 'radar' && g.chart_id.includes('bbeon_bbeoff'));
//                             if (!radarGraphs.length) return null;
//                             return (
//                               <div key={idx} className="mb-4">
//                                 <h4 className="font-medium">Passo {idx + 1}</h4>
//                                 <DisplayChart groupedData={{ radar: radarGraphs }} />
//                               </div>
//                             );
//                           })}

//                           <Accordion className="mt-4">
//                             <Accordion.Item eventKey="0">
//                               <Accordion.Header>Outros Gráficos de Radar</Accordion.Header>
//                               <Accordion.Body>
//                                 {filtered.map((item, idx) => {
//                                   const otherRadar = (item.static_result || []).filter(g => g.chart_type === 'radar' && !g.chart_id.includes('bbeon_bbeoff'));
//                                   if (!otherRadar.length) return null;
//                                   return (
//                                     <div key={idx} className="mb-4">
//                                       <h4 className="font-medium">Passo {idx + 1}</h4>
//                                       <DisplayChart groupedData={{ radar: otherRadar }} />
//                                     </div>
//                                   );
//                                 })}
//                               </Accordion.Body>
//                             </Accordion.Item>
//                           </Accordion>
//                         </Accordion.Body>
//                       </Accordion.Item>
//                     </Accordion>

//                     {/* Accordion 2: Mais Gráficos */}
//                     <Accordion defaultActiveKey="0" alwaysOpen className="mt-6">
//                       <Accordion.Item eventKey="1">
//                         <Accordion.Header>Mais Gráficos</Accordion.Header>
//                         <Accordion.Body>
//                           <h3 className="text-md font-semibold mb-3">Gráficos de Valores Não Estáticos (Line Charts)</h3>
//                           {filtered.map((item, idx) => {
//                             const lines = item.no_static_result || [];
//                             if (!lines.length) return null;
//                             return (
//                               <div key={idx} className="mb-4">
//                                 <h4 className="font-medium">Passo {idx + 1}</h4>
//                                 <DisplayChart groupedData={{ line: lines }} />
//                               </div>
//                             );
//                           })}
//                         </Accordion.Body>
//                       </Accordion.Item>
//                     </Accordion>

//                 </div>
//               </div>
//                       {/* Dados Adicionais em Accordion */}
//               <div className="w-full mt-6"></div>
//               <div className="bg-white dark:bg-zinc-700 p-6 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-3">Dados Detalhados</h2>
//                 <Accordion alwaysOpen>
//                   { filtered.map((item, idx) => {
//                     return (
//                       <Accordion.Item eventKey={`extra-${idx}`} key={idx}>
//                         <Accordion.Header>{`Passo ${idx + 1}`}</Accordion.Header>
//                         <Accordion.Body>
//                           <RecursiveAccordion data={item} />
//                         </Accordion.Body>
//                       </Accordion.Item>
//                     );
//                   })}
//                 </Accordion>
//               </div>
//               <div className="w-full mt-6 flex justify-center ">
//                   <button
//                     className="mb-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
//                     // className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
//                     onClick={() => handleDelete()}
//                   >
//                     Eliminar Todos os Resultados
//                   </button>
//               </div>
//             </div>
//             ) : (
//               <div className="w-full bg-gray-100 dark:bg-zinc-900  rounded-lg p-9">
//               <p className="text-center mt-5 text-3xl dark:text-white">Nenhum dado disponível para essa data.</p>
//              </div>
//             )}
          
//         </div>
//       </div>
//     );
//   }

export default function ArticulationResult() {
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/utente/${id}/analise/articulacao`);
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
        acc[type][`${label} (Passo ${index + 1})`] = data;
      });
    });

    return acc;
  }, {});


  return (
    <div className="min-h-screen min-w-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="flex-1 p-1">
        <div className="text-4xl font-bold text-center mb-5 p-3 text-gray-900 dark:text-white">Resultados de Articulação</div>

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
                    const camposImportantes = ["avg DF1", "avg F1", "avg DDF1", "avg F2", "avg DF2", "avg DDF2"];
                    const dadosRelevantes = staticResult.filter(obj => camposImportantes.includes(Object.keys(obj)[0]));

                    if (dadosRelevantes.length === 0) return null;
                    return (
                      <div key={idx} className="mb-6">
                        <h3 className="text-md font-bold mb-2">Passo {idx + 1}</h3>
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
                <h3 className="text-md font-semibold mb-3">bbeon & bbeoff</h3>
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
                            <h4 className="font-semibold mb-1">Passo {idx + 1}</h4>
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
                            <h4 className="font-semibold mb-1">Passo {idx + 1}</h4>
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
                        <Accordion.Header>{`Passo ${idx + 1}`}</Accordion.Header>
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





//TODO:VERISSO
// export default function ArticulationResult() {
//   const [results, setResults] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/${id}/analise/articulacao`);
//         setResults(response.data);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // Pegamos o resultado mais recente
//   const latestResult = results.length ? results[0] : null;
  
//   // Lista de dados considerados prioritários
//   const importantFields = ["amplitude", "velocidade", "precisão", "avg BBEon_1"]; // Exemplo, pode ser alterado

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      
//       {/* <div className="flex-1 p-1"> */}
//         <div className="min-h-screen  min-w-screen max-w-3xl  bg-gray-100 dark:bg-zinc-900 shadow-md rounded-lg p-6">
//           <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

//           {latestResult ? (
//             <div className="grid grid-cols-2 gap-4">
//               {/* Dados Numéricos */}
//               <div className="bg-white dark:bg-zinc-700 p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-3">Dados Numéricos</h2>
//                 {importantFields.map((field) => (
//                   latestResult[field] && (
//                     <p key={field} className="font-medium">
//                       {translateKey(field)}: {latestResult[field]}
//                     </p>
//                   )
//                 ))}
//               </div>

//               {/* Gráficos */}
//               <div className="bg-white dark:bg-zinc-700 p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-3">Gráficos</h2>
//                 <ChartAccordion groupedData={groupChartData(latestResult.static_result || [], latestResult.no_static_result || [], chartConfig)} />
//               </div>
//             </div>
//           ) : (
//             <p className="text-center mt-5">Nenhum dado disponível.</p>
//           )}

//           {/* Dados Adicionais em Accordion */}
//           <Accordion alwaysOpen>
//             <Accordion.Item eventKey="extra">
//               <Accordion.Header>Ver mais detalhes</Accordion.Header>
//               <Accordion.Body>
//                 <RecursiveAccordion data={latestResult} />
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import BarChart from "../../../component/barChat.jsx"
// // import RadarChart from "../../../component/radarChart.jsx"

// import {RadarChart, BarChart, StaticBarChart} from "../../../component/chart.jsx"

// const keyTranslations = {
//     static_result: "Resultados Estáticos",
//     no_static_result: "Resultados não Estáticos",
//     "avg_BBEon_1": "Média BBEon 1",
//     "avg_BBEon_2": "Média BBEon 2",
//     "avg_BBEon_3": "Média BBEon 3",
//     "avg_BBEon_4": "Média BBEon 4",
//     $oid: "ID do Objeto",
//     id: "Identificador",
//     date: "Data",
//     // Adicione outros conforme necessário
// };

// function translateKey(key) {
//     return keyTranslations[key] || key.replace(/_/g, " ");
// }

// const chartConfig = {
//   radar: {
//     match: /^avg_([a-zA-Z]+)_/,
//     labelPrefix: "Média",
//     chartComponent: RadarChart,
//   },
//   bar: {
//     match: /^sum_([a-zA-Z]+)_/,
//     labelPrefix: "Soma",
//     chartComponent: BarChart,
//   },
// };


// function RecursiveAccordion({ data }) {
    
//     if (!data || Object.keys(data).length === 0) {
//         return <p className="text-center mt-2">Nenhum dado disponível</p>;
//     }

//     return (
//         <Accordion alwaysOpen>
//             {Object.entries(data).map(([key, value], index) => (
//                 <Accordion.Item eventKey={index.toString()} key={index}>
//                     {key !== "_id" && key !== "date" && key !== "user" && key !== "recording" && key !== "processing_type" && key !== "step" && (
//                         <>
//                             {/* <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header> */}
//                             <Accordion.Header>{translateKey(key)}</Accordion.Header>
//                             <Accordion.Body>
//                                 {/* Se o valor for um objeto, renderiza recursivamente */}
//                                 {typeof value === "object" && value !== null ? (
//                                     Array.isArray(value) ? (
//                                         /* Se for uma lista, iteramos sobre ela */
//                                         value.map((item, subIndex) => (
//                                             <div key={subIndex} className="border p-2 rounded">
//                                                 {typeof item === "object" && item !== null ? (
//                                                     <RecursiveAccordion data={item} />
//                                                 ) : (
//                                                     item.toString()
//                                                 )}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <RecursiveAccordion data={value} />
//                                     )
//                                 ) : (
//                                     value.toString()
//                                 )}
//                             </Accordion.Body>
//                         </>
//                     )}
//                 </Accordion.Item>
//             ))}
//         </Accordion>
//     );
// }

// function ChartAccordion({ groupedData, barGroups }) {
//   return (
//     <Accordion alwaysOpen>
//       <Accordion.Item eventKey={"0"}>
//         <Accordion.Header>Gráficos</Accordion.Header>
//         <Accordion.Body>

//           {Object.entries(groupedData).map(([chartType, groupMap], chartIdx) => {
//             const config = chartConfig[chartType];
//             if (!config) return null;

//             return Object.entries(groupMap).map(([groupName, data], groupIdx) => {
//               const Label = `${config.labelPrefix} ${translateKey(groupName)}`;
//               const ChartComponent = config.chartComponent;

//               return (
//                 <div key={`${chartType}-${groupName}`} className="mb-6">
//                   <h2 className="text-lg font-semibold mb-2">{Label}</h2>
//                   <ChartComponent data={data} />
//                 </div>
//               );
//             });
//           })}

//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// }

// // function ChartAccordion({radarData,barGroups}) {
// //   return (
// //         <Accordion alwaysOpen>
// //             <Accordion.Item eventKey={"0"}>
// //               <Accordion.Header>Gráficos</Accordion.Header>
// //               <Accordion.Body>
// //                 {/* Radar Chart */}
// //                 <div className="mb-6">
// //                   <h2 className="text-lg font-semibold mb-2">Radar (Estáticos)</h2>
// //                   <br></br>
// //                   <RadarChart data={radarData} />
// //                   {/* <StaticBarChart data={radarData}/> */}
// //                 </div>

// //                 <div className="mb-6">
// //                   <h2 className="text-lg font-semibold mb-2">Métricas Estáticas</h2>
// //                   <StaticBarChart data={radarData} width={600} height={Math.max(200, radarData.length * 25)} />
// //                 </div>

// //                 {/* Bar Charts */}
// //                 <div>
// //                   <h2 className="text-lg font-semibold mb-2">Barras (Não Estáticos)</h2>
// //                   {Object.entries(barGroups).map(([key, vals]) => (
// //                     <div key={key} className="mb-4">
// //                       <h3 className="font-medium mb-1">{translateKey(key)}</h3>
// //                       <BarChart data={vals} />
// //                     </div>
// //                   ))}
// //                 </div>
                
// //               </Accordion.Body>
// //             </Accordion.Item>
// //         </Accordion>
// //     );
// // }


// export default function ArticulationResult() {
//     const [results, setResults] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/analise/articulacao`);
//                 setResults(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedDate(response.data[0].date); // Define a primeira data como padrão
//                 }
//             } catch (error) {
//                 console.error("Erro ao buscar dados:", error);
//             }
//         };
//         fetchData();
//     }, [id]);
//     // Criar uma lista única de datas sem duplicação
//     const uniqueDates = [...new Set(results.map((res) => res.date))];
//     //const filteredResults = results.filter(res => res.date === selectedDate);
//      // Filtrar resultados com base na data selecionada
//     const filtered = results.filter((res) => res.date === selectedDate);
//     // const filteredResults = results.filter((res) => res.date === selectedDate);

//     // // Agrupa dados estáticos para Radar
//     // function buildRadarData(staticArr) {
//     //     const groups = {};
//     //     staticArr.forEach(obj => {
//     //     Object.entries(obj).forEach(([k, v]) => {
//     //         const prefix = k.replace(/_\d+$/, '');
//     //         const num = parseFloat(v);
//     //         // console.log("va: ",v)
//     //         groups[prefix] = groups[prefix] || [];
//     //         groups[prefix].push(num);
//     //         // console.log(num)
//     //     });
//     //     });
//     //     console.log(Object.entries(groups).map(([axis, vals]) => ({
//     //     axis,
//     //     value: vals.reduce((a, b) => a + b, 0) / vals.length
//     //     })))
//     //     return Object.entries(groups).map(([axis, vals]) => ({
//     //     axis,
//     //     value: vals.reduce((a, b) => a + b, 0) / vals.length
//     //     }));
//     // }
//     // Agrupa dados estáticos para Radar
//     function groupChartData(staticData, config) {
//       const result = {};

//       Object.entries(config).forEach(([chartType, { match }]) => {
//         result[chartType] = {};
//       });

//       staticData.forEach(item => {
//         Object.entries(item).forEach(([key, value]) => {
//           Object.entries(config).forEach(([chartType, { match }]) => {
//             const matchResult = key.match(match);
//             if (matchResult) {
//               const group = matchResult[1]; // o nome comum, ex: "BBEon"
//               if (!result[chartType][group]) result[chartType][group] = [];
//               result[chartType][group].push({ axis: key, value: parseFloat(value) });
//             }
//           });
//         });
//       });

//       return result;
//     }


//     // Agrupa dados não estáticos para Barras
//     function buildBarData(nonStaticArr) {
//         const result = {};
//         nonStaticArr.forEach(obj => {
//         Object.entries(obj).forEach(([k, arr]) => {
//             result[k] = (arr || []).map(x => parseFloat(x));
//         });
//         });
//         return result;
//     }

//     return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="flex-1 p-1">
//         <div className=" container w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//           <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

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
//                 const groupedChartData = groupChartData(item.static_result || [], chartConfig);
//                 const barGroups = buildBarData(item.no_static_result || []);
                
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
//                       <div className="mb-6">
//                         <h2 className="text-lg font-semibold mb-2">Gráficos</h2>
//                         <ChartAccordion groupedData={groupedChartData} barGroups={barGroups} />
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

//     function CreateDataToRadarChart({ data }) {
//         if (!data || Object.keys(data).length === 0) {
//             return <p className="text-center mt-2">Nenhum dado disponível</p>;
//         }

//         const radarData = [];

//         // Itera sobre todas as chaves e valores dentro de static_result
//         Object.entries(data.static_result).forEach(([key, value]) => {
//             if (typeof value === "object" && value !== null) {
//                 const numericValue = Object.values(value)[0]; // Obtém o primeiro valor dentro do objeto

//         radarData.push({
//             variable: key, // Nome da variável
//             value: parseFloat(numericValue) ?? 0 // Converte para número e evita undefined
//         });

//         // console.log("Valor corrigido:", numericValue);
//             }
//         });

//         console.log("Radar Chart Data:", radarData);

//         return radarData;
//     }

// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function ArticulationResult() {
//     const [results, setResults] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/analise/articulacao`);
//                 setResults(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedDate(response.data[0].date); // Define a primeira data como padrão
//                 }
//             } catch (error) {
//                 console.error("Erro ao buscar dados:", error);
//             }
//         };
//         fetchData();
//     }, [id]);

//     // Criar uma lista única de datas sem duplicação
//     const uniqueDates = [...new Set(results.map((res) => res.date))];

//     // Filtrar resultados com base na data selecionada
//     const filteredResults = results.filter((res) => res.date === selectedDate);
// return (
    //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
    //         <div className="flex-1 p-1">
    //             <div className=" w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
    //                 <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

    //                 {/* Dropdown para selecionar a data */}
    //                     <select
    //                         className="mb-4 p-2 border rounded"
    //                         value={selectedDate || ""}
    //                         onChange={(e) => setSelectedDate(e.target.value)}
    //                     >
    //                         {uniqueDates.map((date, index) => (
    //                             <option key={index} value={date}>
    //                                 {date}
    //                             </option>
    //                         ))}
    //                     </select>

    //                 {/* Exibir os dados filtrados */}
    //                 {filteredResults.length > 0 ? (
    //                     <Accordion alwaysOpen>
    //                         {filteredResults.map((item, index) => (
    //                             <Accordion.Item eventKey={index.toString()} key={index}>
    //                                 <Accordion.Header>{`Step ${index + 1}`}</Accordion.Header>
    //                                 <Accordion.Body>
    //                                     {/* Usa a versão recursiva do Accordion para tratar dados aninhados */}
    //                                     <RecursiveAccordion data={item} />
    //                                 </Accordion.Body>
    //                             </Accordion.Item>
    //                         ))}
    //                     </Accordion>
    //                 ) : (
    //                     <p className="text-center mt-5">Nenhum dado disponível para essa data.</p>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
//     return (
//         <div className="container mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

//             {/* Dropdown para selecionar a data */}
//             <select
//                 className="mb-4 p-2 border rounded"
//                 value={selectedDate || ""}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//             >
//                 {uniqueDates.map((date, index) => (
//                     <option key={index} value={date}>
//                         {date}
//                     </option>
//                 ))}
//             </select>

//             {/* Exibir os dados filtrados */}
//             {filteredResults.length > 0 ? (
//                 <Accordion alwaysOpen>
//                     {filteredResults.map((item, index) => (
//                         <Accordion.Item eventKey={index.toString()} key={index}>
//                             <Accordion.Header>{`Step: ${item.step}`}</Accordion.Header>
//                             <Accordion.Body>
//                                 {/* Accordion interno para detalhar os dados */}
//                                 <Accordion alwaysOpen>
//                                     {Object.entries(item).map(([key, value], subIndex) => {
//                                         if (key !== "_id" && key !== "date" && key !== "step") { // Ignorar _id, date e step
//                                             return (
//                                                 <Accordion.Item eventKey={subIndex.toString()} key={subIndex}>
//                                                     <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header>
//                                                     <Accordion.Body>
//                                                         {typeof value === "object" && value !== null
//                                                             ? JSON.stringify(value, null, 2)
//                                                             : value.toString()}
//                                                     </Accordion.Body>
//                                                 </Accordion.Item>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                 </Accordion>
//                             </Accordion.Body>
//                         </Accordion.Item>
//                     ))}
//                 </Accordion>
//             ) : (
//                 <p className="text-center mt-5">Nenhum dado disponível para essa data.</p>
//             )}
//         </div>
//     );
// }
