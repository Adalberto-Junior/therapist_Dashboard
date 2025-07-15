import React, { useEffect, useState } from 'react';
import api from "../../../api";
import { useNavigate, useParams } from 'react-router-dom';
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExerciseDetail() {
    const [exercise, setExercise] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id, id_ } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/exercicio/${id_}/`);
                setExercise(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id_]);

    const processingInPT = {
        articulation: "Articulação",
        phonation: "Fonação",
        glotta: "Glota",
        prosody: "Prosódia",
        replearning: "Reaprendizagem",

    }

    const stepInPT = {
        text: "Texto",
        title: "Título",
        description: "Descrição",
        word: "Palavra",
        sentence: "Frase",
        step: "Passo",
        question: "Pergunta",
        typeOfConsonant: "Tipo de Consoante",
        syllables: "Sílaba",
    }

    function translateKey(key) {
        return stepInPT[key] || key.replace(/_/g, " ");
    }


    const handleEdit = (id) => {
        navigate(`/utente/${id}/exercicio/editar/${id_}`); // Redirect to the edit page with the utente ID //TODO: FAZER DEPOIS
    };

    const handleDelete = async () => {
        
        try {
            const exercicioId = id_;
            if (!window.confirm("Tem a certeza que deseja eliminar este exercício?")) {
                return; // If the user cancels, do nothing
            }
            await api.delete(`/utente/exercicio/${id_}/`); // Adjust the endpoint as needed
            // setExercise(exercise.filter((exercise) => exercise.id !== id_)); // Remove the deleted exercise from the state
            window.history.back(); // Redirect back to the previous page
        } catch (error) {
            console.error(`Erro ao Deletar o exercício ${id_}:`, error);
        }
    };
    

    if (loading){
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
        </div>
        );
    }
    if (error) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <p className="text-2xl font-semibold text-center dark:text-white mb-6">Error: {error.message}</p>
            </div>
         ) 
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            {/* <UtenteTabs /> */}
            {/* <div className=" container flex flex-col  mt-10 bg-transparent dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
                {/* <div className="flex flex-col items-center mt-10"> */}
                    {exercise && Object.keys(exercise).length > 0 ? (
    <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
        {/* <div className="flex justify-between items-center mb-4">
            <button
                onClick={() => navigate(-1)} // Voltar para a página anterior
                className="bg-blue-500 text-white py-2 px-4 rounded">
                voltar
            </button>
        </div> */}
        <div className="flex justify-center items-center mb-6">
            <span className="text-center text-4xl font-bold dark:text-white p-2">Detalhes do Exercício</span>
        </div>
            {/* <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Detalhes do Exercício</p> */}



        <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-500 p-5 rounded-lg shadow-md">
            {Object.entries(exercise).map(([key, value]) => {
                if (key === "name") key = "Nome do Exercício";
                if (key === "description") key = "Descrição do Exercício";
                if (key === "type") key = "Tipo do Exercício";
                if (key === "userName") key = "Nome do Utilizador";
                if (key === "typeOfProcessing") {
                    key = "Tipo de Processamento";
                    if (Array.isArray(value)) {
                        value = value.map(v => processingInPT[v] || v).join(", ");
                    } else {
                        value = processingInPT[value] || value;
                    }
                } 
                if (key === "user") {
                    // key = "Id do Utilizador";
                    // value = value?.$oid || value;
                    return null;
                }
                if (key === "_id") {
                    key = "Id do Exercício";
                    value = value?.$oid || value;
                }
                if (key === "therapist") return null; // Não exibir o ID do terapeuta

                // Pular os steps para mostrar por último
                if (key === "steps") return null;

                if (typeof value === "object" && value !== null) {
                    value = JSON.stringify(value, null, 2);
                }

                return (
                    <div key={key} className="flex flex-col border-b pb-2">
                        <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
                        <span>{value ? value.toString() : "N/A"}</span>
                    </div>
                );
            })}
        </div>

        {/* Accordion para os steps */}
        {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
            // <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
            //     <h2 className="text-xl font-semibold mb-4">Passos ({exercise.steps.length})</h2>
            //     <Accordion type="multiple" className="w-full">
            //         {exercise.steps.map((step, index) => (
            //             <AccordionItem value={`step-${index}`} key={index} className="border-b">
            //                 <div className="py-2 cursor-pointer font-medium text-blue-600 hover:underline">
            //                     <Accordion.Trigger className="w-full text-left">
            //                         📄 Passo {index + 1}
            //                     </Accordion.Trigger>
            //                 </div>
            //                 <Accordion.Content className="pl-4 pb-4 pt-2 text-gray-800">
            //                     {Object.entries(step).map(([k, v], i) => (
            //                         <div key={i} className="mb-2">
            //                             <span className="font-semibold">{k}:</span>{" "}
            //                             <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
            //                         </div>
            //                     ))}
            //                 </Accordion.Content>
            //             </AccordionItem>
            //         ))}
            //     </Accordion>
            // </div>
            <div className="mt-8 bg-white dark:bg-gray-300 p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Passos</h2>
                <Accordion alwaysOpen>
                    {exercise.steps.map((step, index) => (
                    <Accordion.Item eventKey={`step-${index}`} key={index}>         
                            <>
                                {/* <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header> */}
                                <Accordion.Header>📄 Passo {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                {Object.entries(step).map(([k, v], i) => (
                                    <div key={i} className="mb-2">
                                        {v !== null && (
                                            <>
                                                <span className="font-semibold">{translateKey(k)}:</span>{" "}
                                                <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
                                            </>
                                        )}
                                    </div>
                                ))}
                                </Accordion.Body>
                            </>
                    </Accordion.Item>
                ))}
                </Accordion>
            </div>

        )}

        <div className="flex justify-center mt-5 space-x-4">
        <div className="flex flex-col items-center">
            <button 
            onClick={() => handleEdit(exercise.user?.$oid || id)} 
            className="mb-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors dark:bg-yellow-600 dark:hover:bg-yellow-800">
            Editar
        </button>
        </div>
        <div className="flex flex-col items-center">
            <button 
                onClick={() => handleDelete()} 
                className="mb-4 bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-500 dark:hover:bg-red-800">
                Eliminar
            </button>
        </div>
    </div>

    </div>
) : (
    <p>Nenhum dado disponível</p>
)}

        </div>
        
    );
    
    
}
