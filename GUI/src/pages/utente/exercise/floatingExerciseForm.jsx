import React, { useEffect, useState } from 'react';
import api from "../../../api";
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import '../../../App.css';
import 'react-phone-number-input/style.css';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function FloatingForm({ onClose }) {
  const { id } = useParams();
  const [type, setType] = useState('');

  const {
    register, handleSubmit, watch, control, reset, formState: { errors }
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
    palavras: ['Palavras', 'Descrição','ID'],
    frases: ['Frase', 'Descrição','ID'],
    leitura: ['Título', 'Texto', 'Descrição', 'ID'],
    discurso: ['Questão', 'Descrição','ID'],
    diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição','ID'],
    novo: ["descrição",'label', 'valor','ID']
  };

  const camposPorTipoEn = {
    palavras: ['word', 'description','ID'],
    frases: ['sentence', 'description','ID'],
    leitura: ['title', 'text', 'description','ID'],
    discurso: ['question', 'description','ID'],
    diadococinesia: ['typeOfConsonant', 'syllables', 'description','ID'],
    novo: ['description','label', 'value','ID']
  };

   const mapTipo = (tipo) => {
    return {
      palavras: 'Repetição de Palavras',
      frases: 'Repetição de Frases',
      leitura: 'Atividades de Leitura',
      discurso: 'Discurso Espontâneo',
      diadococinesia: 'Diadococinésia'
    }[tipo] || tipo;
  };

 const appendStep = () => {
    if (type === 'novo') {
      append({
        description: '',
        id: '',
        pairs: [{ label: '', value: '' }] // novo array dinâmico
      });
    } else {
      const campos = camposPorTipo[type] || [];
      const novoStep = Object.fromEntries(campos.map(key => [key, '']));
      append(novoStep);
    }
};

  const options = [
    { label: 'Articulação', value: 'articulation' },
    { label: 'Fonação', value: 'phonation' },
    { label: 'Glota', value: 'glotta' },
    { label: 'Prosódia', value: 'prosody' },
    { label: 'Reaprendizagem', value: 'replearning' },
  ];

  const onSubmit = async (data) => {
    try {
      data.type = mapTipo(data.type)
      if (typeof data.typeOfProcessing === "string") {
        data.typeOfProcessing = [data.typeOfProcessing];
      }

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
            {/* <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">ID do Utente</label> */}
            <input
              type="text"
              {...register("userId", { required: "Id do utilizador é obrigatório." })}
            //    className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              readOnly
              hidden
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
          
          {type === 'novo'? (
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
            <input
              type="text"
              {...register("type", { required: "Tipo do exercício é obrigatório." })}
               className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
            <ErrorMessage errors={errors} name="type" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>
          ):(
            <input type="hidden" {...register("type")} />
          )}

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

          {/* Tipo de Processamento */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento</label>
            <Controller
              name="typeOfProcessing"
              control={control}
              rules={{
                required: "Selecione pelo menos um tipo de Processamento.",
                validate: value => value?.length > 0 || "Selecione pelo menos um tipo."
              }}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  options={options}
                  optionLabel="label"
                  optionValue="value"
                  filter 
                  placeholder="Selecione os tipos de processamento"
                  display="chip"
                  className="w-full md:w-20rem "
                  
                />
              )}
            />
            

            <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div>
          
          {/* Passos dinâmicos */}
          <div className="mb-4">
            {type !== null && (
              <>
                {fields.length > 0 && (
                    <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                        <h3 className="text-lg font-semibold mb-2">Passos</h3>
                        {fields.map((field, index) => (
                            <div key={field.id} className="mb-4 border p-2 rounded">
                                {type === 'novo' ? (
                                    <>
                                        <div className="mb-2">
                                            <label className="block text-sm">Descrição:</label>
                                            <input
                                                {...register(`steps.${index}.description`, { required: true })}
                                                className="w-full p-2 border rounded dark:bg-zinc-600"
                                            />
                                        </div>
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
                                        <div className="mb-2">
                                            <label className="block text-sm">ID:</label>
                                            <input
                                                {...register(`steps.${index}.id`, { required: true })}
                                                className="w-full p-2 border rounded dark:bg-zinc-600"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    (camposPorTipo[type] || []).map((campo, campoIdx) => {
                                        const fieldName = camposPorTipoEn[type]?.[campoIdx]; // nome interno (ex: 'word', 'description')

                                        return (
                                          <div className="mb-2" key={campo}>
                                            <label className="block text-sm capitalize">{campo}:</label>
                                            {campo === 'Texto' ? (
                                              <textarea
                                                {...register(`steps.${index}.${fieldName}`, { required: true })}
                                                className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                              ></textarea>
                                            ) : (
                                              <input
                                                {...register(`steps.${index}.${fieldName}`, { required: true })}
                                                className="w-full p-2 border rounded dark:bg-zinc-600"
                                              />
                                            )}
                                          </div>
                                        );
                                      })
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
             </>
            )}
          </div>
          
          {/* <div className="mb-4">
          {type !== null && (
            <>
              {fields.length > 0 && (
                <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                  <h3 className="text-lg font-semibold mb-2">Passos</h3>
                  {fields.map((field, index) => {
                    const pairName = `steps.${index}.pairs`;
                    const {
                      fields: pairFields,
                      append: appendPair,
                      remove: removePair
                    } = useFieldArray({
                      control,
                      name: pairName
                    });

                    return (
                      <div key={field.id} className="mb-4 border p-2 rounded">
                        {type === 'novo' ? (
                          <>
                            {/* Descrição e ID fixos *}
                            <div className="mb-2">
                              <label className="block text-sm">Descrição:</label>
                              <input
                                {...register(`steps.${index}.description`, { required: true })}
                                className="w-full p-2 border rounded dark:bg-zinc-600"
                              />
                            </div>
                            <div className="mb-2">
                              <label className="block text-sm">ID:</label>
                              <input
                                {...register(`steps.${index}.id`, { required: true })}
                                className="w-full p-2 border rounded dark:bg-zinc-600"
                              />
                            </div>

                           
                            <div className="mb-2">
                              <label className="block text-sm font-medium">Pares Label/Value:</label>
                              {pairFields.map((pair, pairIndex) => (
                                <div key={pair.id} className="flex gap-2 mb-2">
                                  <input
                                    {...register(`steps.${index}.pairs.${pairIndex}.label`, { required: true })}
                                    placeholder="Label"
                                    className="w-1/2 p-2 border rounded dark:bg-zinc-600"
                                  />
                                  <input
                                    {...register(`steps.${index}.pairs.${pairIndex}.value`, { required: true })}
                                    placeholder="Value"
                                    className="w-1/2 p-2 border rounded dark:bg-zinc-600"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePair(pairIndex)}
                                    className="text-red-500"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => appendPair({ label: '', value: '' })}
                                className="text-blue-500 mt-2"
                              >
                                + Adicionar Par
                              </button>
                            </div>
                          </>
                        ) : (
                          (camposPorTipo[type] || []).map((campo, campoIdx) => {
                            const fieldName = camposPorTipoEn[type]?.[campoIdx];

                            return (
                              <div className="mb-2" key={campo}>
                                <label className="block text-sm capitalize">{campo}:</label>
                                {campo === 'Texto' ? (
                                  <textarea
                                    {...register(`steps.${index}.${fieldName}`, { required: true })}
                                    className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                  ></textarea>
                                ) : (
                                  <input
                                    {...register(`steps.${index}.${fieldName}`, { required: true })}
                                    className="w-full p-2 border rounded dark:bg-zinc-600"
                                  />
                                )}
                              </div>
                            );
                          })
                        )}
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2 text-red-600 hover:underline rounded"
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={appendStep}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Adicionar mais passos
                  </button>
                </div>
              )}
            </>
          )}
        </div> */}


          {/* Botões */}
          <div className="flex flex-col gap-2 mt-4">
            <button type="submit" 
            className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
            >
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