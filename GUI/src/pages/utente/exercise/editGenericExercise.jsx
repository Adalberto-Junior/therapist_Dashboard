import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function EditarGenericExercicioForm () {
    const { id } = useParams();
    const [type, setType] = useState('');
    const [exercicio, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            tipo: "",
            type: "",
            name: "",
            description: "",
            typeOfProcessing: "",
            steps: [],
            tipoSelecionado: "",
            therapist: "",
            ID: "",
        }
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps'
    });

    // Buscar exercício
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching exercise with ID:', id);
        if (!id) {
          throw new Error('ID do exercício não fornecido');
        }

        const response = await api.get(`/utente/exercicio/${id}/`);
        const data = response.data;

        setExercise(data);

        // ⚠️ Atualiza o formulário com os dados recebidos
        reset({
          tipo: tipoPorLabel[data.type] ? tipoPorLabel[data.type] : "novo",
          type: data.type || "",
          name: data.name || "",
          description: data.description || "",
          typeOfProcessing: Array.isArray(data.typeOfProcessing)? data.typeOfProcessing : [data.typeOfProcessing],
          steps: data.steps || [],
          therapist: data.therapist || "",
          ID: data.ID || ""
        });
        

      } catch (error) {
        console.error('Erro ao buscar exercício:', error);
        setError('Erro ao buscar exercício.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id, reset]);

    
    const camposPorTipo = {
    palavras: ['Palavras', 'Instrução','ID'],
    frases: ['Frase', 'Instrução','ID'],
    leitura: ['Título', 'Texto', 'Instrução', 'ID'],
    discurso: ['Questão', 'Instrução','ID'],
    diadococinesia: ['Tipo de Consoante', 'Sílabas', 'Instrução','ID'],
    novo: ['label', 'valor','ID']
  };

  const camposPorTipoEn = {
    palavras: ['word', 'description','ID'],
    frases: ['sentence', 'description','ID'],
    leitura: ['title', 'text', 'description','ID'],
    discurso: ['question', 'description','ID'],
    diadococinesia: ['typeOfConsonant', 'syllables', 'description','ID'],
    novo: ['label', 'value','ID']
  };

    const tipoPorLabel = {
        'Repetição de Palavras': 'palavras',
        'Repetição de Frases': 'frases',
        'Atividades de Leitura': 'leitura',
        'Discurso Espontâneo': 'discurso',
        'Diadococinésia': 'diadococinesia'
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

    useEffect(() => {
        const subscription = watch((value) => {
            setType(value.tipo); // Atualiza o estado com o novo tipo selecionado
        });

        return () => subscription.unsubscribe(); // limpa subscrição
    }, [watch]);

    

    const tipoSelecionado = watch('tipo');

    const appendStep = () => {
        if (tipoSelecionado === 'novo') {
        append({ label: '', value: '' });
        } else {
        const campos = camposPorTipo[tipoSelecionado] || [];
        const novoStep = Object.fromEntries(campos.map((key) => [camposPorTipoEn[tipoSelecionado][campos.indexOf(key)], '']));
        append(novoStep);
        }
    };

    const onSubmit = async (data) => {
        try {
            data.type = mapTipo(data.tipo);
            if (!Array.isArray(data.typeOfProcessing)) {
                data.typeOfProcessing = [data.typeOfProcessing];
            }
            if (data.user !== undefined && data.user === "" && data.user !== null) {
                delete data.user;
            }
            await api.put(`/utente/exercicio/${id}/`, data);
            alert('Exercício editado com sucesso!');
            window.history.back();
        } catch (error) {
            console.error('Erro ao editar exercício:', error);
            alert(`Erro ao editar exercício:  ${error.response?.data?.error || ''}`);
        }
    };


    if (loading){
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
        </div>
        );
    }
    if (error) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <p className="text-2xl font-semibold text-center dark:text-white mb-6">Error: {error.message}</p>
            </div>
         ) 
    }

    if (!exercicio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Exercício não encontrado.</p>
            </div>
        );
    }
    const campos = camposPorTipo[tipoSelecionado] || [];
    const camposEn = camposPorTipoEn[tipoSelecionado] || [];
    const isNovo = tipoSelecionado === 'novo';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4 p-5">
        {/* <div className=" w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">

            <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Editar Exercício</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register('therapist')} />

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Exercício <span style={{ color: 'red' }}>*</span></label>
                <select {...register('tipo', { required: true })} 
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

            {tipoSelecionado === 'novo' && (
                <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo personalizado <span style={{ color: 'red' }}>*</span></label>
                <input {...register('type', { required: true })} 
                 className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
                </div>
            )}

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome <span style={{ color: 'red' }}>*</span></label>
                <input {...register('name', { required: true })} 
                 className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
                <input {...register('description')} 
                 className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento <span style={{ color: 'red' }}>*</span></label>
                <Controller
                    name="typeOfProcessing"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <MultiSelect
                            {...field}
                            options={[
                                { label: 'Articulação', value: 'articulation' },
                                { label: 'Fonação', value: 'phonation' },
                                { label: 'Glota', value: 'glotta' },
                                { label: 'Prosódia', value: 'prosody' },
                                { label: 'Reaprendizagem', value: 'relearning' },
                                { label: 'Fonológico', value: 'phonological' }
                            ]}
                            placeholder="Selecione os tipos de processamento"
                            filter
                            display="chip"
                            className="w-full h-16 p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-600 dark:text-black"
                        />
                    )}
                />
                <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
            </div>

            <div className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300">
                <h3 className="text-lg font-semibold mb-2">Passos <span style={{ color: 'red' }}>*</span></h3>
                {fields.map((field, index) => (
                <div key={field.id} className="mb-4 border p-2 rounded">
                    {(tipoSelecionado === 'novo' ? camposPorTipo['novo'] : camposPorTipo[tipoSelecionado] || []).map((campo, i) => {
                    const key = tipoSelecionado === 'novo' ? campo.toLowerCase() : camposPorTipoEn[tipoSelecionado][i];
                    const isTextarea = campo === 'Texto';
                    return (
                        <div className="mb-2 " key={campo}>
                        <label className="block text-sm capitalize">{campo} <span style={{ color: 'red' }}>*</span></label>
                        {isTextarea ? (
                            <textarea {...register(`steps.${index}.${key}`, { required: true })} 
                                className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                            />
                        ) : (
                            <input {...register(`steps.${index}.${key}`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-700 " />
                        )}
                        </div>
                    );
                    })}
                    <button type="button" onClick={() => remove(index)} className="text-red-600 hover:underline">Remover</button>
                </div>
                ))}
                <button type="button" onClick={appendStep} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Adicionar passo
                </button>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-900"><span style={{ color: 'red' }}>*</span> Campos obrigatórios</div>

            <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                <button type="button" onClick={() => window.history.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancelar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}
