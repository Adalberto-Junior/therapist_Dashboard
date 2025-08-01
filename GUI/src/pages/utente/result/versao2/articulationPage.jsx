import React, { useEffect, useState } from "react";
import api from "../../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadarChart, BarChart, StaticBarChart } from "../../../../component/chart.jsx";
import {chartConfig} from "../chartConfiguraction/chartConfig.jsx";
import {groupChartData, groupBBEonBBEoffData, groupNotBBEonBBEoffData,groupF1F2DataToSpAcustic} from "../chartConfiguraction/groupChartData.jsx";
import {ChartAccordion, DisplayChart} from "../chartConfiguraction/ChartAccordion.jsx";
import { RecursiveAccordion } from "../chartConfiguraction/RecursiveAccordion.jsx";


export default function ArticulationResultPage() {
    const [results, setResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BACKEND_URL = "http://localhost:5000";

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get(`/utente/${id}/analise/articulacao`);
            setResults(response.data);
            if (response.data.length > 0) {
            setSelectedDate(response.data[response.data.length - 1].date);
            }
        } catch (error) {
            setError(error);
            console.error("Erro ao buscar dados:", error);
        }finally {
            setLoading(false);
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

    const uniqueDates = [...new Set(results.map((res) => res.date))];
    const filtered = results.filter((res) => res.date === selectedDate);

    const data = groupF1F2DataToSpAcustic(filtered);

    const customChartConfig = {
        ...chartConfig,
        radar: {
            ...chartConfig.radar,
            match: /^avg ([a-zA-Z]+)_/, // versão específica apenas nesta página
        }
    };



    if (loading){
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
        </div>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <div className="w-full max-w-4xl bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-center mb-6 dark:text-white">Resultados de Articulação</h1>
                <div className="mb-4">
                    <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selecione uma data:</label>
                    <select id="date-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2">
                        <option value="">Selecione uma data</option>
                        {uniqueDates.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-red-500 text-center mb-4"> Erro ao carregar os dados: {error.message}</p>}
                <div className="mb-4">
                    {filtered.length > 0 ? (
                        <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-6">
                            <div className="w-full flex flex-col md:flex-row gap-4 items-start">
                                <div className="w-full md:basis-4/5  bg-white dark:bg-zinc-700 p-6 rounded shadow">
                                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Espaço Acústico</h2>
                                   <div className="mb-6">
                                        <DisplayChart groupedData={data}/>
                                    </div>
                                                                        

                                    <Accordion defaultActiveKey="x" className="mt-6">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Gráficos extraídos do sistema</Accordion.Header>
                                            <Accordion.Body>
                                            {filtered.map((item, idx) => {
                                                const imagens = item.pathToChart?.slice(0, 4).map(img => `${BACKEND_URL}${img}`) || [];
                                                const imagensComErro = new Set(); // para rastrear imagens que falharam

                                                const todasFalharam = imagens.length > 0 && imagensComErro.size === imagens.length;

                                                return (
                                                <div key={idx} className="mb-6">
                                                    <h4 className="font-semibold mb-2">Passo {item.step}</h4>

                                                    {/* Se não há imagens ou todas falharam */}
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
                                                            onError={(e) => {
                                                            imagensComErro.add(i);
                                                            e.target.style.display = "none";

                                                            // Se todas falharem, força re-render para mostrar a mensagem
                                                            if (imagensComErro.size === imagens.length) {
                                                                e.target.closest("div").innerHTML =
                                                                '<p class="text-red-500">Imagens não encontradas para este passo.</p>';
                                                            }
                                                            }}
                                                        />
                                                        ))}
                                                    </div>
                                                    )}
                                                </div>
                                                );
                                            })}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Nenhum resultado encontrado para esta data.</p>
                    )}
                </div>
            </div>
        </div>
    );
}