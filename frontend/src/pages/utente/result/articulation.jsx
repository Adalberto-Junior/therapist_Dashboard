import React, { useEffect, useState } from 'react';
import api from "../../../api";
import { useNavigate, useParams } from 'react-router-dom';


export default function ArticulationResult() {
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/${id}/analise/articulacao`);
                setResult(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // return (
    //     <div className="flex flex-col items-center mt-10">
    //         {utente && Object.keys(utente).length > 0 ? (
    //             <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
    //                 <h1 className="text-2xl font-bold text-center mb-5">Dados do Utente</h1>
                    
    //                 <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">
    //                     {Object.entries(utente).map(([key, value]) => (
    //                         <div key={key} className="flex justify-between border-b pb-2">
    //                             <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
    //                             <span>{value ? value.toString() : "N/A"}</span>
    //                         </div>
    //                     ))}
    //                 </div>
    
    //                 <div className="flex justify-center mt-5 space-x-4">
    //                     <button 
    //                         onClick={() => handleEdit(utente._id.$oid || utente._id.toString())} 
    //                         className="bg-blue-500 text-white py-2 px-4 rounded">
    //                         Editar
    //                     </button>
    //                     <button 
    //                         onClick={() => handleDelete(utente._id.$oid || utente._id.toString())} 
    //                         className="bg-red-500 text-white py-2 px-4 rounded">
    //                         Eliminar
    //                     </button>
    //                 </div>
    //             </div>
    //         ) : (
    //             <p>Nenhum dado disponível</p>
    //         )}
    //     </div>
    // );
    return (
        <div className="flex flex-col items-center mt-10">
            {utente && Object.keys(utente).length > 0 ? (
                <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-5">Dados do Utente</h1>
                    
                    <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">
                        {Object.entries(utente).map(([key, value]) => {
                            // Correção para MongoDB `_id`
                            if (key === "_id") {
                                value = value.$oid ? value.$oid : value.toString();
                            }

                            if (key == "name") {
                                key = "Nome"
                            }
                            if (key == "date_of_birth") {
                                key = "Data de Nascimento"
                            }

                            if (key == "observation") {
                                key = "Observação"
                            }
                            if (key == "health_user_number") {
                                key = "Número de Saúde do Utente"
                            }
                            if (key == "address") {
                                key = "Morada"
                            }
                            if (key == "medical_condition") {
                                key = "Condição de Saúde"
                            }
                            if (key == "cellphone") {
                                key = "Telemóvel"
                            }
                            if (key == "email") {
                                key = "Email"
                            }

    
                            // Substituir `terapist` por `age`
                            if (key === "therapist") {
                                key = "Idade";
                                value = calcularIdade(utente.date_of_birth); // Função para calcular a idade
                            }
    
                            // Se o valor for um objeto, transformar em string legível
                            if (typeof value === "object" && value !== null) {
                                value = JSON.stringify(value, null, 2); // Formatação JSON legível
                            }
    
                            return (
                                <div key={key} className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
                                    <span>{value ? value.toString() : "N/A"}</span>
                                </div>
                            );
                        })}
                    </div>
    
                    <div className="flex justify-center mt-5 space-x-4">
                        <button 
                            onClick={() => handleEdit(utente._id)} 
                            className="bg-blue-500 text-white py-2 px-4 rounded">
                            Editar
                        </button>
                        <button 
                            onClick={() => handleDelete(utente._id)} 
                            className="bg-red-500 text-white py-2 px-4 rounded">
                            Eliminar
                        </button>
                    </div>
                </div>
            ) : (
                <p>Nenhum dado disponível</p>
            )}
        </div>
    );


}