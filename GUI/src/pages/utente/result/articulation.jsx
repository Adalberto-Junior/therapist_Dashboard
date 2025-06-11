import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadarChart, BarChart, StaticBarChart } from "../../../component/chart.jsx";
import {chartConfig} from "./chartConfiguraction/chartConfig.jsx";
import {groupChartData} from "./chartConfiguraction/groupChartData.jsx";
import {ChartAccordion} from "./chartConfiguraction/ChartAccordion.jsx";
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


// Componente Principal
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="flex-1 p-1">
        <div className=" container w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
          {/* <div className=" container w-full max-w-xl text-gray-900 bg-white  dark:bg-zinc-800  dark:text-white shadow-md rounded-lg p-6"> */}
          <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

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
                // const groupedChartData = groupChartData(item.static_result || [], chartConfig);
                // const barGroups = buildBarData(item.no_static_result || []);
                // const radarGroups = groupAvgRadarData(item.static_result || []);
                  const staticResult = item.static_result || [];
                  const nonStaticResult = item.no_static_result || [];

                  // const radarAndBars = groupChartData([...staticResult, ...nonStaticResult], chartConfig);
                  const groupedData = groupChartData(item.static_result || [], item.no_static_result || [], chartConfig);
                  return (
                  <Accordion.Item eventKey={idx.toString()} key={idx}>
                    <Accordion.Header>{`Step ${idx + 1}`}</Accordion.Header>
                    <Accordion.Body>

                      {/* Accordion Recursivo de Dados */}
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Números</h2>
                        <RecursiveAccordion data={item} />
                      </div>

                      {/* Accordion de Gráficos */}
                      {/* <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Gráficos</h2>
                        <ChartAccordion groupedData={groupedChartData} barGroups={barGroups} />
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
