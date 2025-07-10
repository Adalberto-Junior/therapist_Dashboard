import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from "../../../api";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FloatingForm from './floatingUtenteForm'; // Importando o componente de formulário flutuante
import { MultiSelect } from 'primereact/multiselect';


export default function AllUtente() {
    const [utentes, setUtentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Obter o ID do URL
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [exercise, setExercise] = useState();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [type, setType] = useState('');
    const {
        register, handleSubmit, watch, control, reset, formState: { errors }
      } = useForm({
        defaultValues: {
          tipo: '',
          steps: []
        }
      });
    const [tiposSelecionados, setTiposSelecionados] = useState([]);
    const [comentariosAnalises, setComentariosAnalises] = useState({});

    useEffect(() => {
        // Fetch data from the Flask API
        const fetchData = async () => {
            try {
                const response = await api.get('/utente/');
                setUtentes(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOpen = async (id) => {
        navigate(`/utente/${id}/informacao`);
    };

    // EXERCIÍO:::::::::::::::::::::::::::::::::::::
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
          diadococinesia: 'Diadococinésia',
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
        { label: 'Fonológico', value: 'phonological'}
    ];

    const onSubmit = async (data) => {
        try {
            data.type = mapTipo(data.type)
            if (typeof data.typeOfProcessing === "string") {
                data.typeOfProcessing = [data.typeOfProcessing];
            }

            const response = await api.post(`/utente/exercicio/`, data);
            alert("Exercício adicionado com sucesso!");
            setMostrarFormulario(false);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao adicionar exercício:", error);
            alert("Erro ao adicionar exercício. Tente novamente.");
        }
    };

    const handleSeeGenericExercise = async () => {
        try {
            navigate("/exercicios/genericos");
        } catch (err) {
            console.error("Erro ao Abrir lista de Exercícios:", err);
            alert("Erro ao abrir Exercícios Genéricos.");
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
    
    if (utentes.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
              <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-5">Nenhum dado disponível</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
                >
                    Adicionar Utente
                </button>
                {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
              </div>
            </div>
        );
    }
        
    if (utentes.length > 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <button 
                    onClick={() => handleSeeGenericExercise()}
                    className="fixed top-26 right-1 z-50 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-zinc-900 dark:hover:bg-blue-800 shadow-md"
                    >
                    Exercicios Genéricos
                </button>
                <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-20">
                {/* <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100"> */}
                    <h2 className="text-2xl font-bold text-center mb-5">Lista de Utentes</h2>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Nome</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {utentes.map((utente) => (
                                <tr key={utente._id.$oid || utente._id}>
                                    <td className="py-2 px-4 border-b">{utente._id.$oid || utente._id.toString()}</td>
                                    <td className="py-2 px-4 border-b">{utente.name}</td>
                                    <td className="py-2 px-4 border-b">{utente.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => handleOpen(utente._id.$oid || utente._id.toString())}
                                         className="bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
                                            Abrir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
                        style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
                    >
                        Adicionar Utente
                    </button>
                    {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
                </div>
                {/* Botão Flutuante */}
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-lg text-xl"
                        aria-label="Criar relatório"
                    >
                        + Adicionar Exercício Génerico
                    </button>

                    {mostrarFormulario && (
                        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                                <h2 className="text-9xl font-semibold text-center text-black dark:text-white mb-4">Adicionar Exercício Génerico</h2>
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
                                    <div className="max-h-[70vh] overflow-y-auto pr-2">
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
                                    </div>
                        
                                    {/* Botões */}
                                    <div className="flex justify-between mt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Adicionar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMostrarFormulario(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}