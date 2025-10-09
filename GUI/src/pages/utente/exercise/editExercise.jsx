
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../api";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

// export default function EditExercise() {
//   const { id, id_exercise } = useParams(); // Pega o ID da URL
//   const navigate = useNavigate();
//   const [exercise, setExercise] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchExercise() {
//       try {
//         const res = await api.get(`/utente/exercicio/${id_exercise}`);
//         console.log(res.data);
//         setExercise(res.data);
//       } catch (err) {
//         setError("Erro ao carregar os dados do exercício.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchExercise();
//   }, [id_exercise]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExercise((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/utente/exercicio/${id_exercise}`, exercise);
//       alert("Exercício atualizado com sucesso!");
//        navigate(`/utente/${id}/exercicio/${id_exercise}`);
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao atualizar o exercício.");
//     }
//   };

//   if (loading) return <p>Carregando...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Editar Exercício</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Nome:</label>
//           <input
//             type="text"
//             name="name"
//             value={utente.name || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={utente.email || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         {/* Adiciona mais campos conforme necessário, como profissão, data de nascimento etc. */}
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Número de Utente:</label>
//           <input
//             type="number"
//             name="health_user_number"
//             value={utente.health_user_number || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Morada:</label>
//           <input
//             type="text"
//             name="address"
//             value={utente.address || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Condição de Saúde:</label>
//           <input
//             type="text"
//             name="medical_condition"
//             value={utente.medical_condition || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Telemóvel:</label>
//           <PhoneInput
//             defaultCountry="PT"
//             international
//             name="cellphone"
//             value={utente.cellphone || ""}
//             onChange={(value) => setUtente((prev) => ({ ...prev, cellphone: value }))}
//             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Observação:</label>
//           <textarea
//             name="observation"
//             value={utente.observation || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//             rows="3"
//           ></textarea>
//         </div>


//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Data de Nascimento:</label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={utente.date_of_birth?.slice(0, 10) || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div className="flex items-center">
//           <button
//           type="submit"
//           className="bg-green-500 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Salvar Alterações
//         </button>
//         </div>
        
//         <button
//           type="button"
//           onClick={() => navigate(`/utente/${id}/informacao`)}
//           className="bg-amber-500 dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded ml-2"
//         >
//           Cancelar
//         </button>
//       </form>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Plus, Trash2 } from 'lucide-react';
// import api from "../../../api";
// import { useParams, useNavigate } from 'react-router-dom';
// import { ErrorMessage } from "@hookform/error-message";

// const mapTipo = () => ({
//   articulacao: 'articulation',
//   prosodia: 'prosody',
//   fonacao: 'phonation',
//   glota: 'glottal',
//   reaprendizado: 'relearning',
//   novo: ''
// });

// export default function EditarExercicioForm() {
//   const { id, exercicioId } = useParams();
//   const navigate = useNavigate();
//   const [type, setType] = useState('articulacao');

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       userId: id,
//       tipo: 'articulacao',
//       type: 'articulation',
//       name: '',
//       description: '',
//       typeOfProcessing: '',
//       steps: []
//     }
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: 'steps' });
//   const selectedTipo = watch('tipo');

//   useEffect(() => {
//     const fetchExercicio = async () => {
//       try {
//         const res = await api.get(`/utente/exercicio/${exercicioId}/`);
//         const exercicio = res.data;

//         const tipoKey = Object.entries(mapTipo()).find(([k, v]) => v === exercicio.type)?.[0] || 'novo';
//         setType(tipoKey);

//         reset({
//           userId: exercicio.userId,
//           tipo: tipoKey,
//           type: exercicio.type,
//           name: exercicio.name,
//           description: exercicio.description,
//           typeOfProcessing: exercicio.typeOfProcessing,
//           steps: exercicio.steps || []
//         });
//       } catch (err) {
//         console.error('Erro ao carregar exercício:', err);
//       }
//     };

//     fetchExercicio();
//   }, [id, exercicioId, reset]);

//   const onSubmit = async (data) => {
//     try {
//       await api.put(`/utente/exercicio/${exercicioId}`, data);
//       navigate(`/utente/${id}/exercicio/${exercicioId}`);
//     } catch (err) {
//       console.error('Erro ao editar exercício:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Editar Exercício</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div>
//             <label>Tipo</label>
//             <select {...register('tipo', { required: true })} className="w-full p-2 rounded dark:bg-zinc-700 dark:text-white">
//             <option value="articulacao">Articulação</option>
//             </select>
//         </div>

//         {type === 'novo' && (
//             <div>
//             <label>Novo tipo</label>
//             <input {...register('type', { required: true })} placeholder="Digite o novo tipo" />
//             {errors.type && <p className="text-red-500">Campo obrigatório</p>}
//             </div>
//         )}

//         <div>
//             <label>Nome</label>
//             <input {...register('name', { required: true })} />
//             {errors.name && <p className="text-red-500">Campo obrigatório</p>}
//         </div>

//         <div>
//             <label>Descrição</label>
//             <textarea {...register('description')} />
//         </div>

//         <div>
//             <label>Tipo de Processamento</label>
//             <input {...register('typeOfProcessing')} />
//         </div>

//         <div>
//             <label>Passos</label>
//             {fields.map((field, index) => (
//             <div key={field.id} className="border rounded p-4 space-y-2 relative">
//                 <input {...register(`steps.${index}.title`, { required: true })} placeholder="Título do passo" />
//                 <textarea {...register(`steps.${index}.description`)} placeholder="Descrição do passo" />
//                 <button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="absolute top-2 right-2">
//                 <Trash2 size={16} />
//                 </button>
//             </div>
//             ))}
//             <button type="button" variant="outline" onClick={() => append({ title: '', description: '' })}>
//             <Plus className="mr-2" size={16} /> Adicionar passo
//             </button>
//         </div>

//         <button type="submit">Guardar alterações</button>
//         </form>
//         <button onClick={() => navigate(`/utente/${id}/exercicio/${exercicioId}`)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
//           Cancelar
//         </button>
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import api from '../../../api';
// import { ErrorMessage } from '@hookform/error-message';
// import { useNavigate } from 'react-router-dom';

// import { MultiSelect } from 'primereact/multiselect';
// import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// export default function EditarExercicioForm () {
//     const { id, id_ } = useParams();
//     const [type, setType] = useState('');
//     const [exercicio, setExercise] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         control,
//         watch,
//         reset,
//         formState: { errors }
//     } = useForm({
//         defaultValues: {
//             user: id,
//             userName: "",
//             tipo: "",
//             type: "",
//             name: "",
//             description: "",
//             typeOfProcessing: "",
//             steps: [],
//             tipoSelecionado: "",
//             therapist: "",
//             ID: "",
//         }
//     });



//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'steps'
//     });

//     // Buscar exercício
//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         console.log('Fetching exercise with ID:', id_);
//         if (!id_) {
//           throw new Error('ID do exercício não fornecido');
//         }

//         const response = await api.get(`/utente/exercicio/${id_}/`);
//         const data = response.data;

//         setExercise(data);

//         // ⚠️ Atualiza o formulário com os dados recebidos
//         reset({
//           user: data.user || "",
//           userName: data.userName || "",
//           tipo: tipoPorLabel[data.type] ? tipoPorLabel[data.type] : "novo",
//           type: data.type || "",
//           name: data.name || "",
//           description: data.description || "",
//           typeOfProcessing: Array.isArray(data.typeOfProcessing)? data.typeOfProcessing : [data.typeOfProcessing],
//           steps: data.steps || [],
//           therapist: data.therapist || "",
//           ID: data.ID || ""
//         });
        

//       } catch (error) {
//         console.error('Erro ao buscar exercício:', error);
//         setError('Erro ao buscar exercício.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExercise();
//   }, [id_, reset]);

    
//     const camposPorTipo = {
//     palavras: ['Palavras', 'Descrição','ID'],
//     frases: ['Frase', 'Descrição','ID'],
//     leitura: ['Título', 'Texto', 'Descrição', 'ID'],
//     discurso: ['Questão', 'Descrição','ID'],
//     diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição','ID'],
//     novo: ['label', 'valor','ID']
//   };

//   const camposPorTipoEn = {
//     palavras: ['word', 'description','ID'],
//     frases: ['sentence', 'description','ID'],
//     leitura: ['title', 'text', 'description','ID'],
//     discurso: ['question', 'description','ID'],
//     diadococinesia: ['typeOfConsonant', 'syllables', 'description','ID'],
//     novo: ['label', 'value','ID']
//   };

//     const tipoPorLabel = {
//         'Repetição de Palavras': 'palavras',
//         'Repetição de Frases': 'frases',
//         'Atividades de Leitura': 'leitura',
//         'Discurso Espontâneo': 'discurso',
//         'Diadococinésia': 'diadococinesia'
//     };

//     const mapTipo = (tipo) => {
//         return {
//         palavras: 'Repetição de Palavras',
//         frases: 'Repetição de Frases',
//         leitura: 'Atividades de Leitura',
//         discurso: 'Discurso Espontâneo',
//         diadococinesia: 'Diadococinésia'
//         }[tipo] || tipo;
//     };

//     useEffect(() => {
//         const subscription = watch((value) => {
//             setType(value.tipo); // Atualiza o estado com o novo tipo selecionado
//         });

//         return () => subscription.unsubscribe(); // limpa subscrição
//     }, [watch]);

    
//     // const tipoInicial = tipoPorLabel[exercicio.type] || 'novo';


//     const tipoSelecionado = watch('tipo');

//     const appendStep = () => {
//         if (tipoSelecionado === 'novo') {
//         append({ label: '', value: '' });
//         } else {
//         const campos = camposPorTipo[tipoSelecionado] || [];
//         const novoStep = Object.fromEntries(campos.map((key) => [camposPorTipoEn[tipoSelecionado][campos.indexOf(key)], '']));
//         append(novoStep);
//         }
//     };

//     const onSubmit = async (data) => {
//         try {
//             data.type = mapTipo(data.tipo);
//             if (!Array.isArray(data.typeOfProcessing)) {
//                 data.typeOfProcessing = [data.typeOfProcessing];
//             }
//             await api.put(`/utente/exercicio/${id_}/`, data);
//             alert('Exercício editado com sucesso!');
//             window.history.back();
//         } catch (error) {
//             console.error('Erro ao editar exercício:', error);
//             alert('Erro ao editar exercício.');
//         }
//     };

//     // useEffect(() => {
//     //     setType(tipoSelecionado);
//     // }, [tipoSelecionado]);

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

//     if (!exercicio) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                 <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Exercício não encontrado.</p>
//             </div>
//         );
//     }
//     const campos = camposPorTipo[tipoSelecionado] || [];
//     const camposEn = camposPorTipoEn[tipoSelecionado] || [];
//     const isNovo = tipoSelecionado === 'novo';

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4 p-5">
//         {/* <div className=" w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
//         <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">

//             <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Editar Exercício</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <input type="hidden" {...register('user')} />
//             <input type="hidden" {...register('therapist')} />
//             <input type="hidden" {...register('userName')} />

//             <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span></label>
//                 <select {...register('tipo', { required: true })} 
//                  className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                 >
//                 <option value="">Selecione...</option>
//                 <option value="palavras">Repetição de Palavras</option>
//                 <option value="frases">Repetição de Frases</option>
//                 <option value="leitura">Atividades de Leitura</option>
//                 <option value="discurso">Discurso Espontâneo</option>
//                 <option value="diadococinesia">Diadococinésia</option>
//                 <option value="novo">Novo</option>
//                 </select>
//                 <ErrorMessage errors={errors} name="tipo" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//             </div>

//             {tipoSelecionado === 'novo' && (
//                 <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo personalizado <span style={{ color: 'red' }}>*</span></label>
//                 <input {...register('type', { required: true })} 
//                  className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                 />
//                 </div>
//             )}

//             <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome <span style={{ color: 'red' }}>*</span></label>
//                 <input {...register('name', { required: true })} 
//                  className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                 />
//             </div>

//             <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
//                 <input {...register('description')} 
//                  className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                 />
//             </div>

//             <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento <span style={{ color: 'red' }}>*</span></label>
//                 <Controller
//                     name="typeOfProcessing"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                         <MultiSelect
//                             {...field}
//                             options={[
//                                 { label: 'Articulação', value: 'articulation' },
//                                 { label: 'Fonação', value: 'phonation' },
//                                 { label: 'Glota', value: 'glotta' },
//                                 { label: 'Prosódia', value: 'prosody' },
//                                 { label: 'Reaprendizagem', value: 'relearning' },
//                                 { label: 'Fonológico', value: 'phonological' }
//                             ]}
//                             placeholder="Selecione os tipos de processamento"
//                             filter
//                             display="chip"
//                             className="w-full h-16 p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-600 dark:text-black"
//                         />
//                     )}
//                 />
//                 <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//             </div>

//             <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300">
//                 <h3 className="text-lg font-semibold mb-2">Passos <span style={{ color: 'red' }}>*</span></h3>
//                 {fields.map((field, index) => (
//                 <div key={field.id} className="mb-4 border p-2 rounded">
//                     {(tipoSelecionado === 'novo' ? camposPorTipo['novo'] : camposPorTipo[tipoSelecionado] || []).map((campo, i) => {
//                     const key = tipoSelecionado === 'novo' ? campo.toLowerCase() : camposPorTipoEn[tipoSelecionado][i];
//                     const isTextarea = campo === 'Texto';
//                     return (
//                         <div className="mb-2 " key={campo}>
//                         <label className="block text-sm capitalize">{campo} <span style={{ color: 'red' }}>*</span></label>
//                         {isTextarea ? (
//                             <textarea {...register(`steps.${index}.${key}`, { required: true })} 
//                                 className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                             />
//                         ) : (
//                             <input {...register(`steps.${index}.${key}`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-700 " />
//                         )}
//                         </div>
//                     );
//                     })}
//                     <button type="button" onClick={() => remove(index)} className="text-red-600 rounded hover:underline">Remover</button>
//                 </div>
//                 ))}
//                 <button type="button" onClick={appendStep} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//                 Adicionar passo
//                 </button>
//             </div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">* Campos obrigatórios</div>

//             <div className="flex justify-between mt-4">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
//                 <button type="button" onClick={() => window.history.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
//                 Cancelar
//                 </button>
//             </div>
//             </form>
//         </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";
import { ErrorMessage } from "@hookform/error-message";
import { MultiSelect } from "primereact/multiselect";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function EditarExercicioForm() {
  const { id, id_ } = useParams();
  const [type, setType] = useState("");
  const [exercicio, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: id,
      userName: "",
      tipo: "",
      type: "",
      name: "",
      description: "",
      typeOfProcessing: "",
      steps: [],
      therapist: "",
      ID: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const tipoPorLabel = {
    "Repetição de Palavras": "palavras",
    "Repetição de Frases": "frases",
    "Atividades de Leitura": "leitura",
    "Discurso Espontâneo": "discurso",
    Diadococinésia: "diadococinesia",
  };

  const mapTipo = (tipo) =>
    ({
      palavras: "Repetição de Palavras",
      frases: "Repetição de Frases",
      leitura: "Atividades de Leitura",
      discurso: "Discurso Espontâneo",
      diadococinesia: "Diadococinésia",
    }[tipo] || tipo);

  const camposPorTipo = {
    palavras: ["Palavras", "Descrição", "ID"],
    frases: ["Frase", "Descrição", "ID"],
    leitura: ["Título", "Texto", "Descrição", "ID"],
    discurso: ["Questão", "Descrição", "ID"],
    diadococinesia: ["Tipo de Consoante", "Sílabas", "Descrição", "ID"],
    novo: ["label", "valor", "ID"],
  };

  const camposPorTipoEn = {
    palavras: ["word", "description", "ID"],
    frases: ["sentence", "description", "ID"],
    leitura: ["title", "text", "description", "ID"],
    discurso: ["question", "description", "ID"],
    diadococinesia: ["typeOfConsonant", "syllables", "description", "ID"],
    novo: ["label", "value", "ID"],
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id_) throw new Error("ID do exercício não fornecido");

        const response = await api.get(`/utente/exercicio/${id_}/`);
        const data = response.data;

        setExercise(data);
        reset({
          user: data.user || "",
          userName: data.userName || "",
          tipo: tipoPorLabel[data.type] ?? "novo",
          type: data.type || "",
          name: data.name || "",
          description: data.description || "",
          typeOfProcessing: Array.isArray(data.typeOfProcessing)
            ? data.typeOfProcessing
            : [data.typeOfProcessing],
          steps: data.steps || [],
          therapist: data.therapist || "",
          ID: data.ID || "",
        });
      } catch (err) {
        console.error("Erro ao buscar exercício:", err);
        setError("Erro ao buscar exercício.");
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id_, reset]);

  const tipoSelecionado = watch("tipo");

  useEffect(() => {
    const subscription = watch((value) => {
      setType(value.tipo);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const appendStep = () => {
    if (tipoSelecionado === "novo") {
      append({ label: "", value: "" });
    } else {
      const campos = camposPorTipo[tipoSelecionado] || [];
      const novoStep = Object.fromEntries(
        campos.map((_, i) => [camposPorTipoEn[tipoSelecionado][i], ""])
      );
      append(novoStep);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      data.type = mapTipo(data.tipo);
      if (!Array.isArray(data.typeOfProcessing)) {
        data.typeOfProcessing = [data.typeOfProcessing];
      }
      await api.put(`/utente/exercicio/${id_}/`, data);
      alert("Exercício editado com sucesso!");
      navigate(-1);
    } catch (err) {
      console.error("Erro ao editar exercício:", err);
      alert("Erro ao editar exercício.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!exercicio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-lg font-semibold dark:text-white">
          Exercício não encontrado.
        </p>
      </div>
    );
  }

  const campos = camposPorTipo[tipoSelecionado] || [];
  const camposEn = camposPorTipoEn[tipoSelecionado] || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4 py-8">
      <Card className="w-full max-w-3xl shadow-xl dark:bg-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Editar Exercício</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Hidden Fields */}
            <input type="hidden" {...register("user")} />
            <input type="hidden" {...register("therapist")} />
            <input type="hidden" {...register("userName")} />

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Exercício <span className="text-red-500">*</span>
              </label>
              <select
                {...register("tipo", { required: "Campo obrigatório" })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              >
                <option value="">Selecione...</option>
                <option value="palavras">Repetição de Palavras</option>
                <option value="frases">Repetição de Frases</option>
                <option value="leitura">Atividades de Leitura</option>
                <option value="discurso">Discurso Espontâneo</option>
                <option value="diadococinesia">Diadococinésia</option>
                <option value="novo">Novo</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="tipo"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            {/* Tipo Personalizado */}
            {tipoSelecionado === "novo" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo Personalizado <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("type", { required: "Campo obrigatório" })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
              </div>
            )}

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: "Campo obrigatório" })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <input
                {...register("description")}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>

            {/* Tipo de Processamento */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Processamento <span className="text-red-500">*</span>
              </label>
              <Controller
                name="typeOfProcessing"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    options={[
                      { label: "Articulação", value: "articulation" },
                      { label: "Fonação", value: "phonation" },
                      { label: "Glota", value: "glotta" },
                      { label: "Prosódia", value: "prosody" },
                      { label: "Reaprendizagem", value: "relearning" },
                      { label: "Fonológico", value: "phonological" },
                    ]}
                    placeholder="Selecione os tipos de processamento"
                    filter
                    display="chip"
                    className="w-full dark:bg-zinc-900 dark:border-zinc-600"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="typeOfProcessing"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            {/* Passos */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Passos</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-4 border p-3 rounded-md">
                  {(tipoSelecionado === "novo"
                    ? camposPorTipo["novo"]
                    : campos
                  ).map((campo, i) => {
                    const key =
                      tipoSelecionado === "novo"
                        ? campo.toLowerCase()
                        : camposEn[i];
                    const isTextarea = campo === "Texto";
                    return (
                      <div key={campo} className="mb-2">
                        <label className="block text-sm mb-1">
                          {campo} <span className="text-red-500">*</span>
                        </label>
                        {isTextarea ? (
                          <textarea
                            {...register(`steps.${index}.${key}`, {
                              required: true,
                            })}
                            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                          />
                        ) : (
                          <input
                            {...register(`steps.${index}.${key}`, {
                              required: true,
                            })}
                            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                          />
                        )}
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    className="mt-2 flex items-center gap-2 rounded"
                  >
                    <Trash2 size={16} /> Remover passo
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={appendStep}
                className="flex items-center gap-2 mt-2 rounded"
              >
                <PlusCircle size={18} /> Adicionar passo
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="text-red-500">*</span> Campos obrigatórios
            </p>

            <CardFooter className="flex justify-between gap-3 pt-4">
              <Button type="submit" className=" w-30 flex items-center gap-2 rounded" disabled={saving}>
                {saving && <Loader2 className="animate-spin w-4 h-4" />}
                Guardar
              </Button>
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-30 flex items-center gap-2 rounded"
              >
                Cancelar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

