
import React, { useEffect, useState } from 'react';
import api from "../../api";
import { useNavigate, useParams } from 'react-router-dom';


export default function HealthUserInformation() {
    const [utente, setUtente] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`/utente/informacao/${id}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Authorization": `Bearer ${localStorage.getItem('token')}`,
    //                     "Cache-Control": "no-cache",
    //                     "Pragma": "no-cache",
    //                     "Content-Type": "application/json"
    //                 },
    //                 cache: "no-store"
    //             });
    //             if (!response.ok) throw new Error("Erro ao buscar os dados");
    //             const data = await response.json();
    //             console.log(data)
    //             setUtente(data);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/informacao/${id}`);
                setUtente(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    function calcularIdade(dataNascimento) {
        if (!dataNascimento) return "N/A"; // Se não houver data, retorna "N/A"
    
        const dataNascimentoObj = new Date(dataNascimento);
        const hoje = new Date();
    
        let idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaAtual = hoje.getDate();
        const diaNascimento = dataNascimentoObj.getDate();
    
        // Ajuste se o aniversário ainda não ocorreu neste ano
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }
         

        if (dataNascimentoObj.getFullYear() == hoje.getFullYear()) {
            if (mesAtual === mesNascimento) idade = String(idade) + " D"
            else idade = String(idade) + " M"
        }
        else idade = String(idade) + " A"
    
        return String(idade);
    }

    const handleEdit = (id) => {
        navigate(`/utente/edit/${id}`); // Redirect to the edit page with the utente ID
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/utentes/${id}`); // Adjust the endpoint as needed
            setUtentes(utentes.filter((utente) => utente.id !== id)); // Remove the deleted utente from the state
        } catch (error) {
            console.error("Error deleting utente:", error);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // return (
    //     <div className="flex flex-col items-center mt-10">
    //         {utente && Object.keys(utente).length > 0 ? ( // Verifica se o objeto não está vazio
    //             <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100">
    //             <h1>Dados do Utente</h1>
    //             {/* {Object.entries(utente).map(([key, value]) => (
    //                 <p key={key}><strong>{key}:</strong> {value.toString()}</p>
    //             ))} */}
    //             <h2 className="text-2xl font-bold text-center mb-5">Lista de utente</h2>
    //         <table className=" container mx-auto max-w-4xl mt-10 p-5 bg-white border border-gray-300">
                
    //             <thead>
    //                 <tr className="bg-gray-200">
    //                     <th className="py-2 px-4 border-b">ID</th>
    //                     <th className="py-2 px-4 border-b">Nome</th>
    //                     <th className="py-2 px-4 border-b">Email</th>
    //                     <th className="py-2 px-4 border-b">Idade</th>
    //                     <th className="py-2 px-4 border-b">Data de Nascimento</th>
    //                     <th className="py-2 px-4 border-b">Número do utente</th>
    //                     <th className="py-2 px-4 border-b">Telemovel</th>
    //                     <th className="py-2 px-4 border-b">Morada</th>
    //                     <th className="py-2 px-4 border-b">Condição de Saúde</th>
    //                     <th className="py-2 px-4 border-b">Observação</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td className="py-2 px-4 border-b">{utente._id.$oid || utente._id.toString()}</td>
    //                     <td className="py-2 px-4 border-b">{utente.name}</td>
    //                     <td className="py-2 px-4 border-b">{utente.email}</td>
    //                     <td className="py-2 px-4 border-b">{utente.name}</td>
    //                     <td className="py-2 px-4 border-b">{utente.date_of_birth}</td>
    //                     <td className="py-2 px-4 border-b">{utente.health_user_number}</td>
    //                     <td className="py-2 px-4 border-b">{utente.cellphone}</td>
    //                     <td className="py-2 px-4 border-b">{utente.address}</td>
    //                     <td className="py-2 px-4 border-b">{utente.medical_condition}</td>
    //                     <td className="py-2 px-4 border-b">{utente.observation}</td>
                        
    //                 </tr>
    //             </tbody>
                
    //         </table>
    //         <button onClick={() => handleEdit(utente._id.$oid || utente._id.toString())} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</button>
    //             <button onClick={() => handleDelete(utente._id.$oid || utente._id.toString())} className="bg-red-500 text-white py-1 px-3 rounded">Eliminar</button>
    //             </div>
    //         ) : (
    //             <p>Nenhum dado disponível</p>
    //         )}
    //     </div>

    //     // <div className="flex flex-col items-center mt-10 bg-gray-100">
            
    //     // </div>
    // );
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className=" container flex flex-col  mt-10 bg-transparent dark:bg-zinc-800 shadow-md rounded-lg p-6">
        {/* <div className="flex flex-col items-center mt-10"> */}
            {utente && Object.keys(utente).length > 0 ? (
                <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Dados do Utente</h1>
                    
                    <div className="container grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">
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
        </div>
        
    );
    
    
}




// const DataFetcher = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from the Flask API
//         const fetchData = async () => {
//             try {
//                 const response = await api.get('/utente/informacao/'); // Adjust the endpoint as needed
//                 setData(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <h1>Data from Flask API</h1>
//             <p>{data.message}</p>
//         </div>
//     );
// };

// export default DataFetcher;
