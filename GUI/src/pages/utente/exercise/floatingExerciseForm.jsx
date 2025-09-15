// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import api from "../../../api";
// import { useParams } from 'react-router-dom';
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import '../../../App.css';
// import 'react-phone-number-input/style.css';
// import { MultiSelect } from 'primereact/multiselect';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import { StepFields } from './StepFields';
// import { ExerciseMetaFields } from './ExerciseMetaFields';

// function ExerciseSteps({ type, fields, camposPorTipo, camposPorTipoEn, editable, register, remove, appendStep }) {
//   if (!fields || fields.length === 0) return null;
//   return (
//     <div className="w-full p-5 px-3 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//       <h3 className="text-lg font-semibold mb-2">Passos <span style={{ color: 'red' }}>*</span></h3>
//       {fields.map((field, index) => (
//         <div key={field.id || index}  className="mb-4">
//           <StepFields
//             index={index}
//             type={type}
//             field={field}
//             camposPorTipo={camposPorTipo}
//             camposPorTipoEn={camposPorTipoEn}
//             editable={editable}
//             register={register}
//             remove={remove}
//           />
//         </div>
//       ))}
//       {editable && (
//         <button type="button" onClick={appendStep} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Adicionar mais passos</button>
//       )}
//     </div>
//   );
// }

// function ExerciseSelectedDetails({ dadosExercicioSelecionado, modoEdicao, setDadosExercicioSelecionado, control, options, errors, type, camposPorTipo, camposPorTipoEn, register, remove, appendStep, fields }) {
//   if (!dadosExercicioSelecionado) return null;
//   return (
//     <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-600 dark:border-zinc-600 dark:text-white">
//       <div>
//         <label className="font-bold">Nome<span style={{ color: 'red' }}>*</span></label>
//         <input type="text" {...register("name")} readOnly={modoEdicao === "default"} onChange={(e) => modoEdicao === "personalizar" && setDadosExercicioSelecionado({ ...dadosExercicioSelecionado, name: e.target.value })} className={`border p-2 w-full rounded ${modoEdicao === "default" ? "bg-gray-400" : "bg-gray-800"}`} />
//       </div>
//       <div>
//         <label className="font-bold">Descrição </label>
//         <textarea {...register("description")} readOnly={modoEdicao === "default"} onChange={(e) => modoEdicao === "personalizar" && setDadosExercicioSelecionado({ ...dadosExercicioSelecionado, description: e.target.value })} className={`border p-2 w-full rounded ${modoEdicao === "default" ? "bg-gray-400" : "bg-gray-800"}`} />
//       </div>
//       <div className="mb-4">
//         <label className="font-bold">Tipo de Processamento <span style={{ color: 'red' }}>*</span></label>
//         {modoEdicao === "default" ? (
//           <Controller
//             name="typeOfProcessing"
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <MultiSelect {...field} value={Array.isArray(dadosExercicioSelecionado.typeOfProcessing) ? dadosExercicioSelecionado.typeOfProcessing : [dadosExercicioSelecionado.typeOfProcessing]} options={options} optionLabel="label" optionValue="value" display="chip" disabled className="w-full md:w-20rem bg-gray-400" />
//             )}
//           />
//         ) : (
//         <Controller
//             name="typeOfProcessing"
//             control={control}
//             rules={{ required: "Selecione pelo menos um tipo." }}
//             render={({ field }) => (
//                 <MultiSelect
//                 {...field}
//                 value={field.value || []}  // ✅ agora controlado pelo RHF
//                 onChange={(e) => field.onChange(e.value)} // ✅ garante atualização
//                 options={options}
//                 optionLabel="label"
//                 optionValue="value"
//                 filter
//                 placeholder="Selecione os tipos de processamento"
//                 display="chip"
//                 disabled={modoEdicao === "default"}
//                 className={`w-full md:w-20rem ${
//                     modoEdicao === "default" ? "bg-gray-400" : "bg-gray-800"
//                 }`}
//                 />
//             )}
//         />
//         )}
//         <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => (<p className="text-red-500 text-sm">{message}</p>)} />
//       </div>
//       <div className="mb-4">
//         {type !== null && dadosExercicioSelecionado.steps.length > 0 && (
//           <ExerciseSteps
//             type={type}
//             // fields={dadosExercicioSelecionado.steps}
//             fields={fields}
//             camposPorTipo={camposPorTipo}
//             camposPorTipoEn={camposPorTipoEn}
//             editable={modoEdicao === "personalizar"}
//             register={register}
//             remove={remove}
//             appendStep={appendStep}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default function FloatingForm({ onClose }) {
//   const { id } = useParams();
//   const [type, setType] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState([]);
//   const [exercicioSelecionadoId, setExercicioSelecionadoId] = useState('');
//   const [dadosExercicioSelecionado, setDadosExercicioSelecionado] = useState(null);
//   const [modoEdicao, setModoEdicao] = useState('default');

//   const exercicioSelecionado = useMemo(() => exerciciosDisponiveis.find(ex => ex._id.toString() === exercicioSelecionadoId), [exerciciosDisponiveis, exercicioSelecionadoId]);

//   const {
//     register, handleSubmit, watch, setValue, control, reset, formState: { errors }
//   } = useForm({
//     defaultValues: {
//       userId: id,
//       tipo: '',
//       steps: dadosExercicioSelecionado?.steps || [],
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'steps'
//   });

//   const tipoSelecionado = watch('tipo');

//   const camposPorTipo = useMemo(() => ({
//     palavras: ['Palavras', 'Instrução', 'ID'],
//     frases: ['Frase', 'Instrução', 'ID'],
//     leitura: ['Título', 'Texto', 'Instrução', 'ID'],
//     discurso: ['Questão', 'Instrução', 'ID'],
//     diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Instrução', 'ID'],
//     novo: ['Instrução', 'label', 'valor', 'ID']
//   }), []);

//   const camposPorTipoEn = useMemo(() => ({
//     palavras: ['word', 'description', 'ID'],
//     frases: ['sentence', 'description', 'ID'],
//     leitura: ['title', 'text', 'description', 'ID'],
//     discurso: ['question', 'description', 'ID'],
//     diadococinesia: ['typeOfConsonant', 'syllables', 'description', 'ID'],
//     novo: ['description', 'label', 'value', 'ID']
//   }), []);

//   const mapTipo = useCallback((tipo) => {
//     return {
//       palavras: 'Repetição de Palavras',
//       frases: 'Repetição de Frases',
//       leitura: 'Atividades de Leitura',
//       discurso: 'Discurso Espontâneo',
//       diadococinesia: 'Diadococinésia'
//     }[tipo] || tipo;
//   }, []);

//   const options = useMemo(() => [
//     { label: 'Articulação', value: 'articulation' },
//     { label: 'Fonação', value: 'phonation' },
//     { label: 'Glota', value: 'glotta' },
//     { label: 'Prosódia', value: 'prosody' },
//     { label: 'Reaprendizagem', value: 'replearning' },
//     { label: 'Fonological', value: 'phonological' },
//   ], []);

// //   const appendStep = useCallback(() => {
// //     if (type === 'novo') {
// //       append({
// //         description: '',
// //         id: '',
// //         pairs: [{ label: '', value: '' }]
// //       });
// //     } else {
// //       const campos = camposPorTipo[type] || [];
// //       const novoStep = Object.fromEntries(campos.map(key => [key, '']));
// //       append(novoStep);
// //     }
// //   }, [type, append, camposPorTipo]);

// const appendStep = useCallback(() => {
//   if (type === "novo") {
//     // 🔹 Caso especial: type "novo"
//     append({
//       description: "",
//       label: "",
//       value: "",
//       ID: ""
//     });
//   } else {
//     // 🔹 Usa as chaves em inglês (camposPorTipoEn) que o StepFields está a registar
//     const campos = camposPorTipoEn[type] || [];
//     const novoStep = Object.fromEntries(campos.map((key) => [key, ""]));
//     append(novoStep);
//   }
// }, [type, append, camposPorTipoEn]);


//   const onSubmit = async (data) => {
//     try {
//         if (modoEdicao === 'default' && exercicioSelecionado) {
//             const updatedData = {
//                 userId: id,
//                 id: exercicioSelecionado._id,
//                 edit: "default"
//             };
//             const response = await api.post(`/utente/${id}/exercicio/`, updatedData);
//         }
//         else {
//             if (data.type !== 'novo') {
//                 data.type = mapTipo(data.type);
//             }
//             if (typeof data.typeOfProcessing === "string") {
//                 data.typeOfProcessing = [data.typeOfProcessing];
//             }
//             const response = await api.post(`/utente/${id}/exercicio/`, data);
//         }


//       alert("Exercício adicionado com sucesso!");
//       window.location.reload();
//     } catch (error) {
//       console.error("Erro ao adicionar exercício:", error);
//       alert(`Erro ao adicionar exercício: ${error.response?.data?.error || ''} Tente novamente.`);
//     }
//   };

//   // useEffect(() => {
//   //   if (tipoSelecionado) {
//   //     setType(tipoSelecionado);
//   //     reset({
//   //       ...watch(),
//   //       type: tipoSelecionado,
//   //       steps: dadosExercicioSelecionado?.steps || []
//   //     });
//   //     if (!dadosExercicioSelecionado) {
//   //       appendStep();
//   //     }
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [tipoSelecionado]);

//   // useEffect(() => {
//   //   if (tipoSelecionado) {
//   //     setType(tipoSelecionado);

//   //     if (!dadosExercicioSelecionado) {
//   //       reset({
//   //         ...watch(),
//   //         type: tipoSelecionado,
//   //         steps: []
//   //       });
//   //     } else {
//   //       reset({
//   //         ...dadosExercicioSelecionado,
//   //         type: tipoSelecionado,
//   //       });
//   //     }
//   //   }
//   // }, [tipoSelecionado, dadosExercicioSelecionado, reset, watch]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (tipoSelecionado) {
//           const tipo = mapTipo(tipoSelecionado);
//           const response = await api.get(`/utente/exercicios/tipo/${tipo}/`);
//           setExerciciosDisponiveis(response.data);
//         }
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tipoSelecionado]);

//   // useEffect(() => {
//   //   if (exercicioSelecionadoId) {
//   //     const selecionado = exerciciosDisponiveis.find(
//   //       (ex) => ex._id.toString() === exercicioSelecionadoId
//   //     );
//   //     setDadosExercicioSelecionado(selecionado || null);
//   //   } else {
//   //     setDadosExercicioSelecionado(null);
//   //   }
//   // }, [exercicioSelecionadoId, exerciciosDisponiveis]);

//   // useEffect(() => {
//   //   if (exercicioSelecionadoId) {
//   //     const selecionado = exerciciosDisponiveis.find(
//   //       (ex) => ex._id.toString() === exercicioSelecionadoId
//   //     );
//   //     setDadosExercicioSelecionado(selecionado || null);

//   //     if (selecionado) {
//   //       reset({
//   //         ...selecionado,
//   //         type: tipoSelecionado,
//   //         steps: selecionado.steps || []
//   //       });
//   //     }
//   //   } else {
//   //     setDadosExercicioSelecionado(null);
//   //   }
//   // }, [exercicioSelecionadoId, exerciciosDisponiveis, reset, tipoSelecionado]);

//   // useEffect(() => {
//   //   if (exercicioSelecionadoId) {
//   //     // 🚨 Selecionou um exercício existente
//   //     const selecionado = exerciciosDisponiveis.find(
//   //       (ex) => ex._id.toString() === exercicioSelecionadoId
//   //     );

//   //     if (selecionado) {
//   //       setDadosExercicioSelecionado(selecionado);

//   //       reset({
//   //         ...selecionado,
//   //         userId: id,
//   //         type: tipoSelecionado,              // mantém o tipo escolhido
//   //         steps: selecionado.steps || [],     // popula os steps no useFieldArray
//   //       });
//   //     }
//   //   } else if (tipoSelecionado) {
//   //     // 🚨 Criar novo exercício do tipo selecionado
//   //     setDadosExercicioSelecionado(null);

//   //     reset({
//   //       userId: id,
//   //       type: tipoSelecionado,
//   //       steps: [], // começa vazio
//   //     });

//   //     if (tipoSelecionado === "novo") {
//   //       appendStep(); // só adiciona automaticamente no tipo "novo"
//   //     }
//   //   }
//   // }, [exercicioSelecionadoId, tipoSelecionado, exerciciosDisponiveis, reset, id, appendStep]);

//   useEffect(() => {
//     // mantém em sync o estado local usado no appendStep / StepFields
//     if (tipoSelecionado) setType(tipoSelecionado);

//     if (exercicioSelecionadoId) {
//       const selecionado = exerciciosDisponiveis.find(
//         (ex) => ex._id.toString() === exercicioSelecionadoId
//       );

//       if (selecionado) {
//         setDadosExercicioSelecionado(selecionado);

//         reset({
//           // inclui todos os campos do exercício
//           ...selecionado,
//           userId: id,
//           // MUITO IMPORTANTE: preserva o select do tipo
//           tipo: tipoSelecionado,
//           // garante que steps entram no RHF/useFieldArray
//           steps: selecionado.steps || [],
//           // se precisares, normaliza este campo:
//           // typeOfProcessing: Array.isArray(selecionado.typeOfProcessing)
//           //   ? selecionado.typeOfProcessing
//           //   : [selecionado.typeOfProcessing].filter(Boolean),
//           // mantém "type" técnico que usas para mapear labels
//           type: tipoSelecionado,
//         });
//       }
//     }  else if (tipoSelecionado) {
//       setDadosExercicioSelecionado(null);

//       reset({
//         userId: id,
//         tipo: tipoSelecionado,
//         type: tipoSelecionado,
//         steps: [], // começa sempre vazio
//       });

//       // Só adiciona um step automático se o tipo for "novo"
//       if (tipoSelecionado === "novo") {
//         appendStep();
//       }
//     }

//   }, [
//     exercicioSelecionadoId,
//     tipoSelecionado,
//     exerciciosDisponiveis,
//     reset,
//     id,
//     appendStep,
//     setType,
//   ]);




//   return (
//     <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Adicionar Exercício para Utente</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input type="text" {...register("userId", { required: "Id do utilizador é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" readOnly hidden />
//           <ErrorMessage errors={errors} name="userId" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span> </label>
//             <select {...register('tipo', { required: "Selecione um tipo." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//               <option value="">Selecione...</option>
//               <option value="palavras">Repetição de Palavras</option>
//               <option value="frases">Repetição de Frases</option>
//               <option value="leitura">Atividades de Leitura</option>
//               <option value="discurso">Discurso Espontâneo</option>
//               <option value="diadococinesia">Diadococinésia</option>
//               <option value="novo">Novo</option>
//             </select>
//             <ErrorMessage errors={errors} name="tipo" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//           </div>

//           {tipoSelecionado && (
//             <>
//               {Array.isArray(exerciciosDisponiveis) && exerciciosDisponiveis.length > 0 && (
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Selecionar Exercício Existente</label>
//                   <select value={exercicioSelecionadoId} onChange={(e) => setExercicioSelecionadoId(e.target.value)} className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-white">
//                     <option value="">-- Escolha um exercício --</option>
//                     {exerciciosDisponiveis.map((ex) => (
//                       <option key={ex._id} value={ex._id.toString()}>{ex.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {dadosExercicioSelecionado && (
//                 <div className="mt-2">
//                   <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Modo de Uso</label>
//                   <select value={modoEdicao} onChange={(e) => setModoEdicao(e.target.value)} className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-white">
//                     <option value="default">Usar exercício como está</option>
//                     <option value="personalizar">Personalizar exercício</option>
//                   </select>
//                 </div>
//               )}

//               {type === 'novo' ? (
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span></label>
//                   <input type="text" {...register("type", { required: "Tipo do exercício é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
//                   <ErrorMessage errors={errors} name="type" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                 </div>
//               ) : (
//                 <input type="hidden" {...register("type")} />
//               )}

//               {!dadosExercicioSelecionado && (
//                 <>
//                   <ExerciseMetaFields register={register} errors={errors} control={control} options={options} appendStep={appendStep} />
//                   <ExerciseSteps
//                     type={type}
//                     fields={fields}
//                     camposPorTipo={camposPorTipo}
//                     camposPorTipoEn={camposPorTipoEn}
//                     editable={true}
//                     register={register}
//                     remove={remove}
//                     appendStep={appendStep}
//                   />
//                 </>
//               )}

//               {dadosExercicioSelecionado && (
//                 <ExerciseSelectedDetails
//                   dadosExercicioSelecionado={dadosExercicioSelecionado}
//                   modoEdicao={modoEdicao}
//                   setDadosExercicioSelecionado={setDadosExercicioSelecionado}
//                   control={control}
//                   options={options}
//                   errors={errors}
//                   type={type}
//                   camposPorTipo={camposPorTipo}
//                   camposPorTipoEn={camposPorTipoEn}
//                   register={register}
//                   remove={remove}
//                   appendStep={appendStep}
//                   fields={fields}
//                 />
//               )}

//               <div className="border-t my-4"></div>
//                 <div className="text-sm text-gray-600 dark:text-black">Campos com <span style={{ color: 'red' }}>*</span> são obrigatórios.</div>
//                 <div className="text-sm text-gray-600 dark:text-red-500">Todos os campos com exceção de "ID dos passos" serão transmitidos ao utente pelo Assistente.</div>
//               <div className="border-t my-4"></div>

//               <div className="flex flex-col gap-2 mt-4">
//                 <button type="submit" className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4">Adicionar Exercício</button>
//               </div>
//             </>
//           )}


//           <div className="flex flex-col gap-2 mt-4">
//             <button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Fechar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../../../api";
import { StepFields } from "./StepFields";
import { ExerciseMetaFields } from "./ExerciseMetaFields";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import { Loader2, XCircle, PlusCircle } from "lucide-react";
// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "../ui/Dialog";

import { MultiSelect } from "primereact/multiselect";

function ExerciseSteps({
  type,
  fields,
  camposPorTipo,
  camposPorTipoEn,
  editable,
  register,
  remove,
  appendStep,
}) {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="rounded-xl border p-4 bg-muted/30">
      <h3 className="text-lg font-semibold mb-2">Passos <span className="text-red-500">*</span></h3>
      {fields.map((field, index) => (
        <div key={field.id || index} className="mb-4">
          <StepFields
            index={index}
            type={type}
            field={field}
            camposPorTipo={camposPorTipo}
            camposPorTipoEn={camposPorTipoEn}
            editable={editable}
            register={register}
            remove={remove}
          />
        </div>
      ))}
      {editable && (
        <Button type="button" variant="outline" onClick={appendStep} className="mt-2 flex items-center gap-2">
          <PlusCircle size={16} /> Adicionar passo
        </Button>
      )}
    </div>
  );
}

function ExerciseSelectedDetails({
  dadosExercicioSelecionado,
  modoEdicao,
  setDadosExercicioSelecionado,
  control,
  options,
  errors,
  type,
  camposPorTipo,
  camposPorTipoEn,
  register,
  remove,
  appendStep,
  fields,
}) {
  if (!dadosExercicioSelecionado) return null;

  return (
    <div className="rounded-xl border p-4 bg-muted/30">
      <div className="space-y-3">
        <div>
          <label className="font-semibold">Nome <span className="text-red-500">*</span></label>
          <Input
            {...register("name")}
            readOnly={modoEdicao === "default"}
            onChange={(e) =>
              modoEdicao === "personalizar" &&
              setDadosExercicioSelecionado({
                ...dadosExercicioSelecionado,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Descrição</label>
          <Textarea
            {...register("description")}
            readOnly={modoEdicao === "default"}
            onChange={(e) =>
              modoEdicao === "personalizar" &&
              setDadosExercicioSelecionado({
                ...dadosExercicioSelecionado,
                description: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-semibold">
            Tipo de Processamento <span className="text-red-500">*</span>
          </label>
          <Controller
            name="typeOfProcessing"
            control={control}
            rules={{ required: "Selecione pelo menos um tipo." }}
            render={({ field }) => (
              <MultiSelect
                {...field}
                value={field.value || []}
                onChange={(e) => field.onChange(e.value)}
                options={options}
                optionLabel="label"
                optionValue="value"
                filter
                placeholder="Selecione os tipos"
                display="chip"
                className="w-full"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="typeOfProcessing"
            render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
          />
        </div>

        {type !== null && dadosExercicioSelecionado.steps.length > 0 && (
          <ExerciseSteps
            type={type}
            fields={fields}
            camposPorTipo={camposPorTipo}
            camposPorTipoEn={camposPorTipoEn}
            editable={modoEdicao === "personalizar"}
            register={register}
            remove={remove}
            appendStep={appendStep}
          />
        )}
      </div>
    </div>
  );
}

export default function FloatingForm({ onClose }) {
  const { id } = useParams();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState([]);
  const [exercicioSelecionadoId, setExercicioSelecionadoId] = useState("");
  
  const [dadosExercicioSelecionado, setDadosExercicioSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState("default");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: id,
      tipo: "",
      steps: dadosExercicioSelecionado?.steps || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "steps" });

  const tipoSelecionado = watch("tipo");

  const camposPorTipo = useMemo(
    () => ({
      palavras: ["Palavras", "Instrução", "ID"],
      frases: ["Frase", "Instrução", "ID"],
      leitura: ["Título", "Texto", "Instrução", "ID"],
      discurso: ["Questão", "Instrução", "ID"],
      diadococinesia: ["Tipo de Consoante", "Sílabas", "Instrução", "ID"],
      novo: ["Instrução", "label", "valor", "ID"],
    }),
    []
  );

  const camposPorTipoEn = useMemo(
    () => ({
      palavras: ["word", "description", "ID"],
      frases: ["sentence", "description", "ID"],
      leitura: ["title", "text", "description", "ID"],
      discurso: ["question", "description", "ID"],
      diadococinesia: ["typeOfConsonant", "syllables", "description", "ID"],
      novo: ["description", "label", "value", "ID"],
    }),
    []
  );

  // const mapTipo = useMemo(() => ({
  //   palavras: "Repetição de Palavras",
  //   frases: "Repetição de Frases",
  //   leitura: "Atividades de Leitura",
  //   discurso: "Discurso Espontâneo",
  //   diadococinesia: "Diadococinésia"

  // }), []);

  const mapTipo = useCallback((tipo) => {
    return {
      palavras: 'Repetição de Palavras',
      frases: 'Repetição de Frases',
      leitura: 'Atividades de Leitura',
      discurso: 'Discurso Espontâneo',
      diadococinesia: 'Diadococinésia'
    }[tipo] || tipo;
  }, []);

  const options = useMemo(() => [
    { label: 'Articulação', value: 'articulation' },
    { label: 'Fonação', value: 'phonation' },
    { label: 'Glota', value: 'glotta' },
    { label: 'Prosódia', value: 'prosody' },
    { label: 'Reaprendizagem', value: 'replearning' },
    { label: 'Fonological', value: 'phonological' },
  ], []);

  const appendStep = useCallback(() => {
    const campos = camposPorTipoEn[type] || [];
    append(Object.fromEntries(campos.map((key) => [key, ""])));
  }, [type, append, camposPorTipoEn]);

  const onSubmit = async (data) => {
    try {
      await api.post(`/utente/${id}/exercicio/`, data);
      alert("Exercício adicionado com sucesso!");
      window.location.reload();
    } catch (error) {
      alert(`Erro ao adicionar exercício: ${error.response?.data?.error || ""}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tipoSelecionado) {
          const tipo = mapTipo(tipoSelecionado);
          const response = await api.get(`/utente/exercicios/tipo/${tipo}/`);
          setExerciciosDisponiveis(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tipoSelecionado]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Exercício</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...register("userId")} />

            {/* Seleção do tipo */}
            <Select value={tipoSelecionado} onValueChange={(v) => setValue("tipo", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de exercício" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="palavras">Repetição de Palavras</SelectItem>
                <SelectItem value="frases">Repetição de Frases</SelectItem>
                <SelectItem value="leitura">Atividades de Leitura</SelectItem>
                <SelectItem value="discurso">Discurso Espontâneo</SelectItem>
                <SelectItem value="diadococinesia">Diadococinésia</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage
              errors={errors}
              name="tipo"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />

            {tipoSelecionado && (
              <>
                {/* {Array.isArray(exerciciosDisponiveis) && exerciciosDisponiveis.length > 0 && (
                  // <Select
                  //   value={exercicioSelecionadoId}
                  //   onValueChange={(v) => setExercicioSelecionadoId(v)}
                  // >
                  //   <SelectTrigger>
                  //     <SelectValue placeholder="Selecionar exercício existente" />
                  //   </SelectTrigger>
                  //   <SelectContent>
                  //     {exerciciosDisponiveis.map((ex) => (
                  //       <SelectItem key={ex._id} value={ex._id.toString()}>
                  //         {ex.name}
                  //       </SelectItem>
                  //     ))}
                  //   </SelectContent>
                  // </Select>
                  <Select
                    value={exercicioSelecionadoId}           // deve ser string única
                    onValueChange={(v) => setExercicioSelecionadoId(v)}  // recebe string
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar exercício existente" />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciciosDisponiveis.map((ex, idx) => (
  <SelectItem key={ex._id ? ex._id.toString() : idx} value={ex._id?.toString() || idx}>
    {ex.name || `Exercício ${idx + 1}`}
  </SelectItem>
))}
                    </SelectContent>
                  </Select>
                )} */}
                {Array.isArray(exerciciosDisponiveis) && exerciciosDisponiveis.length > 0 && (
                  <Select
                    value={exercicioSelecionadoId}
                    onValueChange={(v) => setExercicioSelecionadoId(v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar exercício existente" />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciciosDisponiveis.map((ex, idx) => {
                        // fallback caso _id ou name não existam
                        const key = ex._id ? ex._id.toString() : `ex-${idx}`;
                        const value = ex._id ? ex._id.toString() : `ex-${idx}`;
                        const name = ex.name || `Exercício ${idx + 1}`;

                        return (
                          <SelectItem key={key} value={value}>
                            {name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}


                {dadosExercicioSelecionado && (
                  <Select value={modoEdicao} onValueChange={setModoEdicao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Modo de uso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Usar exercício como está</SelectItem>
                      <SelectItem value="personalizar">Personalizar exercício</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Novo exercício */}
                {!dadosExercicioSelecionado && (
                  <>
                    <ExerciseMetaFields
                      register={register}
                      errors={errors}
                      control={control}
                      options={[]}
                      appendStep={appendStep}
                    />
                    <ExerciseSteps
                      type={type}
                      fields={fields}
                      camposPorTipo={camposPorTipo}
                      camposPorTipoEn={camposPorTipoEn}
                      editable
                      register={register}
                      remove={remove}
                      appendStep={appendStep}
                    />
                  </>
                )}

                {/* Exercício existente */}
                {dadosExercicioSelecionado && (
                  <ExerciseSelectedDetails
                    dadosExercicioSelecionado={dadosExercicioSelecionado}
                    modoEdicao={modoEdicao}
                    setDadosExercicioSelecionado={setDadosExercicioSelecionado}
                    control={control}
                    options={[]}
                    errors={errors}
                    type={type}
                    camposPorTipo={camposPorTipo}
                    camposPorTipoEn={camposPorTipoEn}
                    register={register}
                    remove={remove}
                    appendStep={appendStep}
                    fields={fields}
                  />
                )}
              </>
            )}

            <DialogFooter className="flex justify-between">
              <Button type="button" variant="secondary" onClick={onClose}>
                <XCircle size={16} /> Fechar
              </Button>
              <Button type="submit">
                <PlusCircle size={16} /> Salvar Exercício
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}










// export default function FloatingForm({ onClose }) {
//     const [exercises, setExercises] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showForm, setShowForm] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams(); // Obter o ID do URL
//     const [exercise, setExercise] = useState();
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const [type, setType] = useState('');
//     const {
//         register, handleSubmit, watch, control, reset, formState: { errors }
//         } = useForm({
//         defaultValues: {
//             tipo: '',
//             steps: []
//         }
//     });

//      // EXERCIÍO:::::::::::::::::::::::::::::::::::::
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'steps'
//       });
    
//     const tipoSelecionado = watch('tipo');
    
//     const camposPorTipo = {
//         palavras: ['Palavras', 'Descrição','ID'],
//         frases: ['Frase', 'Descrição','ID'],
//         leitura: ['Título', 'Texto', 'Descrição', 'ID'],
//         discurso: ['Questão', 'Descrição','ID'],
//         diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição','ID'],
//         novo: ["descrição",'label', 'valor','ID']
//     };
    
//     const camposPorTipoEn = {
//         palavras: ['word', 'description','ID'],
//         frases: ['sentence', 'description','ID'],
//         leitura: ['title', 'text', 'description','ID'],
//         discurso: ['question', 'description','ID'],
//         diadococinesia: ['typeOfConsonant', 'syllables', 'description','ID'],
//         novo: ['description','label', 'value','ID']
//     };
    
//     const mapTipo = (tipo) => {
//         return {
//           palavras: 'Repetição de Palavras',
//           frases: 'Repetição de Frases',
//           leitura: 'Atividades de Leitura',
//           discurso: 'Discurso Espontâneo',
//           diadococinesia: 'Diadococinésia',
//         }[tipo] || tipo;
//     };
    
//     const appendStep = () => {
//         if (type === 'novo') {
//           append({
//             description: '',
//             id: '',
//             pairs: [{ label: '', value: '' }] // novo array dinâmico
//           });
//         } else {
//           const campos = camposPorTipo[type] || [];
//           const novoStep = Object.fromEntries(campos.map(key => [key, '']));
//           append(novoStep);
//         }
//     };
    
//     const options = [
//         { label: 'Articulação', value: 'articulation' },
//         { label: 'Fonação', value: 'phonation' },
//         { label: 'Glota', value: 'glotta' },
//         { label: 'Prosódia', value: 'prosody' },
//         { label: 'Reaprendizagem', value: 'replearning' },
//         { label: 'Fonológico', value: 'phonological'}
//     ];

//     const onSubmit = async (data) => {
//     try {
//       if (data.type !== 'novo') {
//         data.type = mapTipo(data.type);
//       }
//       if (typeof data.typeOfProcessing === "string") {
//         data.typeOfProcessing = [data.typeOfProcessing];
//       }
//       await api.post(`/utente/${id}/exercicio/`, data);
//       alert("Exercício adicionado com sucesso!");
//       window.location.reload();
//     } catch (error) {
//       console.error("Erro ao adicionar exercício:", error);
//       alert("Erro ao adicionar exercício. Tente novamente.");
//     }
//   };
//     useEffect(() => {
//         if (tipoSelecionado) {
//             setType(tipoSelecionado);
//             reset({
//             ...watch(),
//             type: tipoSelecionado,
//             steps: []
//             });
//             appendStep(); // Adiciona um passo automaticamente
//         }
//     }, [tipoSelecionado]);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/exercicio/`);
//                 setExercises(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleOpen = async (id_) => {
//         navigate(`/utente/exercicio/${id_}`);
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
//     if (exercises.length > 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                 <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                 {/* <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100"> */}
//                     <h2 className="text-2xl font-bold text-center mb-5">Lista dos Exercícios</h2>
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="py-2 px-4 border-b">ID</th>
//                                 <th className="py-2 px-4 border-b">Tipo</th>
//                                 <th className="py-2 px-4 border-b">Nome</th>
//                                 <th className="py-2 px-4 border-b">Descrição</th>
//                                 <th className="py-2 px-4 border-b">Ação</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {exercises.map((exercise) => (
//                                 <tr key={exercise._id.$oid || exercise._id}>
//                                     <td className="py-2 px-4 border-b">{exercise._id.$oid || exercise._id.toString()}</td>
//                                     <td className="py-2 px-4 border-b">{exercise.type}</td>
//                                     <td className="py-2 px-4 border-b">{exercise.name}</td>
//                                     <td className="py-2 px-4 border-b">{exercise.description}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         <button onClick={() => handleOpen(exercise._id.$oid || exercise._id.toString())}
//                                             className="bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
//                                             Abrir
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody> 
//                     </table>
//                     <button
//                         onClick={() => setMostrarFormulario(true)}
//                         className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
//                         style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
//                     >
//                             Adicionar Exercícios
//                     </button>
//                     {mostrarFormulario && (
//                     <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//                             <h2 className="text-9xl font-semibold text-center text-black dark:text-white mb-4">Adicionar Exercício Génerico</h2>
                            
//                             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
//                                 <div className="max-h-[70vh] overflow-y-auto pr-2">
//                                     {/* Tipo de Exercício */}
//                                     <div>
//                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
//                                     <select
//                                         {...register('tipo', { required: "Selecione um tipo." })}
//                                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                     >
//                                         <option value="">Selecione...</option>
//                                         <option value="palavras">Repetição de Palavras</option>
//                                         <option value="frases">Repetição de Frases</option>
//                                         <option value="leitura">Atividades de Leitura</option>
//                                         <option value="discurso">Discurso Espontâneo</option>
//                                         <option value="diadococinesia">Diadococinésia</option>
//                                         <option value="novo">Novo</option>
//                                     </select>
//                                     <ErrorMessage errors={errors} name="tipo" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                     </div>
                        
//                                     {/* Tipo (invisível) */}
                                    
//                                     {type === 'novo'? (
//                                     <div>
//                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
//                                     <input
//                                         type="text"
//                                         {...register("type", { required: "Tipo do exercício é obrigatório." })}
//                                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                     />
//                                     <ErrorMessage errors={errors} name="type" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                     </div>
//                                     ):(
//                                     <input type="hidden" {...register("type")} />
//                                     )}
//                                     {/* Nome */}
//                                     <div>
//                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício</label>
//                                     <input
//                                         type="text"
//                                         {...register("name", { required: "Nome do exercício é obrigatório." })}
//                                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                     />
//                                     <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                     </div>
//                                     {/* Descrição */}
//                                     <div>
//                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
//                                     <input
//                                         type="text"
//                                         {...register("description", { required: "Descrição é obrigatória." })}
//                                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                     />
//                                     <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                     </div>
//                                     {/* Tipo de Processamento */}
//                                     <div>
//                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento</label>
//                                     <Controller
//                                         name="typeOfProcessing"
//                                         control={control}
//                                         rules={{
//                                         required: "Selecione pelo menos um tipo de Processamento.",
//                                         validate: value => value?.length > 0 || "Selecione pelo menos um tipo."
//                                         }}
//                                         render={({ field }) => (
//                                         <MultiSelect
//                                             {...field}
//                                             options={options}
//                                             optionLabel="label"
//                                             optionValue="value"
//                                             filter 
//                                             placeholder="Selecione os tipos de processamento"
//                                             display="chip"
//                                             className="w-full md:w-20rem "
                                            
//                                         />
//                                         )}
//                                     />
//                                     <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//                                     </div>
                                    
//                                     {/* Passos dinâmicos */}
//                                     <div className="mb-4">
//                                     {type !== null && (
//                                         <>
//                                         {fields.length > 0 && (
//                                             <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//                                                 <h3 className="text-lg font-semibold mb-2">Passos</h3>
//                                                 {fields.map((field, index) => (
//                                                     <div key={field.id} className="mb-4 border p-2 rounded">
//                                                         {type === 'novo' ? (
//                                                             <>
//                                                                 <div className="mb-2">
//                                                                     <label className="block text-sm">Descrição:</label>
//                                                                     <input
//                                                                         {...register(`steps.${index}.description`, { required: true })}
//                                                                         className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                     />
//                                                                 </div>
//                                                                 <div className="mb-2">
//                                                                     <label className="block text-sm">Label:</label>
//                                                                     <input
//                                                                         {...register(`steps.${index}.label`, { required: true })}
//                                                                         className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                     />
//                                                                 </div>
//                                                                 <div className="mb-2">
//                                                                     <label className="block text-sm">Valor:</label>
//                                                                     <input
//                                                                         {...register(`steps.${index}.value`, { required: true })}
//                                                                         className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                     />
//                                                                 </div>
//                                                                 <div className="mb-2">
//                                                                     <label className="block text-sm">ID:</label>
//                                                                     <input
//                                                                         {...register(`steps.${index}.id`, { required: true })}
//                                                                         className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                     />
//                                                                 </div>
//                                                             </>
//                                                         ) : (
//                                                             (camposPorTipo[type] || []).map((campo, campoIdx) => {
//                                                                 const fieldName = camposPorTipoEn[type]?.[campoIdx]; // nome interno (ex: 'word', 'description')
                        
//                                                                 return (
//                                                                     <div className="mb-2" key={campo}>
//                                                                     <label className="block text-sm capitalize">{campo}:</label>
//                                                                     {campo === 'Texto' ? (
//                                                                         <textarea
//                                                                         {...register(`steps.${index}.${fieldName}`, { required: true })}
//                                                                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                                                                         ></textarea>
//                                                                     ) : (
//                                                                         <input
//                                                                         {...register(`steps.${index}.${fieldName}`, { required: true })}
//                                                                         className="w-full p-2 border rounded dark:bg-zinc-600"
//                                                                         />
//                                                                     )}
//                                                                     </div>
//                                                                 );
//                                                                 })
//                                                         )}
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => remove(index)}
//                                                             className="mt-2 text-red-600 hover:underline rounded"
//                                                         >
//                                                             Remover
//                                                         </button>
//                                                     </div>
//                                                 ))}
//                                                 <button
//                                                     type="button"
//                                                     onClick={appendStep}
//                                                     className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                                 >
//                                                     Adicionar mais passos
//                                                 </button>
//                                             </div>
                                        
//                                         )}
//                                         </>
//                                     )}
//                                     </div>
//                                 </div>
                    
//                                 {/* Botões */}
//                                 <div className="flex justify-between mt-4">
//                                     <button
//                                         type="submit"
//                                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                     >
//                                         Adicionar
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setMostrarFormulario(false)}
//                                         className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                                     >
//                                         Cancelar
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }