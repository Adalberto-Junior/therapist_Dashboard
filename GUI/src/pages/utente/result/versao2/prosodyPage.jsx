// import React, { useEffect, useState } from "react";
// import api from "../../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { RadarChart, BarChart, StaticBarChart } from "../../../../component/chart.jsx";
// import {chartConfig} from "../chartConfiguraction/chartConfig.jsx";
// import {groupF0ToBoxplot, groupFeatureToBoxplot,groupDataToIntensityplot} from "../chartConfiguraction/groupChartData.jsx";
// import {ChartAccordion, DisplayChart, RenderF0LineChart} from "../chartConfiguraction/ChartAccordion.jsx";
// import { RecursiveAccordion } from "../chartConfiguraction/RecursiveAccordion.jsx";

// const BACKEND_URL = "http://localhost:5000";

// export default function ProsodyResultPage() {
//     const { id } = useParams();
//     const [results, setResults] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     // const [selectedDates, setSelectedDates] = useState([]);
//     // const [compareMode, setCompareMode] = useState(false);
//     // const [unifiedGraphData, setUnifiedGraphData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // const uniqueDates = [...new Set(results.map(res => res.date))];
//     // const filtered = compareMode
//     //     ? results.filter(res => selectedDates.includes(res.date))
//     //     : results.filter(res => res.date === selectedDate);

//     // const data = compareMode
//     // ? (unifiedGraphData
//     //     ? unifiedGraphData
//     //     : mergeF1F2DataToCompare(filtered))
//     // : groupF1F2DataToSpAcustic(filtered);

//     const uniqueDates = [...new Set(results.map((res) => res.date))];
//     const filtered = results.filter((res) => res.date === selectedDate);

//     console.log(filtered)

//     const data = groupF0ToBoxplot(filtered);
//     const pauseDurations = groupFeatureToBoxplot(filtered,"pausedurations");
//     const intensityData = groupDataToIntensityplot(filtered);

//     console.log("f0data: ", data);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/analise/prosodia`);
//                 setResults(response.data);
//                 if (response.data.length > 0) {
//                 setSelectedDate(response.data[response.data.length - 1].date);
//                 }
//             } catch (error) {
//                 console.error("Erro ao buscar dados:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id]);

//     // const handleCompareUnifiedGraph = () => {
//     //     const unified = mergeF1F2DataToCompareUnifiedGraph(filtered);
//     //     setUnifiedGraphData(unified);
//     // };

//     const handleDelete = async () => {
//         const typeOfProcessing = filtered.find(item => item.date === selectedDate)?.processing_type;
//         if (!typeOfProcessing) return;
//             const selectedDate_ = selectedDate;
//         try {
//             if (!window.confirm(`Tem certeza que deseja eliminar todos os resultados desta data: ${selectedDate_}?`)) return;

//             await api.delete(`/utente/${id}/analise/${typeOfProcessing}/${selectedDate}`);
//             setResults((prevResults) => prevResults.filter((res) => res.date !== selectedDate));
//             if (filtered.length === 0) {
//                 setSelectedDate(null);
//             }
//             alert(`Resultados da data ${selectedDate_} eliminado com sucesso!`);
//             window.location.reload();
//         } catch (error) {
//             console.error("Erro ao deletar dados:", error);
//             alert("Erro ao eliminar os resultados. Tente novamente.");
//         }
//     };

//     const renderDateSelector = () => {
//         // return compareMode ? (
//         // <>
//         //     <select
//         //     multiple
//         //     value={selectedDates}
//         //     onChange={(e) => setSelectedDates([...e.target.selectedOptions].map(o => o.value))}
//         //     className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 h-48 overflow-auto"
//         //     >
//         //     {uniqueDates.map(date => (
//         //         <option key={date} value={date}>{date}</option>
//         //     ))}
//         //     </select>

//         //     <div className="flex flex-wrap gap-2 mb-4">
//         //     {uniqueDates.length > 1 && (
//         //         <button
//         //         onClick={() => setSelectedDates(uniqueDates)}
//         //         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//         //         >
//         //         Selecionar todas
//         //         </button>
//         //     )}

//         //     {selectedDates.length > 0 && (
//         //         <>
//         //         <button
//         //             onClick={() => setSelectedDates([])}
//         //             className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
//         //         >
//         //             Limpar seleção
//         //         </button>

//         //         <button
//         //             onClick={handleCompareUnifiedGraph}
//         //             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//         //         >
//         //             Comparar num só gráfico
//         //         </button>
//         //         </>
//         //     )}
//         //     </div>
//         // </>
//         // ) : (
//         // <select
//         //     value={selectedDate || ""}
//         //     onChange={(e) => setSelectedDate(e.target.value)}
//         //     className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//         // >
//         //     <option value="">Selecione uma data</option>
//         //     {uniqueDates.map(date => (
//         //     <option key={date} value={date}>{date}</option>
//         //     ))}
//         // </select>
//         // );

//         return (
//             <select
//                 value={selectedDate || ""}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//             >
//                 <option value="">Selecione uma data</option>
//                 {uniqueDates.map(date => (
//                 <option key={date} value={date}>{date}</option>
//                 ))}
//             </select>
//         );
//     };

//     const renderChartImages = () => {
//         return filtered.map((item, idx) => {
//         const imagens = item.pathToChart?.slice(0, 4).map(img => `${BACKEND_URL}${img}`) || [];

//         return (
//             <div key={idx} className="mb-6">
//             <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//             {imagens.length === 0 ? (
//                 <p className="text-red-500">Imagens não encontradas para este passo.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//                 {imagens.map((src, i) => (
//                     <img
//                     key={i}
//                     src={src}
//                     alt={`Gráfico ${i + 1} do Passo ${item.step}`}
//                     className="w-full h-auto rounded border shadow-sm dark:border-zinc-600"
//                     onError={(e) => e.target.style.display = "none"}
//                     />
//                 ))}
//                 </div>
//             )}
//             </div>
//         );
//         });
//     };

//     const renderExerciseAudio = () => {
//         return filtered.map((item, idx) => {
//         const audio = item.pathToRecord || "";
//         return (
//             <div key={idx} className="mb-6">
//             <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//             {audio === "" ? (
//                 <p className="text-red-500">Áudio não encontrado para este passo.</p>
//             ) : (
//                 <audio
//                 controls
//                 src={`${BACKEND_URL}${audio}`}
//                 className="w-full"
//                 >
//                 Seu navegador não suporta o elemento de áudio.
//                 </audio>
//             )}
//             </div>
//         );
//         });
//     };

    


//     if (loading) {
//         return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             <p className="text-2xl font-semibold text-center dark:text-white mb-6">Carregando...</p>
//         </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
//         <div className="flex-1 p-1">
//             <div className="text-4xl font-bold text-center mb-1 p-3 text-gray-900 dark:text-white">Resultados de Prosódia</div>
//             {/* <div className="flex items-center gap-4 mb-3">
//                 <span className="text-lg dark:text-white">Modo de Comparação</span>

//                 <label className="inline-flex items-center cursor-pointer">
//                     <input
//                     type="checkbox"
//                     checked={compareMode}
//                     onChange={() => {
//                         setCompareMode(!compareMode);
//                         setSelectedDates([]);
//                         setUnifiedGraphData(null);
//                     }}
//                     className="sr-only peer"
//                     />

                    
//                     <div className={`relative w-11 h-6 rounded-full transition-colors duration-300
//                     ${compareMode ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-zinc-700'} 
//                     peer-focus:outline-none`}>
                    
                    
//                     <div className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full border 
//                         transition-transform duration-300
//                         ${compareMode ? 'translate-x-full bg-white border-white' : 'bg-white border-gray-300'}`}>
//                     </div>
//                     </div>
//                 </label>

                
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                     {compareMode ? '🟢 Ativo' : '⚪ Desativado'}
//                 </span>
//             </div> */}


//             {renderDateSelector()}

//             {error && (
//             <p className="text-red-500 text-center mb-4">Erro: {error.message}</p>
//             )}

//             <div className="mb-4">
//             {filtered.length > 0 ? (
//                 <div className="bg-white dark:bg-zinc-800 rounded-lg p-6">
//                 <h2 className="text-xl font-semibold mb-4 dark:text-white">F0 ao longo do tempo</h2>
//                 {/* <DisplayChart groupedData={data} /> */}
//                 <RenderF0LineChart data={data} idx={1} />
//                 <h2 className="text-xl font-semibold mb-3 p-3 dark:text-white">Intensidade</h2>
//                 <DisplayChart groupedData={intensityData} />
//                 <h2 className="text-xl font-semibold mb-3 p-3 dark:text-white">Duração de pausa</h2>
//                 <DisplayChart groupedData={pauseDurations} />
//                 <h2 className="text-xl font-semibold mb-3 p-3 dark:text-white">
//                 Métricas de Velocidade e Fluência da Fala
//                 </h2>

//                 <table className="min-w-9/12 mx-auto border-collapse border border-gray-400 dark:border-zinc-500 shadow-md rounded-lg overflow-hidden">
//                 <thead>
//                     <tr className="bg-green-300 dark:bg-gray-600 sticky top-0 z-10">
//                     {/* <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Passo</th> */}
//                     {/* <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Categoria</th> */}
//                     <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-left">Métrica</th>
//                     <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-center">Valor</th>
//                     <th className="border border-gray-400 dark:border-zinc-500 px-4 py-2 text-center">Unidade</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {filtered.map((data) => {
//                     const speechRateResults = data.no_static_result?.filter(item => item.SpeechRate) || [];

//                     if (speechRateResults.length === 0) return null; // nenhum SpeechRate neste passo

//                     return (
//                         <React.Fragment key={data.step}>
//                         {/* Linha de cabeçalho do passo */}
//                         <tr className="bg-green-200 dark:bg-green-600 font-semibold">
//                             <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2" colSpan={5}>
//                             Passo: {data.step.replace(/_/g, " ")}
//                             </td>
//                         </tr>

//                         {speechRateResults.map((result, rIdx) => {
//                             const metrics = result.SpeechRate;

//                             return Object.entries(metrics)
//                             .filter(([_, value]) => !Array.isArray(value)) // remove listas
//                             .map(([metric, value], idx) => {
//                                 const unitMatch = metric.match(/\((.*?)\)/);
//                                 const unit = unitMatch ? unitMatch[1] : "";

//                                 const toTitleCase = (str) => {
//                                     return str
//                                         .toLowerCase()
//                                         .replace(/\b\p{L}/gu, (l) => l.toUpperCase())
//                                         .trim();
//                                 };

//                                 const cleanedName = toTitleCase(metric.replace(/\(.*?\)/g, "").replace(/_/g, " "));

//                                 // let category = "";
//                                 // if (["Duração Total", "Tempo Falado", "Nº Pausas", "Duração Média Pausa", "Pausa Min"].includes(cleanedName)) {
//                                 //   category = "Duração";
//                                 // } else if (["Sps Total", "Sps Articulação"].includes(cleanedName)) {
//                                 //   category = "Ritmo / Fluência";
//                                 // } else if (["Sílabas"].includes(cleanedName)) {
//                                 //   category = "Sílabas";
//                                 // } else if (["Intensidade Min", "Pitch Min"].includes(cleanedName)) {
//                                 //   category = "Intensidade / Pitch";
//                                 // } else {
//                                 //   category = "Outros";
//                                 // }

//                                 return (
//                                 <tr key={`${data.step}-${rIdx}-${idx}`} className="odd:bg-gray-100 odd:dark:bg-gray-500">
//                                     {/* <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2"></td> */}
//                                     {/* <td className="border border-gray-400 dark:border-zinc-500 px-4 py-2">{category}</td> */}
//                                     <td className="border border-gray-300 dark:border-zinc-400 px-4 py-2">{cleanedName}</td>
//                                     <td className="border border-gray-300 dark:border-zinc-400 px-4 py-2 text-center">{value}</td>
//                                     <td className="border border-gray-300 dark:border-zinc-400 px-4 py-2 text-center">{unit}</td>
//                                 </tr>
//                                 );
//                             });
//                         })}
//                         </React.Fragment>
//                     );
//                     })}
//                 </tbody>
//                 </table>




            
//                 <Accordion defaultActiveKey="x" className="mt-6">
//                 <Accordion.Item eventKey="0">
//                     <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
//                     <Accordion.Body>{renderChartImages()}</Accordion.Body>
//                 </Accordion.Item>
//                 </Accordion>

//                 <Accordion defaultActiveKey="x" className="mt-6">
//                 <Accordion.Item eventKey="0">
//                     <Accordion.Header>Áudios dos exercícios</Accordion.Header>
//                     <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
//                 </Accordion.Item>
//                 </Accordion>
                

//                 {/* {!compareMode && (
//                     <>
//                     <Accordion defaultActiveKey="x" className="mt-6">
//                     <Accordion.Item eventKey="0">
//                         <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
//                         <Accordion.Body>{renderChartImages()}</Accordion.Body>
//                     </Accordion.Item>
//                     </Accordion>

//                     <Accordion defaultActiveKey="x" className="mt-6">
//                     <Accordion.Item eventKey="0">
//                         <Accordion.Header>Áudios dos exercícios</Accordion.Header>
//                         <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
//                     </Accordion.Item>
//                     </Accordion>
//                     </>
//                 )} */}
//                 <div className="w-full mt-8 flex justify-center">
//                 <button
//                     className="mb-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
//                     onClick={() => handleDelete()}
//                 >
//                     Eliminar Todos os Resultados
//                 </button>
//                 </div>
//                 </div>
                
//             ) : (
//                 <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-9">
//                 <p className="text-center mt-5 text-3xl dark:text-white">
//                     Nenhum resultado disponível para essa data.
//                 </p>
//                 </div>
//             )}
//             </div>
//         </div>
//         </div>
//     );
//     }


// import React, { useEffect, useState } from "react";
// import api from "../../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { RenderF0LineChart, DisplayChart } from "../chartConfiguraction/ChartAccordion.jsx";
// import { groupF0ToBoxplot, groupFeatureToBoxplot, groupDataToIntensityplot } from "../chartConfiguraction/groupChartData.jsx";

// const BACKEND_URL = "http://localhost:5000";

// export default function ProsodyResultPage() {
//   const { id } = useParams();
//   const [results, setResults] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const uniqueDates = [...new Set(results.map(res => res.date))];
//   const filtered = results.filter(res => res.date === selectedDate);

//   const data = groupF0ToBoxplot(filtered);
//   const pauseDurations = groupFeatureToBoxplot(filtered, "pausedurations");
//   const intensityData = groupDataToIntensityplot(filtered);

//   useEffect(() => {
//     async function fetchResults() {
//       try {
//         const response = await api.get(`/utente/${id}/analise/prosodia`);
//         setResults(response.data);
//         if (response.data.length > 0) {
//           setSelectedDate(response.data[response.data.length - 1].date);
//         }
//       } catch (err) {
//         setError("Erro ao carregar resultados de prosódia.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchResults();
//   }, [id]);

//   async function handleDelete() {
//     const typeOfProcessing = filtered.find(item => item.date === selectedDate)?.processing_type;
//     if (!typeOfProcessing) return;

//     if (!window.confirm(`Tem certeza que deseja eliminar os resultados de ${selectedDate}?`)) return;

//     try {
//       await api.delete(`/utente/${id}/analise/${typeOfProcessing}/${selectedDate}`);
//       setResults(prev => prev.filter(res => res.date !== selectedDate));
//       setSelectedDate(prev => (uniqueDates.length > 1 ? uniqueDates[uniqueDates.length - 2] : null));
//       alert(`Resultados da data ${selectedDate} eliminados com sucesso!`);
//     } catch (err) {
//       alert("Erro ao eliminar os resultados. Tente novamente.");
//       console.error(err);
//     }
//   }

//   function renderDateSelector() {
//     return (
//       <select
//         value={selectedDate || ""}
//         onChange={e => setSelectedDate(e.target.value)}
//         className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//       >
//         <option value="">Selecione uma data</option>
//         {uniqueDates.map(date => (
//           <option key={date} value={date}>{date}</option>
//         ))}
//       </select>
//     );
//   }

//   function renderChartImages() {
//     return filtered.map((item, idx) => {
//       const imagens = item.pathToChart?.slice(0, 4).map(img => `${BACKEND_URL}${img}`) || [];
//       return (
//         <div key={`charts-${idx}`} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {imagens.length === 0 ? (
//             <p className="text-red-500">Imagens não encontradas para este passo.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {imagens.map((src, i) => (
//                 <img
//                   key={`img-${idx}-${i}`}
//                   src={src}
//                   alt={`Gráfico ${i + 1} - Passo ${item.step}`}
//                   className="w-full h-auto rounded border shadow-sm dark:border-zinc-600"
//                   onError={e => e.target.style.display = "none"}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     });
//   }

//   function renderExerciseAudio() {
//     return filtered.map((item, idx) => {
//       const audio = item.pathToRecord || "";
//       return (
//         <div key={`audio-${idx}`} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {audio === "" ? (
//             <p className="text-red-500">Áudio não encontrado para este passo.</p>
//           ) : (
//             <audio controls src={`${BACKEND_URL}${audio}`} className="w-full">
//               Seu navegador não suporta o elemento de áudio.
//             </audio>
//           )}
//         </div>
//       );
//     });
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//         <p className="text-2xl font-semibold text-center dark:text-white animate-pulse">
//           Carregando...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="flex-1 p-1">
//         <h1 className="text-4xl font-bold text-center mb-4 p-3 text-gray-900 dark:text-white">
//           Resultados de Prosódia
//         </h1>

//         {renderDateSelector()}

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <div className="mb-4">
//           {filtered.length > 0 ? (
//             <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg">
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">F0 ao longo do tempo</h2>
//               <RenderF0LineChart data={data} idx={1} />

//               <h2 className="text-xl font-semibold mt-6 mb-3 dark:text-white">Intensidade</h2>
//               <DisplayChart groupedData={intensityData} />

//               <h2 className="text-xl font-semibold mt-6 mb-3 dark:text-white">Duração de pausa</h2>
//               <DisplayChart groupedData={pauseDurations} />

//               <Accordion alwaysOpen className="mt-6">
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
//                   <Accordion.Body>{renderChartImages()}</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>

//               <Accordion alwaysOpen className="mt-6">
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>Áudios dos exercícios</Accordion.Header>
//                   <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>

//               <div className="w-full mt-8 flex justify-center">
//                 <button
//                   className="mb-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
//                   onClick={handleDelete}
//                 >
//                   Eliminar Todos os Resultados
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-9 text-center">
//               <p className="text-2xl dark:text-white">
//                 Nenhum resultado disponível para essa data.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

import { RenderF0LineChart, DisplayChart } from "../chartConfiguraction/ChartAccordion.jsx";
import {
  groupF0ToBoxplot,
  groupFeatureToBoxplot,
  groupDataToIntensityplot,
} from "../chartConfiguraction/groupChartData.jsx";

const BACKEND_URL = "http://localhost:5000";

export default function ProsodyResultPage() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** 🔎 Buscar resultados da API */
  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await api.get(`/utente/${id}/analise/prosodia`);
        const data = Array.isArray(response.data) ? response.data : [];
        setResults(data);
        if (data.length > 0) {
          setSelectedDate(data[data.length - 1].date);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar resultados de prosódia.");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [id]);

  /** 🗓️ Datas únicas */
  const uniqueDates = useMemo(() => [...new Set(results.map((r) => r.date))], [results]);

  /** 🔢 Resultados filtrados */
  const filtered = useMemo(
    () => results.filter((res) => res.date === selectedDate),
    [results, selectedDate]
  );

  /** 📊 Dados dos gráficos */
  const f0Data = useMemo(() => groupF0ToBoxplot(filtered), [filtered]);
  const pauseDurations = useMemo(
    () => groupFeatureToBoxplot(filtered, "pausedurations"),
    [filtered]
  );
  const intensityData = useMemo(() => groupDataToIntensityplot(filtered), [filtered]);

  /** 🗑️ Eliminar resultados */
  const handleDelete = async () => {
    const typeOfProcessing = filtered.find((item) => item.date === selectedDate)?.processing_type;
    if (!typeOfProcessing) return;
    if (!window.confirm(`Tem certeza que deseja eliminar os resultados de ${selectedDate}?`)) return;

    try {
      await api.delete(`/utente/${id}/analise/${typeOfProcessing}/${selectedDate}`);
      setResults((prev) => prev.filter((res) => res.date !== selectedDate));
      setSelectedDate(uniqueDates.length > 1 ? uniqueDates[uniqueDates.length - 2] : "");
      alert(`Resultados de ${selectedDate} eliminados com sucesso!`);
    } catch (err) {
      console.error(err);
      alert("Erro ao eliminar os resultados. Tente novamente.");
    }
  };

  /** 🎛️ Selector de datas */
  const renderDateSelector = () => (
    <select
      value={selectedDate || ""}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
    >
      <option value="">Selecione uma data</option>
      {uniqueDates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );

  /** 🖼️ Renderização de imagens */
  const renderChartImages = () =>
    filtered.map((item) => {
      const imagens = item.pathToChart?.slice(0, 4) || [];
      return (
        <div key={`charts-${item.step}`} className="mb-6">
          <h4 className="font-semibold mb-2 dark:text-white">Passo {item.step}</h4>
          {imagens.length === 0 ? (
            <p className="text-red-500">Imagens não encontradas para este passo.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imagens.map((img, i) => (
                <img
                  key={`img-${item.step}-${i}`}
                  src={`${BACKEND_URL}${img}`}
                  alt={`Gráfico ${i + 1} - Passo ${item.step}`}
                  className="w-full h-auto rounded-xl shadow border dark:border-zinc-600"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ))}
            </div>
          )}
        </div>
      );
    });

  /** 🔊 Renderização de áudio */
  const renderExerciseAudio = () =>
    filtered.map((item) => (
      <div key={`audio-${item.step}`} className="mb-6">
        <h4 className="font-semibold mb-2 dark:text-white">Passo {item.step}</h4>
        {item.pathToRecord ? (
          <audio controls src={`${BACKEND_URL}${item.pathToRecord}`} className="w-full" />
        ) : (
          <p className="text-red-500">Áudio não encontrado para este passo.</p>
        )}
      </div>
    ));



const SpeechRateMetrics = ({ filtered }) => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold text-center dark:text-white">
          Métricas de Velocidade e Fluência da Fala
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-green-300 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-zinc-600">
                Métrica
              </th>
              <th className="px-4 py-2 text-center border-b border-gray-300 dark:border-zinc-600">
                Valor
              </th>
              <th className="px-4 py-2 text-center border-b border-gray-300 dark:border-zinc-600">
                Unidade
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((data) => {
              const speechRateResults =
                data.no_static_result?.filter((item) => item.SpeechRate) || [];

              if (speechRateResults.length === 0) return null;

              return (
                <React.Fragment key={data.step}>
                  {/* Cabeçalho de cada passo */}
                  <tr className="bg-green-200 dark:bg-green-600 font-semibold">
                    <td
                      className="px-4 py-2 border-y border-gray-300 dark:border-zinc-600"
                      colSpan={3}
                    >
                      Passo: {data.step.replace(/_/g, " ")}
                    </td>
                  </tr>

                  {speechRateResults.map((result, rIdx) => {
                    const metrics = result.SpeechRate;

                    return Object.entries(metrics)
                      .filter(([_, value]) => !Array.isArray(value))
                      .map(([metric, value], idx) => {
                        const unitMatch = metric.match(/\((.*?)\)/);
                        const unit = unitMatch ? unitMatch[1] : "";

                        const toTitleCase = (str) =>
                          str
                            .toLowerCase()
                            .replace(/\b\p{L}/gu, (l) => l.toUpperCase())
                            .trim();

                        const cleanedName = toTitleCase(
                          metric.replace(/\(.*?\)/g, "").replace(/_/g, " ")
                        );

                        return (
                          <tr
                            key={`${data.step}-${rIdx}-${idx}`}
                            className="odd:bg-gray-50 odd:dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <td className="px-4 py-2 border-b border-gray-200 dark:border-zinc-700">
                              {cleanedName}
                            </td>
                            <td className="px-4 py-2 text-center border-b border-gray-200 dark:border-zinc-700">
                              {value}
                            </td>
                            <td className="px-4 py-2 text-center border-b border-gray-200 dark:border-zinc-700">
                              {unit}
                            </td>
                          </tr>
                        );
                      });
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Carregando resultados...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        Resultados de Prosódia
      </h1>

      <Card className="p-4 mb-6 shadow-md">{renderDateSelector()}</Card>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {filtered.length > 0 ? (
        <Card className="p-6 shadow-md">
          <CardContent>
            {/* F0 ao longo do tempo */}
            <h2 className="text-xl font-semibold mb-4 dark:text-white">F0 ao longo do tempo</h2>
            <RenderF0LineChart data={f0Data} idx={1} />

            {/* Intensidade */}
            {/* <h2 className="text-xl font-semibold mt-6 mb-3 dark:text-white">Intensidade</h2> */}
            <DisplayChart groupedData={intensityData} />

            {/* Duração de pausa */}
            <h2 className="text-xl font-semibold mt-6 mb-3 dark:text-white">Duração de pausa</h2>
            <DisplayChart groupedData={pauseDurations} />

            {/* Tabela de métricas */}
            <SpeechRateMetrics filtered={filtered} />


            <Accordion defaultActiveKey="x" className="mb-6 mt-6">
              <Accordion.Item eventKey="0">
                <Accordion.Header>📊 Gráficos Extraídos do Sistema</Accordion.Header>
                <Accordion.Body>{renderChartImages()}</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>🎧 Áudios dos Exercícios</Accordion.Header>
                <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="mt-6 flex justify-center">
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 rounded"
                onClick={handleDelete}
              >
                Eliminar Todos os Resultados
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
          Nenhum resultado disponível para essa data.
        </div>
      )}
    </div>
  );
}
