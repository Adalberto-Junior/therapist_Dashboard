// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import api from "../../../../../frontend/src/api";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import FloatingForm from './floatingExerciseForm'; // Importando o componente de formulário flutuante
// import { MultiSelect } from 'primereact/multiselect';
// // import '../../App.css'; // Importando o CSS tradicional


// export default function AllExercise() {
//     const [exercises, setExercises] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showForm, setShowForm] = useState(false);
//     const [error, setError] = useState(null);
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const navigate = useNavigate();
//     const { id } = useParams(); // Obter o ID do URL
//     const [type, setType] = useState('');
//      const {
//             register, handleSubmit, watch, control, reset, formState: { errors }
//             } = useForm({
//             defaultValues: {
//                 tipo: '',
//                 steps: []
//             }
//         });
    
//          // EXERCIÍO:::::::::::::::::::::::::::::::::::::
//         const { fields, append, remove } = useFieldArray({
//             control,
//             name: 'steps'
//           });
        
//         const tipoSelecionado = watch('tipo');
        
//         const camposPorTipo = {
//             palavras: ['Palavras', 'Instrução','ID'],
//             frases: ['Frase', 'Instrução','ID'],
//             leitura: ['Título', 'Texto', 'Instrução', 'ID'],
//             discurso: ['Questão', 'Instrução','ID'],
//             diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Instrução','ID'],
//             novo: ["descrição",'label', 'valor','ID']
//         };
        
//         const camposPorTipoEn = {
//             palavras: ['word', 'description','ID'],
//             frases: ['sentence', 'description','ID'],
//             leitura: ['title', 'text', 'description','ID'],
//             discurso: ['question', 'description','ID'],
//             diadococinesia: ['typeOfConsonant', 'syllables', 'description','ID'],
//             novo: ['description','label', 'value','ID']
//         };
        
//         const mapTipo = (tipo) => {
//             return {
//               palavras: 'Repetição de Palavras',
//               frases: 'Repetição de Frases',
//               leitura: 'Atividades de Leitura',
//               discurso: 'Discurso Espontâneo',
//               diadococinesia: 'Diadococinésia',
//             }[tipo] || tipo;
//         };
        
//         const appendStep = () => {
//             if (type === 'novo') {
//               append({
//                 description: '',
//                 id: '',
//                 pairs: [{ label: '', value: '' }] // novo array dinâmico
//               });
//             } else {
//               const campos = camposPorTipo[type] || [];
//               const novoStep = Object.fromEntries(campos.map(key => [key, '']));
//               append(novoStep);
//             }
//         };
        
//         const options = [
//             { label: 'Articulação', value: 'articulation' },
//             { label: 'Fonação', value: 'phonation' },
//             { label: 'Glota', value: 'glotta' },
//             { label: 'Prosódia', value: 'prosody' },
//             { label: 'Reaprendizagem', value: 'replearning' },
//             { label: 'Fonológico', value: 'phonological'}
//         ];

//     const LabelObrigatorio = ({ htmlFor, children }) => (
//         <label htmlFor={htmlFor}>
//             {children} <span style={{ color: 'red' }}>*</span>
//         </label>
//     );


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/${id}/exercicio/`);
//                 setExercises(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id]);


//     // const fetchexercise = async () => {
//     //     try {
//     //         const response = await api.get(`/exercises/${id}`); // Adjust the endpoint as needed
//     //         setexercise(response.data);
//     //     } catch (error) {
//     //         setError(error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
//     // fetchexercise();
//     // }, [id]); // Dependência do ID para refazer a chamada quando o ID mudar
//     // const handleDelete = async (id) => {
//     //     try {
//     //         await api.delete(`/exercises/${id}`); // Adjust the endpoint as needed
//     //         setexercises(exercises.filter((exercise) => exercise.id !== id)); // Remove the deleted exercise from the state
//     //     } catch (error) {
//     //         console.error("Error deleting exercise:", error);
//     //     }
//     // };
//     const handleEdit = (id) => {
//         navigate(`/exercicio/editar/${id}`); // Redirect to the edit page with the exercise ID
//     };
//     const handleDelete = async (id) => {
//         try {
//             await api.delete(`/exercises/${id}`); // Adjust the endpoint as needed
//             setexercises(exercises.filter((exercise) => exercise.id !== id)); // Remove the deleted exercise from the state
//         } catch (error) {
//             console.error("Error deleting exercise:", error);
//         }
//     };

//      const onSubmit = async (data) => {
//         try {
//             if (data.type !== 'novo') {
//                 data.type = mapTipo(data.type);
//             }
//             if (typeof data.typeOfProcessing === "string") {
//                 data.typeOfProcessing = [data.typeOfProcessing];
//             }
//             await api.post(`/utente/${id}/exercicio/`, data);
//             alert("Exercício adicionado com sucesso!");
//             setMostrarFormulario(false);
//             window.location.reload();
//         } catch (error) {
//             console.error("Erro ao adicionar exercício:", error);
//             alert("Erro ao adicionar exercício. Tente novamente.");
//         }
//     };

//     const handleOpen = async (id_) => {
//         navigate(`/utente/${id}/exercicio/${id_}`);
//     };

//     useEffect(() => {
//             if (tipoSelecionado) {
//                 setType(tipoSelecionado);
//                 reset({
//                 ...watch(),
//                 type: tipoSelecionado,
//                 steps: []
//                 });
//                 appendStep(); // Adiciona um passo automaticamente
//             }
//         }, [tipoSelecionado]);
    

//     if (loading){
//         return(
//          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
//         </div>
//         );
//     }
//     // if (error) {
//     //      return (
//     //         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//     //             <p className="text-2xl font-semibold text-center dark:text-white mb-6">Error: {error.message}</p>
//     //         </div>
//     //      ) 
//     // }

//     // if (exercises.length === 0) {
//     //     return ( 
//     //         <div className="flex flex-col items-center mt-10">
//     //             <p>Nenhum dado disponível</p>
//     //         <button
//     //             onClick={() => setShowForm(true)}
//     //             className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
//     //             style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//     //         >
//     //                 Adicionar Exercícios
//     //         </button>
//     //         {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
//     //       </div>
//     //     );
//     // }
        
//     if (exercises.length >= 0) {
//         return (
//                 <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                     <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                     {/* <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100"> */}
//                         <h2 className="text-2xl font-bold text-center mb-5">Lista dos Exercícios</h2>
//                         <table className="min-w-full bg-white border border-gray-300">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="py-2 px-4 border-b">ID</th>
//                                     <th className="py-2 px-4 border-b">Tipo</th>
//                                     <th className="py-2 px-4 border-b">Nome</th>
//                                     <th className="py-2 px-4 border-b">Descrição</th>
//                                     <th className="py-2 px-4 border-b">Ação</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {exercises.map((exercise) => (
//                                     <tr key={exercise._id.$oid || exercise._id}>
//                                         <td className="py-2 px-4 border-b">{exercise._id.$oid || exercise._id.toString()}</td>
//                                         <td className="py-2 px-4 border-b">{exercise.type}</td>
//                                         <td className="py-2 px-4 border-b">{exercise.name}</td>
//                                         <td className="py-2 px-4 border-b">{exercise.description}</td>
//                                         <td className="py-2 px-4 border-b">
//                                             <button onClick={() => handleOpen(exercise._id.$oid || exercise._id.toString())}
//                                                 className="bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
//                                                 Abrir
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody> 
//                         </table>
//                         <button
//                             onClick={() => setShowForm(true)}
//                             className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
//                             style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//                         >
//                                 Adicionar Exercícios
//                         </button>
//                         {showForm && <FloatingForm onClose={() => setShowForm(false)} />}

//                         {/* <button
//                             onClick={() => setMostrarFormulario(true)}
//                             className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
//                             style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//                         >
//                                 Adicionar Exercícios
//                         </button>
//                         {mostrarFormulario && (
//                             <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
//                                 <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                                 <h2 className="text-9xl font-semibold text-center text-black dark:text-white mb-4">Adicionar Exercício Génerico</h2>
                                
//                                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
//                                     <div className="max-h-[70vh] overflow-y-auto pr-2">
//                                         {/* Tipo de Exercício *}
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span></label>
//                                         <select
//                                             {...register('tipo', { required: "Selecione um tipo." })}
//                                             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                         >
//                                             <option value="">Selecione...</option>
//                                             <option value="palavras">Repetição de Palavras</option>
//                                             <option value="frases">Repetição de Frases</option>
//                                             <option value="leitura">Atividades de Leitura</option>
//                                             <option value="discurso">Discurso Espontâneo</option>
//                                             <option value="diadococinesia">Diadococinésia</option>
//                                             <option value="novo">Novo</option>
//                                         </select>
//                                         <ErrorMessage errors={errors} name="tipo" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                         </div>
                            
//                                         {/* Tipo (invisível) *}
                                        
//                                         {type === 'novo'? (
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span></label>
//                                         <input
//                                             type="text"
//                                             {...register("type", { required: "Tipo do exercício é obrigatório." })}
//                                             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                         />
//                                         <ErrorMessage errors={errors} name="type" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                         </div>
//                                         ):(
//                                         <input type="hidden" {...register("type")} />
//                                         )}
//                                         {/* Nome *}
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício <span style={{ color: 'red' }}>*</span></label>
//                                         <input
//                                             type="text"
//                                             {...register("name", { required: "Nome do exercício é obrigatório." })}
//                                             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                         />
//                                         <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                         </div>
//                                         {/* Descrição *}
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
//                                         <input
//                                             type="text"
//                                             {...register("description", )}
//                                             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                         />
//                                         <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                         </div>
//                                         {/* Tipo de Processamento *}
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento <span style={{ color: 'red' }}>*</span></label>
//                                         <Controller
//                                             name="typeOfProcessing"
//                                             control={control}
//                                             rules={{
//                                             required: "Selecione pelo menos um tipo de Processamento.",
//                                             validate: value => value?.length > 0 || "Selecione pelo menos um tipo."
//                                             }}
//                                             render={({ field }) => (
//                                             <MultiSelect
//                                                 {...field}
//                                                 options={options}
//                                                 optionLabel="label"
//                                                 optionValue="value"
//                                                 filter 
//                                                 placeholder="Selecione os tipos de processamento"
//                                                 display="chip"
//                                                 className="w-full md:w-20rem "
                                                
//                                             />
//                                             )}
//                                         />
//                                         <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                         </div>
                                        
//                                         {/* Passos dinâmicos *}
//                                         <div className="mb-4 p-2 rounded">
//                                         {type !== null && (
//                                             <>
//                                             {fields.length > 0 && (
//                                                 <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//                                                     <h3 className="text-lg font-semibold mb-2">Passos <span style={{ color: 'red' }}>*</span></h3>
//                                                     {fields.map((field, index) => (
//                                                         <div key={field.id} className="mb-4 border p-2 rounded">
//                                                             {type === 'novo' ? (
//                                                                 <>
//                                                                     <div className="mb-2">
//                                                                         <label className="block text-sm">Instrução: <span style={{ color: 'red' }}>*</span></label>
//                                                                         <input
//                                                                             {...register(`steps.${index}.description`, { required: true })}
//                                                                             className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                         />
//                                                                     </div>
//                                                                     <div className="mb-2">
//                                                                         <label className="block text-sm">Label: <span style={{ color: 'red' }}>*</span></label>
//                                                                         <input
//                                                                             {...register(`steps.${index}.label`, { required: true })}
//                                                                             className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                         />
//                                                                     </div>
//                                                                     <div className="mb-2">
//                                                                         <label className="block text-sm">Valor: <span style={{ color: 'red' }}>*</span></label>
//                                                                         <input
//                                                                             {...register(`steps.${index}.value`, { required: true })}
//                                                                             className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                         />
//                                                                     </div>
//                                                                     <div className="mb-2">
//                                                                         <label className="block text-sm">ID: <span style={{ color: 'red' }}>*</span></label>
//                                                                         <input
//                                                                             {...register(`steps.${index}.id`, { required: true })}
//                                                                             className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                         />
//                                                                     </div>
//                                                                 </>
//                                                             ) : (
//                                                                 (camposPorTipo[type] || []).map((campo, campoIdx) => {
//                                                                     const fieldName = camposPorTipoEn[type]?.[campoIdx]; // nome interno (ex: 'word', 'description')
                            
//                                                                     return (
//                                                                         <div className="mb-2" key={campo}>
//                                                                         <label className="block text-sm capitalize">{campo}: <span style={{ color: 'red' }}>*</span></label>
//                                                                         {campo === 'Texto' ? (
//                                                                             <textarea
//                                                                             {...register(`steps.${index}.${fieldName}`, { required: true })}
//                                                                             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                                                             ></textarea>
//                                                                         ) : (
//                                                                             <input
//                                                                             {...register(`steps.${index}.${fieldName}`, { required: true })}
//                                                                             className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                             />
//                                                                         )}
//                                                                         </div>
//                                                                     );
//                                                                     })
//                                                             )}
//                                                             <button
//                                                                 type="button"
//                                                                 onClick={() => remove(index)}
//                                                                 className="mt-2 text-red-600 hover:underline rounded"
//                                                             >
//                                                                 Remover
//                                                             </button>
//                                                         </div>
//                                                     ))}
//                                                     <button
//                                                         type="button"
//                                                         onClick={appendStep}
//                                                         className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                                     >
//                                                         Adicionar mais passos
//                                                     </button>
//                                                 </div>
                                            
//                                             )}
//                                             </>
//                                         )}
//                                         </div>
//                                     </div>
//                                     <div className="border-t my-4"></div>
//                                     <div className="text-sm text-gray-600 dark:text-black">Campos com <span style={{ color: 'red' }}>*</span> são obrigatórios.</div>
//                                     <div className="text-sm text-gray-600 dark:text-red-500">Todos os campos com exceção de "ID dos passos" serão transmitidos ao utente pelo Assistente.</div>
//                                     <div className="border-t my-4"></div>
                        
//                                     {/* Botões *}
//                                     <div className="flex justify-between mt-4">
//                                         <button
//                                             type="submit"
//                                             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                         >
//                                             Adicionar
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => setMostrarFormulario(false)}
//                                             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                                         >
//                                             Cancelar
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         )} */}
//             </div>
//         </div>
//         ); 
//     }
// }


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../../../../../frontend/src/api";
import FloatingForm from "./floatingExerciseForm";
import { MultiSelect } from "primereact/multiselect";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Loader2, Plus, Trash2, ClipboardList } from "lucide-react";

export default function AllExercise() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { tipo: "", steps: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "steps" });

  const tipoSelecionado = watch("tipo");
  const [type, setType] = useState("");

  const camposPorTipo = {
    palavras: ["Palavras", "Instrução", "ID"],
    frases: ["Frase", "Instrução", "ID"],
    leitura: ["Título", "Texto", "Instrução", "ID"],
    discurso: ["Questão", "Instrução", "ID"],
    diadococinesia: ["Tipo de Consoante", "Sílabas", "Instrução", "ID"],
    novo: ["descrição", "label", "valor", "ID"],
  };

  const camposPorTipoEn = {
    palavras: ["word", "description", "ID"],
    frases: ["sentence", "description", "ID"],
    leitura: ["title", "text", "description", "ID"],
    discurso: ["question", "description", "ID"],
    diadococinesia: ["typeOfConsonant", "syllables", "description", "ID"],
    novo: ["description", "label", "value", "ID"],
  };

  const appendStep = () => {
    if (type === "novo") {
      append({
        description: "",
        id: "",
        pairs: [{ label: "", value: "" }],
      });
    } else {
      const campos = camposPorTipo[type] || [];
      const novoStep = Object.fromEntries(campos.map((key) => [key, ""]));
      append(novoStep);
    }
  };

  const options = [
    { label: "Articulação", value: "articulation" },
    { label: "Fonação", value: "phonation" },
    { label: "Glota", value: "glotta" },
    { label: "Prosódia", value: "prosody" },
    { label: "Reaprendizagem", value: "replearning" },
    { label: "Fonológico", value: "phonological" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/utente/${id}/exercicio/`);
        setExercises(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (tipoSelecionado) {
      setType(tipoSelecionado);
      reset({ ...watch(), type: tipoSelecionado, steps: [] });
      appendStep();
    }
  }, [tipoSelecionado]);

  const onSubmit = async (data) => {
    try {
      await api.post(`/utente/${id}/exercicio/`, data);
      alert("Exercício adicionado com sucesso!");
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      alert("Erro ao adicionar exercício.");
    }
  };

  const handleOpen = (exerciseId) => {
    navigate(`/utente/${id}/exercicio/${exerciseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <Loader2 className="animate-spin w-10 h-10 text-primary mb-3" />
        <p className="text-lg font-semibold dark:text-white">Carregando exercícios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-primary" />
            Lista de Exercícios
          </h1>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded">
            <Plus size={18} /> Novo Exercício
          </Button>
        </div>

        {exercises.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-300">
              Nenhum exercício encontrado para este utente.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <Card 
                 key={exercise._id.$oid || exercise._id}
                 className="hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => handleOpen(exercise._id.$oid || exercise._id)}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Tipo:</strong> {exercise.type}</p>
                  <p><strong>Descrição:</strong> {exercise.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end ">
                  <Button size="sm"  className="hover:bg-primary hover:text-white rounded">
                    Abrir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {showForm && (
          <FloatingForm
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            register={register}
            errors={errors}
            fields={fields}
            appendStep={appendStep}
            remove={remove}
            options={options}
            type={type}
          />
        )}
      </div>
    </div>
  );
}
