import React, { useEffect, useState } from "react";
import api from "../../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadarChart, BarChart, StaticBarChart } from "../../../../component/chart.jsx";
import {chartConfig} from "../chartConfiguraction/chartConfig.jsx";
import {groupFeatureToBoxplot} from "../chartConfiguraction/groupChartData.jsx";
import {ChartAccordion, DisplayChart} from "../chartConfiguraction/ChartAccordion.jsx";
import { RecursiveAccordion } from "../chartConfiguraction/RecursiveAccordion.jsx";

const BACKEND_URL = "http://localhost:5000";

export default function PhonotionResultPage() {
    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedDates, setSelectedDates] = useState([]);
    // const [compareMode, setCompareMode] = useState(false);
    // const [unifiedGraphData, setUnifiedGraphData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const uniqueDates = [...new Set(results.map(res => res.date))];
    // const filtered = compareMode
    //     ? results.filter(res => selectedDates.includes(res.date))
    //     : results.filter(res => res.date === selectedDate);

    // const data = compareMode
    // ? (unifiedGraphData
    //     ? unifiedGraphData
    //     : mergeF1F2DataToCompare(filtered))
    // : groupF1F2DataToSpAcustic(filtered);

    const uniqueDates = [...new Set(results.map((res) => res.date))];
    const filtered = results.filter((res) => res.date === selectedDate);

    console.log(filtered)

    const JitterData = groupFeatureToBoxplot(filtered,"Jitter");
    const ShimmerData = groupFeatureToBoxplot(filtered,"Shimmer");

    console.log("DataNoProsodia: ",ShimmerData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/${id}/analise/fonacao`);
                setResults(response.data);
                if (response.data.length > 0) {
                setSelectedDate(response.data[response.data.length - 1].date);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    // const handleCompareUnifiedGraph = () => {
    //     const unified = mergeF1F2DataToCompareUnifiedGraph(filtered);
    //     setUnifiedGraphData(unified);
    // };

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

    const renderDateSelector = () => {
        // return compareMode ? (
        // <>
        //     <select
        //     multiple
        //     value={selectedDates}
        //     onChange={(e) => setSelectedDates([...e.target.selectedOptions].map(o => o.value))}
        //     className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 h-48 overflow-auto"
        //     >
        //     {uniqueDates.map(date => (
        //         <option key={date} value={date}>{date}</option>
        //     ))}
        //     </select>

        //     <div className="flex flex-wrap gap-2 mb-4">
        //     {uniqueDates.length > 1 && (
        //         <button
        //         onClick={() => setSelectedDates(uniqueDates)}
        //         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        //         >
        //         Selecionar todas
        //         </button>
        //     )}

        //     {selectedDates.length > 0 && (
        //         <>
        //         <button
        //             onClick={() => setSelectedDates([])}
        //             className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
        //         >
        //             Limpar seleção
        //         </button>

        //         <button
        //             onClick={handleCompareUnifiedGraph}
        //             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        //         >
        //             Comparar num só gráfico
        //         </button>
        //         </>
        //     )}
        //     </div>
        // </>
        // ) : (
        // <select
        //     value={selectedDate || ""}
        //     onChange={(e) => setSelectedDate(e.target.value)}
        //     className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
        // >
        //     <option value="">Selecione uma data</option>
        //     {uniqueDates.map(date => (
        //     <option key={date} value={date}>{date}</option>
        //     ))}
        // </select>
        // );

        return (
            <select
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mb-4 p-2 border rounded w-full bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
            >
                <option value="">Selecione uma data</option>
                {uniqueDates.map(date => (
                <option key={date} value={date}>{date}</option>
                ))}
            </select>
        );
    };

    const renderChartImages = () => {
        return filtered.map((item, idx) => {
        const imagens = item.pathToChart?.slice(0, 4).map(img => `${BACKEND_URL}${img}`) || [];

        return (
            <div key={idx} className="mb-6">
            <h4 className="font-semibold mb-2">Passo {item.step}</h4>
            {imagens.length === 0 ? (
                <p className="text-red-500">Imagens não encontradas para este passo.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {imagens.map((src, i) => (
                    <img
                    key={i}
                    src={src}
                    alt={`Gráfico ${i + 1} do Passo ${item.step}`}
                    className="w-full h-auto rounded border shadow-sm dark:border-zinc-600"
                    onError={(e) => e.target.style.display = "none"}
                    />
                ))}
                </div>
            )}
            </div>
        );
        });
    };

    const renderExerciseAudio = () => {
        return filtered.map((item, idx) => {
        const audio = item.pathToRecord || "";
        return (
            <div key={idx} className="mb-6">
            <h4 className="font-semibold mb-2">Passo {item.step}</h4>
            {audio === "" ? (
                <p className="text-red-500">Áudio não encontrado para este passo.</p>
            ) : (
                <audio
                controls
                src={`${BACKEND_URL}${audio}`}
                className="w-full"
                >
                Seu navegador não suporta o elemento de áudio.
                </audio>
            )}
            </div>
        );
        });
    };

    


    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center dark:text-white mb-6">Carregando...</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
        <div className="flex-1 p-1">
            <div className="text-4xl font-bold text-center mb-1 p-3 text-gray-900 dark:text-white">Resultados de Prosódia</div>
            {/* <div className="flex items-center gap-4 mb-3">
                <span className="text-lg dark:text-white">Modo de Comparação</span>

                <label className="inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    checked={compareMode}
                    onChange={() => {
                        setCompareMode(!compareMode);
                        setSelectedDates([]);
                        setUnifiedGraphData(null);
                    }}
                    className="sr-only peer"
                    />

                    
                    <div className={`relative w-11 h-6 rounded-full transition-colors duration-300
                    ${compareMode ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-zinc-700'} 
                    peer-focus:outline-none`}>
                    
                    
                    <div className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full border 
                        transition-transform duration-300
                        ${compareMode ? 'translate-x-full bg-white border-white' : 'bg-white border-gray-300'}`}>
                    </div>
                    </div>
                </label>

                
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {compareMode ? '🟢 Ativo' : '⚪ Desativado'}
                </span>
            </div> */}


            {renderDateSelector()}

            {error && (
            <p className="text-red-500 text-center mb-4">Erro: {error.message}</p>
            )}

            <div className="mb-4">
            {filtered.length > 0 ? (
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Jitter</h2>
                <DisplayChart groupedData={JitterData} />
                <h2 className="text-xl font-semibold mb-3 p-3 dark:text-white">Shimmer</h2>
                <DisplayChart groupedData={ShimmerData} />

            
                <Accordion defaultActiveKey="x" className="mt-6">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
                    <Accordion.Body>{renderChartImages()}</Accordion.Body>
                </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="x" className="mt-6">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Áudios dos exercícios</Accordion.Header>
                    <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
                </Accordion.Item>
                </Accordion>
                

                {/* {!compareMode && (
                    <>
                    <Accordion defaultActiveKey="x" className="mt-6">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
                        <Accordion.Body>{renderChartImages()}</Accordion.Body>
                    </Accordion.Item>
                    </Accordion>

                    <Accordion defaultActiveKey="x" className="mt-6">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Áudios dos exercícios</Accordion.Header>
                        <Accordion.Body>{renderExerciseAudio()}</Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    </>
                )} */}
                <div className="w-full mt-8 flex justify-center">
                <button
                    className="mb-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
                    onClick={() => handleDelete()}
                >
                    Eliminar Todos os Resultados
                </button>
                </div>
                </div>
                
            ) : (
                <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-9">
                <p className="text-center mt-5 text-3xl dark:text-white">
                    Nenhum resultado disponível para essa data.
                </p>
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }
