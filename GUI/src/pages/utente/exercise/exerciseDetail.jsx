// import React, { useEffect, useState } from 'react';
// import api from "../../../api";
// import { useNavigate, useParams } from 'react-router-dom';
// // import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
// import Accordion from "react-bootstrap/Accordion";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function ExerciseDetail() {
//     const [exercise, setExercise] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { id, id_ } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/exercicio/${id_}/`);
//                 setExercise(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id_]);

//     const processingInPT = {
//         articulation: "Articulação",
//         phonation: "Fonação",
//         glotta: "Glota",
//         prosody: "Prosódia",
//         replearning: "Reaprendizagem",

//     }

//     const stepInPT = {
//         text: "Texto",
//         title: "Título",
//         description: "Instrução",
//         word: "Palavra",
//         sentence: "Frase",
//         step: "Passo",
//         question: "Pergunta",
//         typeOfConsonant: "Tipo de Consoante",
//         syllables: "Sílaba",
//     }

//     function translateKey(key) {
//         return stepInPT[key] || key.replace(/_/g, " ");
//     }


//     const handleEdit = (id) => {
//         navigate(`/utente/${id}/exercicio/editar/${id_}`); // Redirect to the edit page with the utente ID //TODO: FAZER DEPOIS
//     };

//     const handleDelete = async () => {
        
//         try {
//             const exercicioId = id_;
//             if (!window.confirm("Tem a certeza que deseja eliminar este exercício?")) {
//                 return; // If the user cancels, do nothing
//             }
//             await api.delete(`/utente/exercicio/${id_}/`); // Adjust the endpoint as needed
//             // setExercise(exercise.filter((exercise) => exercise.id !== id_)); // Remove the deleted exercise from the state
//             window.history.back(); // Redirect back to the previous page
//         } catch (error) {
//             console.error(`Erro ao Deletar o exercício ${id_}:`, error);
//         }
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
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             {/* <UtenteTabs /> */}
//             {/* <div className=" container flex flex-col  mt-10 bg-transparent dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
//                 {/* <div className="flex flex-col items-center mt-10"> */}
//                     {exercise && Object.keys(exercise).length > 0 ? (
//     <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
//         {/* <div className="flex justify-between items-center mb-4">
//             <button
//                 onClick={() => navigate(-1)} // Voltar para a página anterior
//                 className="bg-blue-500 text-white py-2 px-4 rounded">
//                 voltar
//             </button>
//         </div> */}
//         <div className="flex justify-center items-center mb-6">
//             <span className="text-center text-4xl font-bold dark:text-white p-2">Detalhes do Exercício</span>
//         </div>
//             {/* <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Detalhes do Exercício</p> */}



//         <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-500 p-5 rounded-lg shadow-md">
//             {Object.entries(exercise).map(([key, value]) => {
//                 if (key === "name") key = "Nome do Exercício";
//                 if (key === "description") key = "Descrição do Exercício";
//                 if (key === "type") key = "Tipo do Exercício";
//                 if (key === "userName") key = "Nome do Utilizador";
//                 if (key === "typeOfProcessing") {
//                     key = "Tipo de Processamento";
//                     if (Array.isArray(value)) {
//                         value = value.map(v => processingInPT[v] || v).join(", ");
//                     } else {
//                         value = processingInPT[value] || value;
//                     }
//                 } 
//                 if (key === "user") {
//                     // key = "Id do Utilizador";
//                     // value = value?.$oid || value;
//                     return null;
//                 }
//                 if (key === "_id") {
//                     key = "Id do Exercício";
//                     value = value?.$oid || value;
//                 }
//                 if (key === "therapist") return null; // Não exibir o ID do terapeuta

//                 // Pular os steps para mostrar por último
//                 if (key === "steps") return null;

//                 if (typeof value === "object" && value !== null) {
//                     value = JSON.stringify(value, null, 2);
//                 }

//                 return (
//                     <div key={key} className="flex flex-col border-b pb-2">
//                         <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
//                         <span>{value ? value.toString() : "N/A"}</span>
//                     </div>
//                 );
//             })}
//         </div>

//         {/* Accordion para os steps */}
//         {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
//             // <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
//             //     <h2 className="text-xl font-semibold mb-4">Passos ({exercise.steps.length})</h2>
//             //     <Accordion type="multiple" className="w-full">
//             //         {exercise.steps.map((step, index) => (
//             //             <AccordionItem value={`step-${index}`} key={index} className="border-b">
//             //                 <div className="py-2 cursor-pointer font-medium text-blue-600 hover:underline">
//             //                     <Accordion.Trigger className="w-full text-left">
//             //                         📄 Passo {index + 1}
//             //                     </Accordion.Trigger>
//             //                 </div>
//             //                 <Accordion.Content className="pl-4 pb-4 pt-2 text-gray-800">
//             //                     {Object.entries(step).map(([k, v], i) => (
//             //                         <div key={i} className="mb-2">
//             //                             <span className="font-semibold">{k}:</span>{" "}
//             //                             <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
//             //                         </div>
//             //                     ))}
//             //                 </Accordion.Content>
//             //             </AccordionItem>
//             //         ))}
//             //     </Accordion>
//             // </div>
//             <div className="mt-8 bg-white dark:bg-gray-300 p-5 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-4">Passos</h2>
//                 <Accordion alwaysOpen>
//                     {exercise.steps.map((step, index) => (
//                     <Accordion.Item eventKey={`step-${index}`} key={index}>         
//                             <>
//                                 {/* <Accordion.Header>{key.replace(/_/g, " ")}</Accordion.Header> */}
//                                 <Accordion.Header>📄 Passo {index + 1}</Accordion.Header>
//                                 <Accordion.Body>
//                                 {Object.entries(step).map(([k, v], i) => (
//                                     <div key={i} className="mb-2">
//                                         {v !== null && v !== undefined && v !== "" && (
//                                             <>
//                                                 <span className="font-semibold">{translateKey(k)}:</span>{" "}
//                                                 <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
//                                             </>
//                                         )}
//                                     </div>
//                                 ))}
//                                 </Accordion.Body>
//                             </>
//                     </Accordion.Item>
//                 ))}
//                 </Accordion>
//             </div>

//         )}

//         <div className="flex justify-center mt-5 space-x-4">
//         <div className="flex flex-col items-center">
//             <button 
//             onClick={() => handleEdit(exercise.user?.$oid || id)} 
//             className="mb-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors dark:bg-yellow-600 dark:hover:bg-yellow-800">
//             Editar
//         </button>
//         </div>
//         <div className="flex flex-col items-center">
//             <button 
//                 onClick={() => handleDelete()} 
//                 className="mb-4 bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-500 dark:hover:bg-red-800">
//                 Eliminar
//             </button>
//         </div>
//     </div>

//     </div>
// ) : (
//     <p>Nenhum dado disponível</p>
// )}

//         </div>
        
//     );
    
    
// }


// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useNavigate, useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ExerciseDetail() {
//   const [exercise, setExercise] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id, id_ } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/exercicio/${id_}/`);
//         setExercise(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id_]);

//   const processingInPT = {
//     articulation: "Articulação",
//     phonation: "Fonação",
//     glotta: "Glota",
//     prosody: "Prosódia",
//     replearning: "Reaprendizagem",
//   };

//   const stepInPT = {
//     text: "Texto",
//     title: "Título",
//     description: "Instrução",
//     word: "Palavra",
//     sentence: "Frase",
//     step: "Passo",
//     question: "Pergunta",
//     typeOfConsonant: "Tipo de Consoante",
//     syllables: "Sílaba",
//   };

//   function translateKey(key) {
//     return stepInPT[key] || key.replace(/_/g, " ");
//   }

//   const handleEdit = (id) => {
//     navigate(`/utente/${id}/exercicio/editar/${id_}`);
//   };

//   const handleDelete = async () => {
//     try {
//       if (!window.confirm("Tem certeza que deseja eliminar este exercício?")) return;
//       await api.delete(`/utente/exercicio/${id_}/`);
//       navigate(-1);
//     } catch (error) {
//       console.error(`Erro ao deletar o exercício ${id_}:`, error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-2xl font-semibold text-center dark:text-white">
//           Carregando detalhes...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-2xl font-semibold text-center text-red-500">
//           Erro: {error.message}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-4">
//       {exercise && Object.keys(exercise).length > 0 ? (
//         <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
//           {/* Header */}
//           <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
//             Detalhes do Exercício
//           </h1>

//           {/* Metadados */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6">
//             {Object.entries(exercise).map(([key, value]) => {
//               if (key === "user" || key === "therapist" || key === "steps") return null;

//               if (key === "typeOfProcessing") {
//                 value = Array.isArray(value)
//                   ? value.map((v) => processingInPT[v] || v).join(", ")
//                   : processingInPT[value] || value;
//               }
//               if (key === "_id") value = value?.$oid || value;
//               if (typeof value === "object" && value !== null)
//                 value = JSON.stringify(value, null, 2);

//               const labelMap = {
//                 name: "Nome do Exercício",
//                 description: "Descrição do Exercício",
//                 type: "Tipo do Exercício",
//                 userName: "Nome do Paciente",
//                 typeOfProcessing: "Tipo de Processamento",
//                 _id: "ID do Exercício",
//               };

//               return (
//                 <div key={key} className="flex flex-col">
//                   <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
//                     {labelMap[key] || key.replace(/_/g, " ")}
//                   </span>
//                   <span className="text-base text-gray-900 dark:text-gray-100">
//                     {value || "N/A"}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Accordion de Steps */}
//           {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
//             <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                 Passos do Exercício ({exercise.steps.length})
//               </h2>
//               <Accordion alwaysOpen>
//                 {exercise.steps.map((step, index) => (
//                   <Accordion.Item eventKey={`step-${index}`} key={index}>
//                     <Accordion.Header>
//                       📄 Passo {index + 1}
//                     </Accordion.Header>
//                     <Accordion.Body>
//                       {Object.entries(step).map(([k, v], i) => (
//                         v !== null && v !== "" && (
//                           <div key={i} className="mb-2">
//                             <span className="font-medium">{translateKey(k)}: </span>
//                             <span>{typeof v === "string" ? v : JSON.stringify(v)}</span>
//                           </div>
//                         )
//                       ))}
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 ))}
//               </Accordion>
//             </div>
//           )}

//           {/* Botões de Ação */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//             <button
//               onClick={() => handleEdit(exercise.user?.$oid || id)}
//               className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow transition-all"
//             >
//               ✏️ Editar Exercício
//             </button>

//             <button
//               onClick={handleDelete}
//               className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition-all"
//             >
//               🗑️ Eliminar Exercício
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-300">Nenhum dado disponível</p>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useNavigate, useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import { motion } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ExerciseDetail() {
//   const [exercise, setExercise] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id, id_ } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/exercicio/${id_}/`);
//         setExercise(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id_]);

//   const processingInPT = {
//     articulation: "Articulação",
//     phonation: "Fonação",
//     glotta: "Glota",
//     prosody: "Prosódia",
//     replearning: "Reaprendizagem",
//   };

//   const stepInPT = {
//     text: "Texto",
//     title: "Título",
//     description: "Instrução",
//     word: "Palavra",
//     sentence: "Frase",
//     step: "Passo",
//     question: "Pergunta",
//     typeOfConsonant: "Tipo de Consoante",
//     syllables: "Sílaba",
//   };

//   function translateKey(key) {
//     return stepInPT[key] || key.replace(/_/g, " ");
//   }

//   const handleEdit = (id) => {
//     navigate(`/utente/${id}/exercicio/editar/${id_}`);
//   };

//   const handleDelete = async () => {
//     try {
//       if (!window.confirm("Tem certeza que deseja eliminar este exercício?")) return;
//       await api.delete(`/utente/exercicio/${id_}/`);
//       navigate(-1);
//     } catch (error) {
//       console.error(`Erro ao deletar o exercício ${id_}:`, error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <motion.p
//           className="text-2xl font-semibold text-center dark:text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
//         >
//           Carregando detalhes...
//         </motion.p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <motion.p
//           className="text-2xl font-semibold text-center text-red-500"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           Erro: {error.message}
//         </motion.p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-4">
//       {exercise && Object.keys(exercise).length > 0 ? (
//         <motion.div
//           className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {/* Header */}
//           <motion.h1
//             className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             Detalhes do Exercício
//           </motion.h1>

//           {/* Metadados */}
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             {Object.entries(exercise).map(([key, value]) => {
//               if (key === "user" || key === "therapist" || key === "steps") return null;

//               if (key === "typeOfProcessing") {
//                 value = Array.isArray(value)
//                   ? value.map((v) => processingInPT[v] || v).join(", ")
//                   : processingInPT[value] || value;
//               }
//               if (key === "_id") value = value?.$oid || value;
//               if (typeof value === "object" && value !== null)
//                 value = JSON.stringify(value, null, 2);

//               const labelMap = {
//                 name: "Nome do Exercício",
//                 description: "Descrição do Exercício",
//                 type: "Tipo do Exercício",
//                 userName: "Nome do Paciente",
//                 typeOfProcessing: "Tipo de Processamento",
//                 _id: "ID do Exercício",
//               };

//               return (
//                 <motion.div
//                   key={key}
//                   className="flex flex-col"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
//                     {labelMap[key] || key.replace(/_/g, " ")}
//                   </span>
//                   <span className="text-base text-gray-900 dark:text-gray-100">
//                     {value || "N/A"}
//                   </span>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Accordion de Steps */}
//           {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
//             <motion.div
//               className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner mb-6"
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                 Passos do Exercício ({exercise.steps.length})
//               </h2>
//               <Accordion alwaysOpen>
//                 {exercise.steps.map((step, index) => (
//                   <Accordion.Item eventKey={`step-${index}`} key={index}>
//                     <Accordion.Header>📄 Passo {index + 1}</Accordion.Header>
//                     <Accordion.Body>
//                       {Object.entries(step).map(([k, v], i) => (
//                         v !== null &&
//                         v !== "" && (
//                           <motion.div
//                             key={i}
//                             className="mb-2"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <span className="font-medium">{translateKey(k)}: </span>
//                             <span>{typeof v === "string" ? v : JSON.stringify(v)}</span>
//                           </motion.div>
//                         )
//                       ))}
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 ))}
//               </Accordion>
//             </motion.div>
//           )}

//           {/* Botões de Ação */}
//           <motion.div
//             className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <motion.button
//               onClick={() => handleEdit(exercise.user?.$oid || id)}
//               className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow transition-all"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               ✏️ Editar Exercício
//             </motion.button>

//             <motion.button
//               onClick={handleDelete}
//               className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition-all"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               🗑️ Eliminar Exercício
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-300">Nenhum dado disponível</p>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useNavigate, useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import { motion } from "framer-motion";
// import {
//   Pencil,
//   Trash2,
//   Loader2,
//   BookOpenCheck,
//   FileText,
// } from "lucide-react"; // <-- Adicionando os ícones
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ExerciseDetail() {
//   const [exercise, setExercise] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id, id_ } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/exercicio/${id_}/`);
//         setExercise(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id_]);

//   const processingInPT = {
//     articulation: "Articulação",
//     phonation: "Fonação",
//     glotta: "Glota",
//     prosody: "Prosódia",
//     replearning: "Reaprendizagem",
//   };

//   const stepInPT = {
//     text: "Texto",
//     title: "Título",
//     description: "Instrução",
//     word: "Palavra",
//     sentence: "Frase",
//     step: "Passo",
//     question: "Pergunta",
//     typeOfConsonant: "Tipo de Consoante",
//     syllables: "Sílaba",
//   };

//   function translateKey(key) {
//     return stepInPT[key] || key.replace(/_/g, " ");
//   }

//   const handleEdit = (id) => {
//     navigate(`/utente/${id}/exercicio/editar/${id_}`);
//   };

//   const handleDelete = async () => {
//     try {
//       if (!window.confirm("Tem certeza que deseja eliminar este exercício?")) return;
//       await api.delete(`/utente/exercicio/${id_}/`);
//       navigate(-1);
//     } catch (error) {
//       console.error(`Erro ao deletar o exercício ${id_}:`, error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <motion.div
//           className="flex items-center gap-3 text-gray-800 dark:text-gray-100 text-xl font-semibold"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
//         >
//           <Loader2 className="animate-spin" />
//           Carregando detalhes...
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <motion.p
//           className="text-2xl font-semibold text-center text-red-500"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           Erro: {error.message}
//         </motion.p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-4">
//       {exercise && Object.keys(exercise).length > 0 ? (
//         <motion.div
//           className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {/* Header */}
//           <motion.h1
//             className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-3"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <FileText className="w-7 h-7 text-blue-500" />
//             Detalhes do Exercício
//           </motion.h1>

//           {/* Metadados */}
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             {Object.entries(exercise).map(([key, value]) => {
//               if (key === "user" || key === "therapist" || key === "steps") return null;

//               if (key === "typeOfProcessing") {
//                 value = Array.isArray(value)
//                   ? value.map((v) => processingInPT[v] || v).join(", ")
//                   : processingInPT[value] || value;
//               }
//               if (key === "_id") value = value?.$oid || value;
//               if (typeof value === "object" && value !== null)
//                 value = JSON.stringify(value, null, 2);

//               const labelMap = {
//                 name: "Nome do Exercício",
//                 description: "Descrição do Exercício",
//                 type: "Tipo do Exercício",
//                 userName: "Nome do Paciente",
//                 typeOfProcessing: "Tipo de Processamento",
//                 _id: "ID do Exercício",
//               };

//               return (
//                 <motion.div
//                   key={key}
//                   className="flex flex-col"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
//                     {labelMap[key] || key.replace(/_/g, " ")}
//                   </span>
//                   <span className="text-base text-gray-900 dark:text-gray-100">
//                     {value || "N/A"}
//                   </span>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Accordion de Steps */}
//           {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
//             <motion.div
//               className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner mb-6"
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
//                 <BookOpenCheck className="text-green-500 w-5 h-5" />
//                 Passos do Exercício ({exercise.steps.length})
//               </h2>
//               <Accordion alwaysOpen>
//                 {exercise.steps.map((step, index) => (
//                   <Accordion.Item eventKey={`step-${index}`} key={index}>
//                     <Accordion.Header>Passo {index + 1}</Accordion.Header>
//                     <Accordion.Body>
//                       {Object.entries(step).map(([k, v], i) => (
//                         v !== null &&
//                         v !== "" && (
//                           <motion.div
//                             key={i}
//                             className="mb-2"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <span className="font-medium">{translateKey(k)}: </span>
//                             <span>{typeof v === "string" ? v : JSON.stringify(v)}</span>
//                           </motion.div>
//                         )
//                       ))}
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 ))}
//               </Accordion>
//             </motion.div>
//           )}

//           {/* Botões de Ação */}
//           <motion.div
//             className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <motion.button
//               onClick={() => handleEdit(exercise.user?.$oid || id)}
//               className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow transition-all flex items-center justify-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Pencil className="w-5 h-5" />
//               Editar Exercício
//             </motion.button>

//             <motion.button
//               onClick={handleDelete}
//               className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition-all flex items-center justify-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Trash2 className="w-5 h-5" />
//               Eliminar Exercício
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-300">Nenhum dado disponível</p>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";

import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import { Loader2, Edit, Trash2, ListChecks, FileText } from "lucide-react";

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState(null);
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
  };

  const stepInPT = {
    text: "Texto",
    title: "Título",
    description: "Instrução",
    word: "Palavra",
    sentence: "Frase",
    step: "Passo",
    question: "Pergunta",
    typeOfConsonant: "Tipo de Consoante",
    syllables: "Sílaba",
  };

  function translateKey(key) {
    return stepInPT[key] || key.replace(/_/g, " ");
  }

  const handleEdit = () => {
    navigate(`/utente/${id}/exercicio/editar/${id_}`);
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Tem certeza que deseja eliminar este exercício?")) return;
      await api.delete(`/utente/exercicio/${id_}/`);
      navigate(-1);
    } catch (error) {
      console.error(`Erro ao deletar o exercício ${id_}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold dark:text-white">
          Carregando exercício...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          Erro ao carregar exercício: {error.message}
        </p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <p className="text-lg font-semibold dark:text-white">
          Exercício não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <FileText className="text-primary w-7 h-7" />
            Detalhes do Exercício
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(exercise).map(([key, value]) => {
            if (key === "user" || key === "therapist" || key === "steps")
              return null;

            if (key === "typeOfProcessing") {
              value = Array.isArray(value)
                ? value.map((v) => processingInPT[v] || v).join(", ")
                : processingInPT[value] || value;
            }

            if (key === "_id") value = value?.$oid || value;
            if (typeof value === "object" && value !== null)
              value = JSON.stringify(value, null, 2);

            const labelMap = {
              name: "Nome do Exercício",
              description: "Descrição do Exercício",
              type: "Tipo do Exercício",
              userName: "Nome do Utente",
              typeOfProcessing: "Tipo de Processamento",
              _id: "ID do Exercício",
            };

            return (
              <div
                key={key}
                className="flex flex-col p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow-sm"
              >
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {labelMap[key] || key.replace(/_/g, " ")}
                </span>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {value || "N/A"}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <ListChecks className="text-primary w-5 h-5" />
            <CardTitle className="text-xl">Passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exercise.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  {Object.entries(step).map(([k, v], i) =>
                    v !== null && v !== "" ? (
                      <p key={i} className="text-sm text-gray-800 dark:text-gray-200">
                        <span className="font-medium">{translateKey(k)}:</span>{" "}
                        {typeof v === "string" ? v : JSON.stringify(v)}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 justify-end">
        <Button
          onClick={handleEdit}
          variant="outline"
          className="flex items-center gap-2 rounded"
        >
          <Edit size={16} /> Editar
        </Button>
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="flex items-center gap-2 rounded"
        >
          <Trash2 size={16} /> Eliminar
        </Button>
      </div>
    </div>
  );
}
