// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import api from "../../../api";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import FloatingForm from './floatingUtenteForm'; // Importando o componente de formulário flutuante
// import { MultiSelect } from 'primereact/multiselect';


// export default function AllUtente() {
//     const [utentes, setUtentes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showForm, setShowForm] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams(); // Obter o ID do URL

//     useEffect(() => {
//         // Fetch data from the Flask API
//         const fetchData = async () => {
//             try {
//                 const response = await api.get('/utente/');
//                 setUtentes(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleOpen = async (id) => {
//         navigate(`/utente/${id}/informacao`);
//     };

//     if (loading){
//         return(
//          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
//         </div>
//         );
//     }
//     if (error) {
//          return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                 <p className="text-2xl font-semibold text-center dark:text-white mb-6">Error: {error.message}</p>
//             </div>
//          ) 
//     }
    
//     if (utentes.length === 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//               <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                 <h2 className="text-2xl font-bold text-center mb-5">Nenhum dado disponível</h2>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
//                     style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//                 >
//                     Adicionar Utente
//                 </button>
//                 {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
//               </div>
//             </div>
//         );
//     }
        
//     if (utentes.length > 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                 <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-20">
//                 {/* <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100"> */}
//                     <h2 className="text-2xl font-bold text-center mb-5">Lista de Utentes</h2>
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="py-2 px-4 border-b">ID</th>
//                                 <th className="py-2 px-4 border-b">Nome</th>
//                                 <th className="py-2 px-4 border-b">Email</th>
//                                 <th className="py-2 px-4 border-b">Ações</th>
//                             </tr>
//                         </thead>
//                         <tbody>
                            
//                             {utentes.map((utente) => (
//                                 <tr key={utente._id.$oid || utente._id}>
//                                     <td className="py-2 px-4 border-b">{utente._id.$oid || utente._id.toString()}</td>
//                                     <td className="py-2 px-4 border-b">{utente.name}</td>
//                                     <td className="py-2 px-4 border-b">{utente.email}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         <button onClick={() => handleOpen(utente._id.$oid || utente._id.toString())}
//                                          className="bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
//                                             Abrir
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
                        
//                     </table>
//                     <button
//                         onClick={() => setShowForm(true)}
//                         className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
//                         style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//                     >
//                         Adicionar Utente
//                     </button>
//                     {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
//                 </div>
//             </div>
//         );
//     }
// }


import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import FloatingForm from "./floatingUtenteForm";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Loader2, UserPlus, Eye } from "lucide-react";

export default function AllUtente() {
  const [utentes, setUtentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/utente/");
        setUtentes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (id) => {
    navigate(`/utente/${id}/informacao`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold dark:text-white">Carregando utentes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          Erro ao carregar utentes: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold dark:text-white">Lista de Utentes</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded">
          <UserPlus size={18} /> Adicionar Utente
        </Button>
      </div>

      {utentes.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold dark:text-white mb-4">Nenhum utente encontrado.</p>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <UserPlus size={18} /> Criar Primeiro Utente
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                    <th className="p-3 font-semibold">ID</th>
                    <th className="p-3 font-semibold">Nome</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {utentes.map((utente) => {
                    const utenteId = utente._id?.$oid || utente._id?.toString();
                    return (
                      <tr
                        key={utenteId}
                        className="hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                      >
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{utenteId}</td>
                        <td className="p-3 font-medium dark:text-white">{utente.name}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">{utente.email}</td>
                        <td className="p-3 text-center">
                          <Button
                            onClick={() => handleOpen(utenteId)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 rounded"
                          >
                            <Eye size={16} /> Abrir
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
