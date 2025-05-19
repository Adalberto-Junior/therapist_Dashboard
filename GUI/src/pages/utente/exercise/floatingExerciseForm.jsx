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
    palavras: ['Palavras', 'Descrição'],
    frases: ['Frase', 'Descrição'],
    leitura: ['Título', 'Texto', 'Descrição'],
    discurso: ['Questão', 'Descrição'],
    diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição'],
    novo: ['label', 'valor']
  };

  const camposPorTipoEn = {
    palavras: ['word', 'description'],
    frases: ['sentence', 'description'],
    leitura: ['title', 'text', 'description'],
    discurso: ['question', 'description'],
    diadococinesia: ['typeOfConsonant', 'syllables', 'description'],
    novo: ['label', 'value']
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
        append({ label: '', valor: '' });
    } else {
        const campos = camposPorTipo[type] || [];
        const novoStep = Object.fromEntries(campos.map(key => [key, '']));
        append(novoStep);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.type = mapTipo(data.type)
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

          {/* Email do Utente: Opcional */}
          {/* <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Email do Utente</label>
            <input
              type="email"
              placeholder='Opcional'
              {...register("email", {pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um email válido."
                }})}
             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
          </div> */}

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
            <select
              {...register('typeOfProcessing', { required: "Selecione um tipo de Processamento." })}
               className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            >
              <option value="">Selecione...</option>
              <option value="articulation">Articulação</option>
              <option value="phonation">Fonação</option>
              <option value="glotta">Glota</option>
              <option value="prosody">Prosódia</option>
              <option value="replearning">Reaprendizagem</option>
              {/* <option value="novo">Novo</option> */}
            </select>
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
                                            {campo === 'Texto' ? (
                                              <textarea
                                                className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                                {...register(`steps.${index}.${camposPorTipoEn[type]?.[camposPorTipo[type].indexOf(campo)]}`, { required: true })}
                                            ></textarea>
                                            ):(<input
                                                {...register(`steps.${index}.${camposPorTipoEn[type]?.[camposPorTipo[type].indexOf(campo)]}`, { required: true })}
                                                className="w-full p-2 border rounded dark:bg-zinc-600"
                                            />
                                            )}
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
             </>
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