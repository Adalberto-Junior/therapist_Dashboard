// import React, { useEffect, useState } from 'react';
// import api from "../../../api";
// import { useNavigate, useParams } from 'react-router-dom';
// // import { Collapse } from "react-collapse";
// import Accordion from 'react-bootstrap/Accordion';

// function AccordionAlwaysOpen({ data }) {
//     return (
//         <Accordion defaultActiveKey={["0"]} alwaysOpen>
//             {Object.entries(data).map(([key, value], index) => (
//                 <Accordion.Item eventKey={index.toString()} key={index}>
//                     <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header>
//                     <Accordion.Body>
//                         {/* Se o valor for um objeto, transforma em JSON formatado */}
//                         {typeof value === "object" && value !== null 
//                             ? JSON.stringify(value, null, 2) 
//                             : value.toString()}
//                     </Accordion.Body>
//                 </Accordion.Item>
//             ))}
//         </Accordion>
//     );
// }


// export default function ArticulationResult() {
//     const [result, setResult] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/analise/articulacao`);
//                 setResult(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id]);

    

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
//     return (
//         <div className="flex flex-col items-center mt-10">
//             {result && Object.keys(result).length > 0 ? (
//                 <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
//                     <h1 className="text-2xl font-bold text-center mb-5">Dados do result</h1>
                    
//                     <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">

//                         {Object.entries(result).map(([key, value]) => {
//                             // Correção para MongoDB `_id`
//                             if (key == "static_result"){
//                                 key = "resultado estatico"
//                             }

//                             if (key == "no_static_result"){
//                                 key = "resultado não estatico"
//                             } 

//                             if (key === "_id") {
//                                 value = value.$oid ? value.$oid : value.toString();
//                             }

//                             // if (key == "recording") {
//                             //     key = ""
//                             //     value = ""
//                             // }
//                             // if (key == "user") {
//                             //     key = ""
//                             //     value = ""
//                             // }

                            
//                             // // Se o valor for um objeto, transformar em string legível
//                             // if (typeof value === "object" && value !== null) {
//                             //     value = JSON.stringify(value, null, 2); // Formatação JSON legível
//                             // }
    
//                             // return (
//                             //     <div key={key} className="flex justify-between border-b pb-2">
                                    
//                             //         <span className="font-semibold">{ key? key.replace(/_/g, ' '): ""}:</span>
//                             //         <span>{value ? value.toString() : ""}</span>
//                             //     </div>
//                             // );

//                         })}
//                         <AccordionAlwaysOpen data={result} />
//                     </div>
    
                    
//                 </div>
//             ) : (
//                 <p>Nenhum dado disponível</p>
//             )}
//         </div>
//     );


// }

// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";

// export default function ArticulationResult() {
//     const [results, setResults] = useState([]); // Lista de dicionários
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

//     // Filtrar os dados com base na data selecionada
//     const filteredResults = results.filter(res => res.date === selectedDate);

//     return (
//         <div className="container mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

//             {/* Dropdown para selecionar a data */}
//             <select 
//                 className="mb-4 p-2 border rounded"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//             >
//                 {results.map((res, index) => (
//                     <option key={index} value={res.date}>
//                         {res.date}
//                     </option>
//                 ))}
//             </select>

//             {/* Exibir os dados filtrados */}
//             {filteredResults.length > 0 ? (
//                 <Accordion alwaysOpen>
//                     {filteredResults.map((item, index) => (
//                         <Accordion.Item eventKey={index.toString()} key={index}>
//                             <Accordion.Header>{`Step ${index + 1}`}</Accordion.Header>
//                             <Accordion.Body>
//                                 {/* Criar um novo Accordion dentro do Step */}
//                                 <Accordion alwaysOpen>
//                                     {Object.entries(item).map(([key, value], subIndex) => {
//                                         if (key !== "_id" && key !== "date") { // Ignorar _id e date
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

import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';

const keyTranslations = {
    static_result: "Resultados Estáticos",
    no_static_result: "Resultados não Estáticos",
    avg_BBEon_1: "Média BBEon 1",
    avg_BBEon_2: "Média BBEon 2",
    avg_BBEon_3: "Média BBEon 3",
    avg_BBEon_4: "Média BBEon 4",
    $oid: "ID do Objeto",
    id: "Identificador",
    date: "Data",
    // Adicione outros conforme necessário
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
                                        /* Se for uma lista, iteramos sobre ela */
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
                    setSelectedDate(response.data[0].date); // Define a primeira data como padrão
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [id]);
    // Criar uma lista única de datas sem duplicação
    const uniqueDates = [...new Set(results.map((res) => res.date))];
    //const filteredResults = results.filter(res => res.date === selectedDate);
     // Filtrar resultados com base na data selecionada
    const filteredResults = results.filter((res) => res.date === selectedDate);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <div className="flex-1 p-8">
                <div className=" w-full max-w-xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-5">Resultados de Articulação</h1>

                    {/* Dropdown para selecionar a data */}
                        <select
                            className="mb-4 p-2 border rounded"
                            value={selectedDate || ""}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            {uniqueDates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>

                    {/* Exibir os dados filtrados */}
                    {filteredResults.length > 0 ? (
                        <Accordion alwaysOpen>
                            {filteredResults.map((item, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header>{`Step ${index + 1}`}</Accordion.Header>
                                    <Accordion.Body>
                                        {/* Usa a versão recursiva do Accordion para tratar dados aninhados */}
                                        <RecursiveAccordion data={item} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-center mt-5">Nenhum dado disponível para essa data.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

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
