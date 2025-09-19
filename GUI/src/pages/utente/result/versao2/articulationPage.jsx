// import React, { useEffect, useState } from "react";
// import api from "../../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { RadarChart, BarChart, StaticBarChart } from "../../../../component/chart.jsx";
// import {chartConfig} from "../chartConfiguraction/chartConfig.jsx";
// import {groupF1F2DataToSpAcustic,mergeF1F2DataToCompare,mergeF1F2DataToCompareUnifiedGraph} from "../chartConfiguraction/groupChartData.jsx";
// import {ChartAccordion, DisplayChart} from "../chartConfiguraction/ChartAccordion.jsx";
// import { RecursiveAccordion } from "../chartConfiguraction/RecursiveAccordion.jsx";

// const BACKEND_URL = "http://localhost:5000";

// export default function ArticulationResultPage() {
//   const { id } = useParams();
//   const [results, setResults] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [compareMode, setCompareMode] = useState(false);
//   const [unifiedGraphData, setUnifiedGraphData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const uniqueDates = [...new Set(results.map(res => res.date))];
//   const filtered = compareMode
//     ? results.filter(res => selectedDates.includes(res.date))
//     : results.filter(res => res.date === selectedDate);

//   const data = compareMode
//   ? (unifiedGraphData
//       ? unifiedGraphData
//       : mergeF1F2DataToCompare(filtered))
//   : groupF1F2DataToSpAcustic(filtered);

//   console.log(filtered)
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await api.get(`/utente/${id}/analise/articulacao`);
//         setResults(res.data);
//         if (res.data.length) {
//           setSelectedDate(res.data[res.data.length - 1].date);
//         }
//       } catch (err) {
//         setError(err);
//         console.error("Erro ao buscar dados:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, [id]);

//   const handleCompareUnifiedGraph = () => {
//     const unified = mergeF1F2DataToCompareUnifiedGraph(filtered);
//     setUnifiedGraphData(unified);
//   };

//   const handleCompareDistintGraph = () => {
//       const unified = mergeF1F2DataToCompare(filtered);
//   };

//   const handleDelete = async () => {
//     const type = filtered.find(item => item.date === selectedDate)?.processing_type;
//     if (!type) return;

//     const confirm = window.confirm(`Tem certeza que deseja eliminar os resultados de ${selectedDate}?`);
//     if (!confirm) return;

//     try {
//       await api.delete(`/utente/${id}/analise/${type}/${selectedDate}`);
//       setResults(prev => prev.filter(res => res.date !== selectedDate));
//       setSelectedDate(null);
//       alert("Resultados eliminados com sucesso!");
//       window.location.reload();
//     } catch (err) {
//       console.error("Erro ao deletar dados:", err);
//       alert("Erro ao eliminar. Tente novamente.");
//     }
//   };

//   const renderDateSelector = () => {
//     return compareMode ? (
//       <>
//         <select
//           multiple
//           value={selectedDates}
//           onChange={(e) => setSelectedDates([...e.target.selectedOptions].map(o => o.value))}
//           className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 h-48 overflow-auto"
//         >
//           {uniqueDates.map(date => (
//             <option key={date} value={date}>{date}</option>
//           ))}
//         </select>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {uniqueDates.length > 1 && (
//             <button
//               onClick={() => setSelectedDates(uniqueDates)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//             >
//               Selecionar todas
//             </button>
//           )}

//           {selectedDates.length > 0 && (
//             <>
//               <button
//                 onClick={() => setSelectedDates([])}
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Limpar seleção
//               </button>

//               <button
//                 onClick={handleCompareUnifiedGraph}
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Comparar num só gráfico
//               </button>
//             </>
//           )}
//         </div>
//       </>
//     ) : (
//       <select
//         value={selectedDate || ""}
//         onChange={(e) => setSelectedDate(e.target.value)}
//         className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//       >
//         <option value="">Selecione uma data</option>
//         {uniqueDates.map(date => (
//           <option key={date} value={date}>{date}</option>
//         ))}
//       </select>
//     );
//   };

//   const renderChartImages = () => {
//     return filtered.map((item, idx) => {
//       const imagens = item.pathToChart?.slice(0, 4).map(img => `${BACKEND_URL}${img}`) || [];

//       return (
//         <div key={idx} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {imagens.length === 0 ? (
//             <p className="text-red-500">Imagens não encontradas para este passo.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//               {imagens.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Gráfico ${i + 1} do Passo ${item.step}`}
//                   className="w-full h-auto rounded border shadow-sm dark:border-zinc-600"
//                   onError={(e) => e.target.style.display = "none"}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     });
//   };

//   const renderExerciseAudio = () => {
//     return filtered.map((item, idx) => {
//       const audio = item.pathToRecord || "";
//       return (
//         <div key={idx} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {audio === "" ? (
//             <p className="text-red-500">Áudio não encontrado para este passo.</p>
//           ) : (
//             <audio
//               controls
//               src={`${BACKEND_URL}${audio}`}
//               className="w-full"
//             >
//               Seu navegador não suporta o elemento de áudio.
//             </audio>
//           )}
//         </div>
//       );
//     });
//   };

  


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//         <p className="text-2xl font-semibold text-center dark:text-white mb-6">Carregando...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="flex-1 p-1">
//         <div className="text-4xl font-bold text-center mb-1 p-3 text-gray-900 dark:text-white">Resultados de Articulação</div>
//         <div className="flex items-center gap-4 mb-3">
//             <span className="text-lg dark:text-white">Modo de Comparação</span>

//             <label className="inline-flex items-center cursor-pointer">
//                 <input
//                 type="checkbox"
//                 checked={compareMode}
//                 onChange={() => {
//                     setCompareMode(!compareMode);
//                     setSelectedDates([]);
//                     setUnifiedGraphData(null);
//                 }}
//                 className="sr-only peer"
//                 />

//                 {/* Interruptor visual */}
//                 <div className={`relative w-11 h-6 rounded-full transition-colors duration-300
//                 ${compareMode ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-zinc-700'} 
//                 peer-focus:outline-none`}>
                
//                 {/* Bola deslizante */}
//                 <div className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full border 
//                     transition-transform duration-300
//                     ${compareMode ? 'translate-x-full bg-white border-white' : 'bg-white border-gray-300'}`}>
//                 </div>
//                 </div>
//             </label>

//             {/* Indicador textual */}
//             <span className="text-sm text-gray-700 dark:text-gray-300">
//                 {compareMode ? '🟢 Ativo' : '⚪ Desativado'}
//             </span>
//         </div>


//         {renderDateSelector()}

//         {error && (
//           <p className="text-red-500 text-center mb-4">Erro: {error.message}</p>
//         )}

//         <div className="mb-4">
//           {filtered.length > 0 ? (
//             <div className="bg-white dark:bg-zinc-800 rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">Espaço Acústico</h2>
//               <DisplayChart groupedData={data} />

//               {!compareMode && (
//                 <>
//                 <Accordion defaultActiveKey="x" className="mt-6">
//                   <Accordion.Item eventKey="0">
//                     <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
//                     <Accordion.Body>{renderChartImages()}</Accordion.Body>
//                   </Accordion.Item>
//                 </Accordion>

//                 <Accordion defaultActiveKey="x" className="mt-6">
//                   <Accordion.Item eventKey="0">
//                     <Accordion.Header>Áudios dos exercícios</Accordion.Header>
//                     <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
//                   </Accordion.Item>
//                 </Accordion>
//                 </>
//               )}
//               <div className="w-full mt-8 flex justify-center">
//               <button
//                 className="mb-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
//                 onClick={() => handleDelete()}
//               >
//                 Eliminar Todos os Resultados
//               </button>
//             </div>
//             </div>
            
//           ) : (
//             <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-9">
//               <p className="text-center mt-5 text-3xl dark:text-white">
//                 Nenhum resultado disponível para essa data.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../../../api";
// import Accordion from "react-bootstrap/Accordion";
// import "bootstrap/dist/css/bootstrap.min.css";

// import {
//   groupF1F2DataToSpAcustic,
//   mergeF1F2DataToCompare,
//   mergeF1F2DataToCompareUnifiedGraph,
// } from "../chartConfiguraction/groupChartData.jsx";
// import { DisplayChart } from "../chartConfiguraction/ChartAccordion.jsx";

// const BACKEND_URL = "http://localhost:5000";

// export default function ArticulationResultPage() {
//   const { id } = useParams();
//   const [results, setResults] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [compareMode, setCompareMode] = useState(false);
//   const [unifiedGraphData, setUnifiedGraphData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /** 🔎 Buscar resultados na API */
//   useEffect(() => {
//     async function fetchResults() {
//       try {
//         const res = await api.get(`/utente/${id}/analise/articulacao`);
//         const data = Array.isArray(res.data) ? res.data : [];
//         setResults(data);
//         if (data.length > 0) {
//           setSelectedDate(data[data.length - 1].date);
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchResults();
//   }, [id]);

//   /** 🗓️ Datas únicas */
//   const uniqueDates = useMemo(() => [...new Set(results.map((r) => r.date))], [results]);

//   /** 🔢 Resultados filtrados */
//   const filtered = useMemo(() => {
//     return compareMode
//       ? results.filter((res) => selectedDates.includes(res.date))
//       : results.filter((res) => res.date === selectedDate);
//   }, [results, compareMode, selectedDate, selectedDates]);

//   /** 📊 Dados do gráfico */
//   const chartData = useMemo(() => {
//     return compareMode
//       ? unifiedGraphData ?? mergeF1F2DataToCompare(filtered)
//       : groupF1F2DataToSpAcustic(filtered);
//   }, [compareMode, filtered, unifiedGraphData]);

//   /** 🗑️ Eliminar resultados */
//   const handleDelete = async () => {
//     const type = filtered.find((item) => item.date === selectedDate)?.processing_type;
//     if (!type) return;
//     if (!window.confirm(`Tem certeza que deseja eliminar os resultados de ${selectedDate}?`)) return;

//     try {
//       await api.delete(`/utente/${id}/analise/${type}/${selectedDate}`);
//       setResults((prev) => prev.filter((res) => res.date !== selectedDate));
//       setSelectedDate("");
//       alert("Resultados eliminados com sucesso!");
//     } catch (err) {
//       console.error("Erro ao deletar dados:", err);
//       alert("Erro ao eliminar. Tente novamente.");
//     }
//   };

//   /** 🎛️ Selector de datas */
//   const renderDateSelector = () =>
//     compareMode ? (
//       <>
//         <select
//           multiple
//           value={selectedDates}
//           onChange={(e) =>
//             setSelectedDates([...e.target.selectedOptions].map((o) => o.value))
//           }
//           className="mb-4 p-2 border rounded w-full h-48 overflow-auto
//             bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//         >
//           {uniqueDates.map((date) => (
//             <option key={date} value={date}>
//               {date}
//             </option>
//           ))}
//         </select>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {uniqueDates.length > 1 && (
//             <button
//               onClick={() => setSelectedDates(uniqueDates)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//             >
//               Selecionar todas
//             </button>
//           )}
//           {selectedDates.length > 0 && (
//             <>
//               <button
//                 onClick={() => setSelectedDates([])}
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Limpar seleção
//               </button>
//               <button
//                 onClick={() =>
//                   setUnifiedGraphData(mergeF1F2DataToCompareUnifiedGraph(filtered))
//                 }
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Comparar num só gráfico
//               </button>
//             </>
//           )}
//         </div>
//       </>
//     ) : (
//       <select
//         value={selectedDate || ""}
//         onChange={(e) => setSelectedDate(e.target.value)}
//         className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
//       >
//         <option value="">Selecione uma data</option>
//         {uniqueDates.map((date) => (
//           <option key={date} value={date}>
//             {date}
//           </option>
//         ))}
//       </select>
//     );

//   /** 🖼️ Gráficos gerados pelo backend */
//   const renderChartImages = () =>
//     filtered.map((item) => {
//       const imagens = item.pathToChart?.slice(0, 4) || [];
//       return (
//         <div key={item.step} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {imagens.length === 0 ? (
//             <p className="text-red-500">Imagens não encontradas.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {imagens.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`${BACKEND_URL}${img}`}
//                   alt={`Gráfico ${i + 1}`}
//                   className="w-full h-auto rounded shadow-sm border dark:border-zinc-600"
//                   onError={(e) => (e.target.style.display = "none")}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     });

//   /** 🎧 Áudios dos exercícios */
//   const renderExerciseAudio = () =>
//     filtered.map((item) => {
//       const audio = item.pathToRecord;
//       return (
//         <div key={item.step} className="mb-6">
//           <h4 className="font-semibold mb-2">Passo {item.step}</h4>
//           {audio ? (
//             <audio controls src={`${BACKEND_URL}${audio}`} className="w-full" />
//           ) : (
//             <p className="text-red-500">Áudio não encontrado.</p>
//           )}
//         </div>
//       );
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-2xl font-semibold dark:text-white animate-pulse">
//           Carregando resultados...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4 py-6">
//       <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
//         Resultados de Articulação
//       </h1>

//       {/* 🔀 Modo de comparação */}
//       <div className="flex items-center gap-3 mb-4">
//         <span className="text-lg dark:text-white">Modo de Comparação</span>
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={compareMode}
//             onChange={() => {
//               setCompareMode(!compareMode);
//               setSelectedDates([]);
//               setUnifiedGraphData(null);
//             }}
//           />
//           <div
//             className={`w-11 h-6 rounded-full transition-colors duration-300 ${
//               compareMode ? "bg-green-500" : "bg-gray-300 dark:bg-zinc-700"
//             }`}
//           >
//             <div
//               className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full bg-white shadow
//               transition-transform duration-300 ${
//                 compareMode ? "translate-x-full" : ""
//               }`}
//             />
//           </div>
//         </label>
//         <span className="text-sm text-gray-700 dark:text-gray-300">
//           {compareMode ? "🟢 Ativo" : "⚪ Desativado"}
//         </span>
//       </div>

//       {renderDateSelector()}

//       {error && (
//         <p className="text-red-500 text-center mb-4">Erro: {error.message}</p>
//       )}

//       {filtered.length > 0 ? (
//         <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold mb-4 dark:text-white">
//             Espaço Acústico
//           </h2>
//           <DisplayChart groupedData={chartData} />

//           {!compareMode && (
//             <>
//               <Accordion defaultActiveKey="X" className="mt-6">
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
//                   <Accordion.Body>{renderChartImages()}</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>

//               <Accordion defaultActiveKey="X" className="mt-6">
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>Áudios dos exercícios</Accordion.Header>
//                   <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </>
//           )}

//           <div className="mt-6 flex justify-center">
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition dark:bg-red-700 dark:hover:bg-red-800"
//             >
//               Eliminar Todos os Resultados
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
//           Nenhum resultado disponível para esta data.
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api";
import { Card, CardContent } from "../../../../components/ui/card";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../../components/ui/accordion";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "../../../../components/ui/button";

import {
  groupF1F2DataToSpAcustic,
  mergeF1F2DataToCompare,
  mergeF1F2DataToCompareUnifiedGraph,
} from "../chartConfiguraction/groupChartData.jsx";
import { DisplayChart } from "../chartConfiguraction/ChartAccordion.jsx";

const BACKEND_URL = "http://localhost:5000";

export default function ArticulationResultPage() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [unifiedGraphData, setUnifiedGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** 🔎 Buscar resultados na API */
  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await api.get(`/utente/${id}/analise/articulacao`);
        const data = Array.isArray(res.data) ? res.data : [];
        setResults(data);
        if (data.length > 0) {
          setSelectedDate(data[data.length - 1].date);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [id]);

  /** 🗓️ Datas únicas */
  const uniqueDates = useMemo(() => [...new Set(results.map((r) => r.date))], [results]);

  /** 🔢 Resultados filtrados */
  const filtered = useMemo(() => {
    return compareMode
      ? results.filter((res) => selectedDates.includes(res.date))
      : results.filter((res) => res.date === selectedDate);
  }, [results, compareMode, selectedDate, selectedDates]);

  /** 📊 Dados do gráfico */
  const chartData = useMemo(() => {
    return compareMode
      ? unifiedGraphData ?? mergeF1F2DataToCompare(filtered)
      : groupF1F2DataToSpAcustic(filtered);
  }, [compareMode, filtered, unifiedGraphData]);

  /** 🗑️ Eliminar resultados */
  const handleDelete = async () => {
    const type = filtered.find((item) => item.date === selectedDate)?.processing_type;
    if (!type) return;
    if (!window.confirm(`Tem certeza que deseja eliminar os resultados de ${selectedDate}?`)) return;

    try {
      await api.delete(`/utente/${id}/analise/${type}/${selectedDate}`);
      setResults((prev) => prev.filter((res) => res.date !== selectedDate));
      setSelectedDate("");
    } catch (err) {
      console.error("Erro ao deletar dados:", err);
      alert("Erro ao eliminar. Tente novamente.");
    }
  };

  /** 🎛️ Selector de datas */
  const renderDateSelector = () =>
    compareMode ? (
      <>
        <select
          multiple
          value={selectedDates}
          onChange={(e) =>
            setSelectedDates([...e.target.selectedOptions].map((o) => o.value))
          }
          className="mb-4 p-2 border rounded w-full h-48 overflow-auto
            bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
        >
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueDates.length > 1 && (
            <Button variant="secondary" className="rounded" onClick={() => setSelectedDates(uniqueDates)}>
              Selecionar todas
            </Button>
          )}
          {selectedDates.length > 0 && (
            <>
              <Button variant="outline" className="rounded" onClick={() => setSelectedDates([])}>
                Limpar seleção
              </Button>
              <Button
                variant="default"
                className="rounded"
                onClick={() =>
                  setUnifiedGraphData(mergeF1F2DataToCompareUnifiedGraph(filtered))
                }
              >
                Comparar num só gráfico
              </Button>
            </>
          )}
        </div>
      </>
    ) : (
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

  const renderChartImages = () =>
    filtered.map((item) => {
      const imagens = item.pathToChart?.slice(0, 4) || [];
      return (
        <div key={item.step} className="mb-6">
          <h4 className="font-semibold mb-2 dark:text-white">Passo {item.step}</h4>
          {imagens.length === 0 ? (
            <p className="text-red-500">Imagens não encontradas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imagens.map((img, i) => (
                <img
                  key={i}
                  src={`${BACKEND_URL}${img}`}
                  alt={`Gráfico ${i + 1}`}
                  className="w-full h-auto rounded-xl shadow border dark:border-zinc-600"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ))}
            </div>
          )}
        </div>
      );
    });

  const renderExerciseAudio = () =>
    filtered.map((item) => {
      const audio = item.pathToRecord;
      return (
        <div key={item.step} className="mb-6">
          <h4 className="font-semibold mb-2 dark:text-white">Passo {item.step}</h4>
          {audio ? (
            <audio controls src={`${BACKEND_URL}${audio}`} className="w-full" />
          ) : (
            <p className="text-red-500">Áudio não encontrado.</p>
          )}
        </div>
      );
    });

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
        Resultados de Articulação
      </h1>

      <Card className="p-4 mb-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium dark:text-white">Modo de Comparação</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={compareMode}
              onChange={() => {
                setCompareMode(!compareMode);
                setSelectedDates([]);
                setUnifiedGraphData(null);
              }}
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                compareMode ? "bg-green-500" : "bg-gray-300 dark:bg-zinc-700"
              }`}
            >
              <div
                className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  compareMode ? "translate-x-full" : ""
                }`}
              />
            </div>
          </label>
        </div>
        {renderDateSelector()}
      </Card>

      {error && (
        <p className="text-red-500 text-center mb-4">Erro: {error.message}</p>
      )}

      {filtered.length > 0 ? (
        <Card className="p-6 shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Espaço Acústico
            </h2>
            <DisplayChart groupedData={chartData} />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 m-2">
              {compareMode
                ? "Visualizando múltiplas datas."
                : `Visualizando resultados de ${selectedDate}.`}
            </div>
            {!compareMode && (
              <Accordion defaultActiveKey="x">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
                  <Accordion.Body>
                    {renderChartImages()}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Áudios dos exercícios</Accordion.Header>
                  <Accordion.Body>
                    {renderExerciseAudio()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}

            <div className="mt-6 flex justify-center">
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600 rounded" onClick={handleDelete}>
                Eliminar Todos os Resultados
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
          Nenhum resultado disponível para esta data.
        </div>
      )}
    </div>
  );
}
