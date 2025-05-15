import React, { useEffect, useState } from 'react';
import api from "../../../api";
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import '../../../App.css';
import 'react-phone-number-input/style.css';

export default function FloatingForm({ onClose }) {
  const { id } = useParams();
  const [type, setType] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userId: id,
      tipo: '',
      steps: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  });

  const tipoSelecionado = watch('tipo');

  const camposPorTipo = {
    palavras: ['Palavras', 'Descrição'],
    frases: ['Frase', 'Descrição'],
    leitura: ['Título', 'Texto', 'Descrição'],
    discurso: ['Questação', 'Descrição'],
    diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição'],
    novo: ['label', 'valor']
  };

  const appendStep = () => {
    if (type === 'novo') {
        append({ label: '', valor: '' });
    } else {
        const campos = camposPorTipo[type] || [];
        const novoStep = Object.fromEntries(campos.map(key => [key, '']));
        append(novoStep);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/utente/${id}/exercicio/`, data);
      alert("Exercício adicionado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
      alert("Erro ao adicionar exercício. Tente novamente.");
    }
  };

  useEffect(() => {
    if (tipoSelecionado) {
      setType(tipoSelecionado);
      reset({
        ...watch(),
        type: tipoSelecionado,
        steps: []
      });
      appendStep(); // Adiciona um passo automaticamente
    }
  }, [tipoSelecionado]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Adicionar Exercício</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ID do Utente */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">ID do Utente</label>
            <input
              type="text"
              {...register("userId", { required: "Id do utilizador é obrigatório." })}
            //    className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              readOnly
            />
            <ErrorMessage errors={errors} name="userId" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>

          {/* Tipo de Exercício */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
            <select
              {...register('tipo', { required: "Selecione um tipo." })}
               className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            >
              <option value="">Selecione...</option>
              <option value="palavras">Repetição de Palavras</option>
              <option value="frases">Repetição de Frases</option>
              <option value="leitura">Atividades de Leitura</option>
              <option value="discurso">Discurso Espontâneo</option>
              <option value="diadococinesia">Diadococinésia</option>
              <option value="novo">Novo</option>
            </select>
            <ErrorMessage errors={errors} name="tipo" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>

          {/* Tipo (invisível) */}
          <input type="hidden" {...register("type")} />

          {/* Nome */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício</label>
            <input
              type="text"
              {...register("name", { required: "Nome do exercício é obrigatório." })}
               className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>

          {/* Descrição */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
            <input
              type="text"
              {...register("description", { required: "Descrição é obrigatória." })}
               className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
            <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>

          {/* Passos dinâmicos */}
          <div className="mb-4">
    {fields.length > 0 && (
        <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
            <h3 className="text-lg font-semibold mb-2">Passos</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="mb-4 border p-2 rounded">
                    {type === 'novo' ? (
                        <>
                            <div className="mb-2">
                                <label className="block text-sm">Label:</label>
                                <input
                                    {...register(`steps.${index}.label`, { required: true })}
                                    className="w-full p-2 border rounded dark:bg-zinc-600"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm">Valor:</label>
                                <input
                                    {...register(`steps.${index}.value`, { required: true })}
                                    className="w-full p-2 border rounded dark:bg-zinc-600"
                                />
                            </div>
                        </>
                    ) : (
                        (camposPorTipo[type] || []).map((campo) => (
                            <div className="mb-2" key={campo}>
                                <label className="block text-sm capitalize">{campo}:</label>
                                <input
                                    {...register(`steps.${index}.${campo}`, { required: true })}
                                    className="w-full p-2 border rounded dark:bg-zinc-600"
                                />
                            </div>
                        ))
                    )}
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 text-red-600 hover:underline rounded"
                    >
                        Remover
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={appendStep}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Adicionar mais passos
            </button>
        </div>
    )}
    </div>

          {/* Botões */}
          <div className="flex flex-col gap-2 mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Adicionar Exercício
            </button>
            <button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import api from "../../../api";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm, useFieldArray } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import '../../../App.css'; // Importando o CSS tradicional
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

// export default function FloatingForm ({ onClose }) {
//     const { id } = useParams(); // Obter o ID do URL

//     const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm({
//         defaultValues: {
//             userId: id,
//         },
//     });

//     const { fields, append, remove } = useFieldArray({ control, name: 'steps' });
//     const [type, setType] = useState('');
//     const tipoSelecionado = watch('tipo');
   
//     const onSubmit = async (data) => {
//         try {
//             const response = await api.post(`/utente/${id}/exercicio/`, data);
//             // setUtentes([...utentes, response.data]); // Add the new utente to the state
//             alert("Utente added successfully:", response.data);  //TODO: delete this line
//             // navigate("/utente/"); // Redirect to the all utente page after adding
//             window.location.reload(); 
//         }
//         catch (error) {
//             console.error("Error adding Exercício:", error);
//             alert("Erro ao adicionar Exercício. Por favor tenta novamente.");
//         }
//     }

//     useEffect(() => {
//         if (tipoSelecionado) {
//         setType(tipoSelecionado);
//         reset({
//             ...watch(),
//             steps: []
//         });
//         appendStep(); // Adiciona primeiro passo automaticamente
//         }
//     }, [tipoSelecionado]);

//     const camposPorTipo = {
//         palavras: ['word', 'description'],
//         frases: ['sentence', 'description'],
//         leitura: ['title', 'text', 'description'],
//         discurso: ['question', 'description'],
//         diadococinesia: ['typeOfConsonant', 'syllables', 'description']
//     };

//     const appendStep = () => {
//         const campos = camposPorTipo[type] || [];
//         const novoStep = Object.fromEntries(campos.map(key => [key, '']));
//         append(novoStep);
//     };

//     const mapTipo = (tipo) => {
//         return {
//             palavras: 'Repetição de Palavras',
//             frases: 'Repetição de Frases',
//             leitura: 'Atividades de Leitura',
//             discurso: 'Discurso Espontâneo',
//             diadococinesia: 'Diadococinésia'
//         }[tipo] || tipo;
//     };


//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Adicionar Exercício</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
//                 <div className="mb-4">
//                     <label htmlFor="userId">Id do Utente</label>
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="userId"
//                         name="userId"
//                         placeholder="Id do utilizador"
//                         {...register("userId", {
//                         required: "Id  do utilizador é obrigatório, para vingular o exercício ao utilizador.",
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="userId" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>

//                 <div className="mb-4">
                   
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="type"
//                         name="type"
//                         placeholder="Tipo de Exercício"
//                         {...register("type", { required: "Tipo é obrigatório." })}
//                     />
//                     <ErrorMessage errors={errors} name="type" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
        
//                 <div className="mb-4">
                    
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="name"
//                         name="name"
//                         placeholder="Nome do Exercício"
//                         {...register("name", {
//                         required: "Nome do exercício é obrigatório.",
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="name" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
                
//                 <div className="mb-4">
                    
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="description"
//                         name="description"
//                         placeholder="Descrição do Exercício"
//                         {...register("description", {
//                         required: "Descrição do exercício é obrigatório.",
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="description" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>

//                 {/* TODO: FAZER O CAMPO OPCIONAL, E ESCONDER O MESMO; */}
//                 <div className="mb-4">
//                     <label>Tipo de Exercício</label>
//                     <select {...register('tipo', { required: true })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//                         <option value="">Selecione...</option>
//                         <option value="palavras">Repetição de Palavras</option>
//                         <option value="frases">Repetição de Frases</option>
//                         <option value="leitura">Atividades de Leitura</option>
//                         <option value="discurso">Discurso Espontâneo</option>
//                         <option value="diadococinesia">Diadococinésia</option>
//                         <option value="novo">Novo</option>
//                     </select>
//                 </div>

//                 <div className="mb-4">
//                     {fields.length > 0 && (
//                         <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
//                             <h3>Passos</h3>
//                             {fields.map((field, index) => (
//                             <div key={field.id} style={{ marginBottom: '1rem' }}>
//                                 {(camposPorTipo[type] || []).map((campo) => (
//                                 <div key={campo}>
//                                     <label>{campo}:</label>
//                                     <input
//                                     {...register(`steps.${index}.${campo}`, { required: true })}
//                                     />
//                                 </div>
//                                 ))}
//                                 <button type="button" onClick={() => remove(index)}>Remover</button>
//                             </div>
//                             ))}
//                             <button type="button" onClick={appendStep}>Adicionar mais passos</button>
//                         </div>
//                     )}
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Adicionar</button>
//             </form>
//           <button
//             className="w-full bg-blue-500 text-white py-2 px-3 rounded"
//             onClick={onClose}
//             style={{ width: '320px', height: '40px', fontSize: '16px', margin:'15px' }}
//         >
//             Fechar
//           </button>
//         </div>
//       </div>
//     );
//   };

// import React, { useState, useEffect } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';

// export default function AddExerciseForm({ mmiCli }) {
//   const { register, handleSubmit, watch, control, reset } = useForm();
//   const { fields, append, remove } = useFieldArray({ control, name: 'steps' });

//   const [type, setType] = useState('');
//   const tipoSelecionado = watch('tipo');

//   useEffect(() => {
//     if (tipoSelecionado) {
//       setType(tipoSelecionado);
//       reset({
//         ...watch(),
//         steps: []
//       });
//       appendStep(); // Adiciona primeiro passo automaticamente
//     }
//   }, [tipoSelecionado]);

//   const camposPorTipo = {
//     palavras: ['step', 'word', 'description'],
//     frases: ['step', 'sentence', 'description'],
//     leitura: ['step', 'title', 'text', 'description'],
//     discurso: ['step', 'question', 'description'],
//     diadococinesia: ['step', 'typeOfConsonant', 'syllables', 'description']
//   };

//   const appendStep = () => {
//     const campos = camposPorTipo[type] || [];
//     const novoStep = Object.fromEntries(campos.map(key => [key, '']));
//     append(novoStep);
//   };

//   const onSubmit = (formData) => {
//     const data = {
//       action: 'addExercise',
//       type: mapTipo(formData.tipo),
//       name: formData.name,
//       description: formData['description-exercise'],
//       userName: formData.userName,
//       steps: formData.steps
//     };

//     sendData(data);
//   };

//   const mapTipo = (tipo) => {
//     return {
//       palavras: 'Repetição de Palavras',
//       frases: 'Repetição de Frases',
//       leitura: 'Atividades de Leitura',
//       discurso: 'Discurso Espontâneo',
//       diadococinesia: 'Diadococinésia'
//     }[tipo] || tipo;
//   };

//   const sendData = (data) => {
//     const message = { intent: data.action, message: "Submeter novo Exercicio" };
//     const result = { recognized: ["SPEECH", "SPEECHIN", "APP"], data, nlu: message };

//     mmiCli.sendToIM(
//       new LifeCycleEvent("SPEECHIN", "IM", "text-1", "ctx-1")
//         .doExtensionNotification(
//           new EMMA("text-", "text", "command", 1, 0)
//             .setValue(JSON.stringify(result))
//         )
//     );
//     alert('Exercício submetido com sucesso!');
//   };

//   return (
//     <div className="container">
//       <h2>Adicionar Exercício</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="form">
//         <label>Nome do Exercício:</label>
//         <input {...register('name', { required: true })} />

//         <label>Descrição:</label>
//         <input {...register('description-exercise', { required: true })} />

//         <label>Nome do Utente:</label>
//         <input {...register('userName', { required: true })} />

//         <label>Tipo:</label>
//         <select {...register('tipo', { required: true })}>
//           <option value="">Selecione...</option>
//           <option value="palavras">Repetição de Palavras</option>
//           <option value="frases">Repetição de Frases</option>
//           <option value="leitura">Atividades de Leitura</option>
//           <option value="discurso">Discurso Espontâneo</option>
//           <option value="diadococinesia">Diadococinésia</option>
//         </select>

//         {fields.length > 0 && (
//           <div className="steps">
//             <h3>Passos</h3>
//             {fields.map((field, index) => (
//               <div key={field.id} style={{ marginBottom: '1rem' }}>
//                 {(camposPorTipo[type] || []).map((campo) => (
//                   <div key={campo}>
//                     <label>{campo}:</label>
//                     <input
//                       {...register(`steps.${index}.${campo}`, { required: true })}
//                     />
//                   </div>
//                 ))}
//                 <button type="button" onClick={() => remove(index)}>Remover</button>
//               </div>
//             ))}
//             <button type="button" onClick={appendStep}>Adicionar mais passos</button>
//           </div>
//         )}

//         <button type="submit">Submeter Exercício</button>
//       </form>
//     </div>
//   );
// }
