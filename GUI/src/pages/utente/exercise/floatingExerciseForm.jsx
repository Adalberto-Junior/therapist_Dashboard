import React, { useEffect, useState, useCallback, useMemo } from 'react';
import api from "../../../api";
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import '../../../App.css';
import 'react-phone-number-input/style.css';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function FloatingForm({ onClose }) {
  const { id } = useParams();
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState([]);
  const [exercicioSelecionadoId, setExercicioSelecionadoId] = useState('');
  const [dadosExercicioSelecionado, setDadosExercicioSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState('default');

  const exercicioSelecionado = useMemo(() => exerciciosDisponiveis.find(ex => ex._id.toString() === exercicioSelecionadoId), [exerciciosDisponiveis, exercicioSelecionadoId]);

  const {
    register, handleSubmit, watch, setValue, control, reset, formState: { errors }
  } = useForm({
    defaultValues: {
      userId: id,
      tipo: '',
      steps: dadosExercicioSelecionado?.steps || [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  });

  const tipoSelecionado = watch('tipo');

  const camposPorTipo = useMemo(() => ({
    palavras: ['Palavras', 'Descrição', 'ID'],
    frases: ['Frase', 'Descrição', 'ID'],
    leitura: ['Título', 'Texto', 'Descrição', 'ID'],
    discurso: ['Questão', 'Descrição', 'ID'],
    diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Descrição', 'ID'],
    novo: ['descrição', 'label', 'valor', 'ID']
  }), []);

  const camposPorTipoEn = useMemo(() => ({
    palavras: ['word', 'description', 'ID'],
    frases: ['sentence', 'description', 'ID'],
    leitura: ['title', 'text', 'description', 'ID'],
    discurso: ['question', 'description', 'ID'],
    diadococinesia: ['typeOfConsonant', 'syllables', 'description', 'ID'],
    novo: ['description', 'label', 'value', 'ID']
  }), []);

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
    if (type === 'novo') {
      append({
        description: '',
        id: '',
        pairs: [{ label: '', value: '' }]
      });
    } else {
      const campos = camposPorTipo[type] || [];
      const novoStep = Object.fromEntries(campos.map(key => [key, '']));
      append(novoStep);
    }
  }, [type, append, camposPorTipo]);

  const onSubmit = async (data) => {
    try {
      if (data.type !== 'novo') {
        data.type = mapTipo(data.type);
      }
      if (typeof data.typeOfProcessing === "string") {
        data.typeOfProcessing = [data.typeOfProcessing];
      }
      await api.post(`/utente/${id}/exercicio/`, data);
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
        steps: dadosExercicioSelecionado?.steps || []
      });
      appendStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoSelecionado]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoSelecionado]);

  useEffect(() => {
    if (exercicioSelecionadoId) {
      const selecionado = exerciciosDisponiveis.find(
        (ex) => ex._id.toString() === exercicioSelecionadoId
      );
      setDadosExercicioSelecionado(selecionado || null);
    } else {
      setDadosExercicioSelecionado(null);
    }
  }, [exercicioSelecionadoId, exerciciosDisponiveis]);

  // Render helpers
  const renderStepFields = (index, type, register, camposPorTipo, camposPorTipoEn) => {
    if (type === 'novo') {
      return (
        <>
          <div className="mb-2">
            <label className="block text-sm">Descrição:</label>
            <input {...register(`steps.${index}.description`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Label:</label>
            <input {...register(`steps.${index}.label`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Valor:</label>
            <input {...register(`steps.${index}.value`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          </div>
          <div className="mb-2">
            <label className="block text-sm">ID:</label>
            <input {...register(`steps.${index}.id`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          </div>
        </>
      );
    }
    return (camposPorTipo[type] || []).map((campo, campoIdx) => {
      const fieldName = camposPorTipoEn[type]?.[campoIdx];
      return (
        <div className="mb-2" key={campo}>
          <label className="block text-sm capitalize">{campo}:</label>
          {campo === 'Texto' ? (
            <textarea {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
          ) : (
            <input {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          )}
        </div>
      );
    });
  };

  const renderStepFieldsReadOnly = (field, index, type, camposPorTipo, camposPorTipoEn) => {
    return (type === 'novo' ? camposPorTipo['novo'] : camposPorTipo[type] || []).map((campo, i) => {
      const key = type === 'novo' ? campo.toLowerCase() : camposPorTipoEn[type]?.[i];
      const isTextarea = campo === 'Texto';
      return (
        <div className="mb-2" key={campo}>
          <label className="block text-sm capitalize">{campo}:</label>
          {isTextarea ? (
            <textarea value={field[key]} readOnly className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" />
          ) : (
            <input value={field[key]} readOnly className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" />
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Adicionar Exercício para Utente</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" {...register("userId", { required: "Id do utilizador é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" readOnly hidden />
          <ErrorMessage errors={errors} name="userId" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
            <select {...register('tipo', { required: "Selecione um tipo." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
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

          {tipoSelecionado && (
            <>
              {Array.isArray(exerciciosDisponiveis) && exerciciosDisponiveis.length > 0 && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Selecionar Exercício Existente</label>
                  <select value={exercicioSelecionadoId} onChange={(e) => setExercicioSelecionadoId(e.target.value)} className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-white">
                    <option value=" ">-- Escolha um exercício --</option>
                    {exerciciosDisponiveis.map((ex) => (
                      <option key={ex._id} value={ex._id.toString()}>{ex.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {dadosExercicioSelecionado && (
                <div className="mt-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Modo de Uso</label>
                  <select value={modoEdicao} onChange={(e) => setModoEdicao(e.target.value)} className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-white">
                    <option value="default">Usar exercício como está</option>
                    <option value="personalizar">Personalizar exercício</option>
                  </select>
                </div>
              )}

              {type === 'novo' ? (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício</label>
                  <input type="text" {...register("type", { required: "Tipo do exercício é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                  <ErrorMessage errors={errors} name="type" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
                </div>
              ) : (
                <input type="hidden" {...register("type")} />
              )}

              {!dadosExercicioSelecionado && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício</label>
                    <input type="text" {...register("name", { required: "Nome do exercício é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
                    <input type="text" {...register("description", { required: "Descrição é obrigatória." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
                  </div>
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
                        <MultiSelect {...field} options={options} optionLabel="label" optionValue="value" filter placeholder="Selecione os tipos de processamento" display="chip" className="w-full md:w-20rem " />
                      )}
                    />
                    <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
                  </div>
                  <div className="mb-4">
                    {type !== null && fields.length > 0 && (
                      <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                        <h3 className="text-lg font-semibold mb-2">Passos</h3>
                        {fields.map((field, index) => (
                          <div key={field.id} className="mb-4 border p-2 rounded">
                            {renderStepFields(index, type, register, camposPorTipo, camposPorTipoEn)}
                            <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
                          </div>
                        ))}
                        <button type="button" onClick={appendStep} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Adicionar mais passos</button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {dadosExercicioSelecionado && (
                <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-600 dark:border-zinc-600 dark:text-white">
                  <div>
                    <label className="font-bold">Nome:</label>
                    <input type="text" value={dadosExercicioSelecionado.name} readOnly={modoEdicao === "default"} onChange={(e) => modoEdicao === "personalizar" && setDadosExercicioSelecionado({ ...dadosExercicioSelecionado, name: e.target.value })} className={`border p-2 w-full rounded ${modoEdicao === "default" ? "bg-gray-400" : "bg-gray-800"}`} />
                  </div>
                  <div>
                    <label className="font-bold">Descrição:</label>
                    <textarea value={dadosExercicioSelecionado.description} readOnly={modoEdicao === "default"} onChange={(e) => modoEdicao === "personalizar" && setDadosExercicioSelecionado({ ...dadosExercicioSelecionado, description: e.target.value })} className={`border p-2 w-full rounded ${modoEdicao === "default" ? "bg-gray-400" : "bg-gray-800"}`} />
                  </div>
                  <div>
                    <label className="font-bold">Tipo de Processamento</label>
                    {modoEdicao === "default" ? (
                      <Controller
                        name="typeOfProcessing"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <MultiSelect {...field} value={Array.isArray(dadosExercicioSelecionado.typeOfProcessing) ? dadosExercicioSelecionado.typeOfProcessing : [dadosExercicioSelecionado.typeOfProcessing]} options={options} optionLabel="label" optionValue="value" display="chip" disabled className="w-full md:w-20rem bg-gray-400" />
                        )}
                      />
                    ) : (
                      <Controller
                        name="typeOfProcessing"
                        control={control}
                        rules={{
                          required: "Selecione pelo menos um tipo de Processamento.",
                          validate: (value) => value?.length > 0 || "Selecione pelo menos um tipo."
                        }}
                        render={({ field }) => (
                          <MultiSelect {...field} value={Array.isArray(dadosExercicioSelecionado.typeOfProcessing) ? dadosExercicioSelecionado.typeOfProcessing : [dadosExercicioSelecionado.typeOfProcessing]} options={options} optionLabel="label" optionValue="value" filter placeholder="Selecione os tipos de processamento" display="chip" className="w-full md:w-20rem bg-gray-800" />
                        )}
                      />
                    )}
                    <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => (<p className="text-red-500 text-sm">{message}</p>)} />
                  </div>
                  <div className="mb-4">
                    {type !== null && dadosExercicioSelecionado.steps.length > 0 && (
                      <div className="w-full m-1.5 p-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                        <h3 className="text-lg font-semibold mb-2">Passos</h3>
                        {dadosExercicioSelecionado.steps.map((field, index) => (
                          <div key={field.id} className="mb-4 border p-2 rounded">
                            {modoEdicao === "default"
                              ? renderStepFieldsReadOnly(field, index, type, camposPorTipo, camposPorTipoEn)
                              : (
                                <>
                                  {renderStepFields(index, type, register, camposPorTipo, camposPorTipoEn)}
                                  <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
                                </>
                              )}
                          </div>
                        ))}
                        {modoEdicao === "personalizar" && (
                          <button type="button" onClick={appendStep} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Adicionar mais passos</button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <button type="submit" className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4">Adicionar Exercício</button>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2 mt-4">
            <button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
}