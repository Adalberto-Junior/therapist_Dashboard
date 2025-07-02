
import React, { useEffect, useState } from 'react';
import api from "../../../api.jsx";
import { useNavigate, useParams } from 'react-router-dom';
// import { Card, CardBody, CardFooter } from '@react-ui-org/react-ui';
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function HealthUserInformation() {
    const [utente, setUtente] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [showReportForm, setShowReportForm] = useState(false);
    const [report, setReport] = useState({ title: '', observations: '', recommendations: '', internal_note: '' });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { register, handleSubmit, reset, control } = useForm();
    const [tiposSelecionados, setTiposSelecionados] = useState([]);
    const [comentariosAnalises, setComentariosAnalises] = useState({});

    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/informacao/${id}`);
                setUtente(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const formatarTipo = (tipo) => {
        const mapa = {
            articulacao: "Articulação",
            fonacao: "Fonação",
            prosodia: "Prosódia",
            glota: "Glota",
            reaprendizagem: "Reaprendizagem",
        };
        return mapa[tipo] || tipo;
    };



    function calcularIdade(dataNascimento) {
        if (!dataNascimento) return "N/A"; // Se não houver data, retorna "N/A"
    
        const dataNascimentoObj = new Date(dataNascimento);
        const hoje = new Date();
    
        let idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaAtual = hoje.getDate();
        const diaNascimento = dataNascimentoObj.getDate();
    
        // Ajuste se o aniversário ainda não ocorreu neste ano
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }
         

        if (dataNascimentoObj.getFullYear() == hoje.getFullYear()) {
            if (mesAtual === mesNascimento) idade = String(idade) + " D"
            else idade = String(idade) + " M"
        }
        else idade = String(idade) + " A"
    
        return String(idade);
    }

    const handleEdit = (utenteId) => {
        // Navigate to the edit page with the utente ID
        console.log("Editing utente:", utenteId);
        if (!utenteId) {
            console.error("Invalid utente ID");
            return;
        }
        navigate(`/utente/${utenteId}/editar`); // Redirect to the edit page with the utente ID
    };
    const handleDelete = async (utenteId) => {
        if (!utenteId) {
            console.error("Invalid utente ID");
            return;
        }
        try {
            if (!window.confirm("Tem a certeza que deseja eliminar este utente?")) {
                return; // User cancelled the deletion
            }
            await api.delete(`/utente/informacao/${utenteId}`);
            setUtente(utentes.filter((u) => u.id !== utenteId));
            navigate('/utente'); // Redirect to the list of utentes after deletion
        } catch (error) {
            console.error("Error deleting utente:", error);
        }
    };

    const handleSeeReport = async () => {
        try {
            if (!id) {
                alert("Utente não encontrado.");
                return;
            }
            // Navigate to the report page with the utente ID
            navigate(`/utente/${id}/relatorio`);
        } catch (err) {
            console.error("Erro ao Abrir relatório:", err);
            alert("Erro ao abrir relatório.");
        }
    };

    

    const onSubmit = async (data) => {
        try {
             // Verificar se o ID do utente está definido
            if (!id) {
                alert("Utente não encontrado.");
                return;
            }

            const analises = tiposSelecionados.map((tipo) => ({
                tipo,
                resultado: comentariosAnalises[tipo] || "",
            }));
                        
            const payload = {
                ...data,
                analises,
                utente_id: id,
                terapeuta_id: "",
                status: data.status,
                views: 0, // Inicializa views como 0
                created_at: new Date().toISOString(),
            };

            const response = await api.post(`/utente/${id}/relatorio/`, payload);
            alert("Relatório enviado com sucesso!");
            setMostrarFormulario(false);
            window.location.reload(); // Recarrega a página para mostrar o novo relatório
        } catch (error) {
            console.error("Erro ao enviar relatório:", error);
            alert("Erro ao enviar relatório.");
            return;
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
    

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            {/* <div className="max-w-4xl w-full  bg-gray-100 dark:bg-zinc-900 shadow-md rounded-lg p-6">
                <button 
                    onClick={() => navigate('/utente')}
                    className="fixed top-26 left-1 z-50 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 shadow-md"
                    >
                    ⬅️ Voltar
                </button>
            </div> */}
          
            <div className="absolute top-25 left-1">
                <button 
                    onClick={() => navigate('/utente')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 shadow-md"
                    >
                    ⬅️ Voltar
                </button>
            </div>

            {/* <div className="max-w-4xl w-full  bg-gray-100 dark:bg-zinc-900 shadow-md rounded-lg p-6"> */}
                <button 
                    onClick={() => handleSeeReport()}
                    className="fixed top-26 right-1 z-50 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-zinc-900 dark:hover:bg-blue-800 shadow-md"
                    >
                    🩺 Relatório Médico
                </button>
            {/* </div> */}

            {/* <UtenteTabs /> */}
            {/* <div className=" container flex flex-col  mt-10 bg-transparent dark:bg-zinc-800 shadow-md rounded-lg p-6"> */}
                {/* <div className="flex flex-col items-center mt-10"> */}
                    {utente && Object.keys(utente).length > 0 ? (
                        <div className="min-w-10/12 mx-auto max-w-4xl mt-10 p-5 m-80  bg-gray-100 rounded-lg dark:bg-zinc-900">
                            <p className="text-4xl font-semibold text-center dark:text-white mb-6">Dados do Utente</p>
                            
                            <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">
                                {Object.entries(utente).map(([key, value]) => {
                                    // Correção para MongoDB `_id`
                                    if (key === "_id") {
                                        value = value.$oid ? value.$oid : value.toString();
                                    }

                                    if (key == "name") {
                                        key = "Nome"
                                    }
                                    if (key == "date_of_birth") {
                                        key = "Data de Nascimento"
                                    }

                                    if (key == "observation") {
                                        key = "Observação"
                                    }
                                    if (key == "health_user_number") {
                                        key = "Número de Saúde do Utente"
                                    }
                                    if (key == "address") {
                                        key = "Morada"
                                    }
                                    if (key == "medical_condition") {
                                        key = "Condição de Saúde"
                                    }
                                    if (key == "cellphone") {
                                        key = "Telemóvel"
                                    }
                                    if (key == "email") {
                                        key = "Email"
                                    }

            
                                    // Substituir `terapist` por `age`
                                    if (key === "therapist") {
                                        key = "Idade";
                                        value = calcularIdade(utente.date_of_birth); // Função para calcular a idade
                                    }
            
                                    // Se o valor for um objeto, transformar em string legível
                                    if (typeof value === "object" && value !== null) {
                                        value = JSON.stringify(value, null, 2); // Formatação JSON legível
                                    }
            
                                    return (
                                        <div key={key} className="flex justify-between border-b pb-2">
                                            <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
                                            <span>{value ? value.toString() : "N/A"}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-5 space-x-4">
                                <div className="flex flex-col items-center">
                                    <button 
                                    onClick={() => handleEdit(utente._id.$oid || utente._id)} 
                                    className="mb-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors dark:bg-yellow-600 dark:hover:bg-yellow-800">
                                    Editar
                                </button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <button 
                                        onClick={() => handleDelete(utente._id.$oid || utente._id)} 
                                        className="mb-4 bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-500 dark:hover:bg-red-800">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            {/* Botão para criar relatório */}
                    {/* <Card className="mt-10">
                        <CardHeader>
                            <CardTitle>Criar Relatório</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!showReportForm ? (
                                <button
                                    onClick={() => setShowReportForm(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Criar Relatório
                                </button>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); handleCreateReport(); }} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Título"
                                        value={report.title}
                                        onChange={(e) => setReport({ ...report, title: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Observações"
                                        value={report.observations}
                                        onChange={(e) => setReport({ ...report, observations: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Recomendações"
                                        value={report.recommendations}
                                        onChange={(e) => setReport({ ...report, recommendations: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Nota interna (visível só para terapeutas)"
                                        value={report.internal_note}
                                        onChange={(e) => setReport({ ...report, internal_note: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex space-x-4">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Guardar Relatório
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowReportForm(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card> */}
                        </div>
                    ) : (
                        <p>Nenhum dado disponível</p>
                    )}
                    {/* Botão Flutuante */}
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-lg text-xl"
                        aria-label="Criar relatório"
                    >
                        + Escrever Relatório
                    </button>
                    {/* Formulário de Relatório */}
                    {/* {mostrarFormulario && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-xl font-semibold mb-4">Criar Relatório</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleCreateReport(); }} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Título"
                                        value={report.title}
                                        onChange={(e) => setReport({ ...report, title: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Observações"
                                        value={report.observations}
                                        onChange={(e) => setReport({ ...report, observations: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Recomendações"
                                        value={report.recommendations}
                                        onChange={(e) => setReport({ ...report, recommendations: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Nota interna (visível só para terapeutas)"
                                        value={report.internal_note}
                                        onChange={(e) => setReport({ ...report, internal_note: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex space-x-4">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Guardar Relatório
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMostrarFormulario(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )} */}
                    {mostrarFormulario && (
                        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 py-3 w-full max-w-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">Novo Relatório</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="max-h-[70vh] overflow-y-auto pr-2">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Título</label>
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Ex: Análise de Fonação - 10/06/2025"
                                                {...register("title", { required: true })}
                                                required
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Análise</label>      
                                            <Controller
                                                name="type_of_analysis"
                                                control={control}
                                                rules={{ required: "Selecione pelo menos um tipo de análise." }}
                                                render={({ field }) => (
                                                    <MultiSelect
                                                        {...field}
                                                        value={tiposSelecionados}
                                                        onChange={(e) => {
                                                            const selected = e.value || [];
                                                            setTiposSelecionados(selected);
                                                            field.onChange(selected);
                                                        }}
                                                        options={[
                                                            { label: 'Articulação', value: 'articulacao' },
                                                            { label: 'Fonação', value: 'fonacao' },
                                                            { label: 'Prosódia', value: 'prosodia' },
                                                            { label: 'Glota', value: 'glota' },
                                                            { label: 'Reaprendizagem', value: 'reaprendizagem' }
                                                        ]}
                                                        filter
                                                        display="chip"
                                                        placeholder="Selecione os tipos de análise"
                                                        className="w-full h-13 border"
                                                    />

                                                )}
                                            />

                                            {tiposSelecionados.map((tipo) => (
                                                <div key={tipo} className="mt-4">
                                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">
                                                    Comentário sobre {formatarTipo(tipo)}
                                                    </label>
                                                    <textarea
                                                    rows="3"
                                                    placeholder={`Descreva a análise de ${tipo}...`}
                                                    className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                                    value={comentariosAnalises[tipo] || ""}
                                                    onChange={(e) =>
                                                        setComentariosAnalises((prev) => ({
                                                        ...prev,
                                                        [tipo]: e.target.value,
                                                        }))
                                                    }
                                                    ></textarea>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Data da Análise</label>
                                            <input
                                                type="date"
                                                name="analysis_date"
                                                {...register("analysis_date", { required: true })}
                                                required
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Observações Principais</label>
                                            <textarea
                                                name="observations"
                                                rows="5"
                                                {...register("observations")}
                                                placeholder="Descreva os principais achados da análise..."
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Recomendações ao Paciente</label>
                                            <textarea
                                                name="recommendations"
                                                rows="5"
                                                {...register("recommendations")}
                                                placeholder="Sugira exercícios ou hábitos para a próxima semana..."
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nota Confidencial (opcional)</label>
                                            <textarea
                                                name="internal_note"
                                                rows="2"
                                                {...register("internal_note")}
                                                placeholder="Visível apenas para o terapeuta."
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Status do Relatório</label>
                                            <select
                                                name="status"
                                                {...register("status", { required: true })}
                                                required
                                                className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                                            >
                                                <option value="rascunho">Rascunho</option>
                                                <option value="finalizado">Finalizado</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Submeter
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
            {/* </div> */}
        </div>
        
    );
    
    
}
