
// import React, { useEffect, useState } from 'react';
// import api from "../../../api.jsx";
// import { useNavigate, useParams } from 'react-router-dom';
// // import { Card, CardBody, CardFooter } from '@react-ui-org/react-ui';
// import { useForm, Controller } from "react-hook-form";
// import { MultiSelect } from 'primereact/multiselect';
// import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';


// export default function HealthUserInformation() {
//     const [utente, setUtente] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [showReportForm, setShowReportForm] = useState(false);
//     const [report, setReport] = useState({ title: '', observations: '', recommendations: '', internal_note: '' });
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const { register, handleSubmit, reset, control } = useForm();
//     const [tiposSelecionados, setTiposSelecionados] = useState([]);
//     const [comentariosAnalises, setComentariosAnalises] = useState({});

    


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get(`/utente/informacao/${id}`);
//                 setUtente(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id]);

//     const formatarTipo = (tipo) => {
//         const mapa = {
//             articulacao: "Articulação",
//             fonacao: "Fonação",
//             prosodia: "Prosódia",
//             glota: "Glota",
//             reaprendizagem: "Reaprendizagem",
//         };
//         return mapa[tipo] || tipo;
//     };



//     function calcularIdade(dataNascimento) {
//         if (!dataNascimento) return "N/A"; // Se não houver data, retorna "N/A"
    
//         const dataNascimentoObj = new Date(dataNascimento);
//         const hoje = new Date();
    
//         let idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
//         const mesAtual = hoje.getMonth();
//         const mesNascimento = dataNascimentoObj.getMonth();
//         const diaAtual = hoje.getDate();
//         const diaNascimento = dataNascimentoObj.getDate();
    
//         // Ajuste se o aniversário ainda não ocorreu neste ano
//         if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
//             idade--;
//         }
         

//         if (dataNascimentoObj.getFullYear() == hoje.getFullYear()) {
//             if (mesAtual === mesNascimento) idade = String(idade) + " D"
//             else idade = String(idade) + " M"
//         }
//         else idade = String(idade) + " A"
    
//         return String(idade);
//     }

//     const handleEdit = (utenteId) => {
//         // Navigate to the edit page with the utente ID
//         console.log("Editing utente:", utenteId);
//         if (!utenteId) {
//             console.error("Invalid utente ID");
//             return;
//         }
//         navigate(`/utente/${utenteId}/editar`); // Redirect to the edit page with the utente ID
//     };
//     const handleDelete = async (utenteId) => {
//         if (!utenteId) {
//             console.error("Invalid utente ID");
//             return;
//         }
//         try {
//             if (!window.confirm("Tem a certeza que deseja eliminar este utente?")) {
//                 return; // User cancelled the deletion
//             }
//             await api.delete(`/utente/informacao/${utenteId}`);
//             setUtente(utente.filter((u) => u.id !== utenteId));
//             navigate('/'); // Redirect to the list of utentes after deletion    
//         } catch (error) {
//             console.error("Error deleting utente:", error);
//         }
//     };

//     const handleSeeReport = async () => {
//         try {
//             if (!id) {
//                 alert("Utente não encontrado.");
//                 return;
//             }
//             // Navigate to the report page with the utente ID
//             navigate(`/utente/${id}/relatorio`);
//         } catch (err) {
//             console.error("Erro ao Abrir relatório:", err);
//             alert("Erro ao abrir relatório.");
//         }
//     };

    

//     const onSubmit = async (data) => {
//         try {
//              // Verificar se o ID do utente está definido
//             if (!id) {
//                 alert("Utente não encontrado.");
//                 return;
//             }

//             const analises = tiposSelecionados.map((tipo) => ({
//                 tipo,
//                 resultado: comentariosAnalises[tipo] || "",
//             }));
                        
//             const payload = {
//                 ...data,
//                 analises,
//                 utente_id: id,
//                 terapeuta_id: "",
//                 status: data.status,
//                 views: 0, // Inicializa views como 0
//                 created_at: new Date().toISOString(),
//             };

//             const response = await api.post(`/utente/${id}/relatorio/`, payload);
//             alert("Relatório enviado com sucesso!");
//             setMostrarFormulario(false);
//             window.location.reload(); // Recarrega a página para mostrar o novo relatório
//         } catch (error) {
//             console.error("Erro ao enviar relatório:", error);
//             alert("Erro ao enviar relatório.");
//             return;
//         }
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
    

//     return (
        
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             {/* Botão Voltar */}          
//             <div className="absolute top-25 left-1">
//                 <button 
//                     onClick={() => navigate('/')}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 shadow-md"
//                     >
//                     ⬅️ Voltar
//                 </button>
//             </div>

//             {/* <div className="max-w-4xl w-full  bg-gray-100 dark:bg-zinc-900 shadow-md rounded-lg p-6"> */}
//                 <button 
//                     onClick={() => handleSeeReport()}
//                     className="fixed top-26 right-1 z-50 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-zinc-900 dark:hover:bg-blue-800 shadow-md"
//                     >
//                     🩺 Relatório
//                 </button>
//             {/* </div> */}

//                     {utente && Object.keys(utente).length > 0 ? (
//                         <div className="min-w-10/12 mx-auto max-w-4xl mt-10 p-5 m-80  bg-gray-100 rounded-lg dark:bg-zinc-900">
//                             <p className="text-4xl font-semibold text-center dark:text-white mb-6">Dados do Utente</p>
                            
//                             <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow-md">
//                                 {Object.entries(utente).map(([key, value]) => {
//                                     // Correção para MongoDB `_id`
//                                     if (key === "_id") {
//                                         value = value.$oid ? value.$oid : value.toString();
//                                     }

//                                     if (key == "name") {
//                                         key = "Nome"
//                                     }
//                                     if (key == "date_of_birth") {
//                                         key = "Data de Nascimento"
//                                     }

//                                     if (key == "observation") {
//                                         key = "Observação"
//                                     }
//                                     if (key == "health_user_number") {
//                                         key = "Número de Saúde do Utente"
//                                     }
//                                     if (key == "address") {
//                                         key = "Morada"
//                                     }
//                                     if (key == "medical_condition") {
//                                         key = "Condição de Saúde"
//                                     }
//                                     if (key == "cellphone") {
//                                         key = "Telemóvel"
//                                     }
//                                     if (key == "email") {
//                                         key = "Email"
//                                     }

            
//                                     // Substituir `terapist` por `age`
//                                     if (key === "therapist") {
//                                         key = "Idade";
//                                         value = calcularIdade(utente.date_of_birth); // Função para calcular a idade
//                                     }
            
//                                     // Se o valor for um objeto, transformar em string legível
//                                     if (typeof value === "object" && value !== null) {
//                                         value = JSON.stringify(value, null, 2); // Formatação JSON legível
//                                     }
            
//                                     return (
//                                         <div key={key} className="flex justify-between border-b pb-2">
//                                             <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>
//                                             <span>{value ? value.toString() : "N/A"}</span>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             <div className="flex justify-center mt-5 space-x-4">
//                                 <div className="flex flex-col items-center">
//                                     <button 
//                                     onClick={() => handleEdit(utente._id.$oid || utente._id)} 
//                                     className="mb-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors dark:bg-yellow-600 dark:hover:bg-yellow-800">
//                                     Editar
//                                 </button>
//                                 </div>
//                                 <div className="flex flex-col items-center">
//                                     <button 
//                                         onClick={() => handleDelete(utente._id.$oid || utente._id)} 
//                                         className="mb-4 bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-500 dark:hover:bg-red-800">
//                                         Eliminar
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <p>Nenhum dado disponível</p>
//                     )}
//                     {/* Botão Flutuante */}
//                     <button
//                         onClick={() => setMostrarFormulario(true)}
//                         className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-lg text-xl"
//                         aria-label="Criar relatório"
//                     >
//                         + Escrever Relatório
//                     </button>
//                     {mostrarFormulario && (
//                         <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
//                             <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">

//                             {/* <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 py-3 w-full max-w-lg"> */}
//                                 <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">Novo Relatório</h2>
//                                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                                     <div className="max-h-[70vh] overflow-y-auto pr-2">
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Título</label>
//                                             <input
//                                                 type="text"
//                                                 name="title"
//                                                 placeholder="Ex: Análise de Fonação - 10/06/2025"
//                                                 {...register("title", { required: true })}
//                                                 required
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             />
//                                         </div>
//                                         <div>
//                                         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Análise</label>      
//                                             <Controller
//                                                 name="type_of_analysis"
//                                                 control={control}
//                                                 rules={{ required: "Selecione pelo menos um tipo de análise." }}
//                                                 render={({ field }) => (
//                                                     <MultiSelect
//                                                         {...field}
//                                                         value={tiposSelecionados}
//                                                         onChange={(e) => {
//                                                             const selected = e.value || [];
//                                                             setTiposSelecionados(selected);
//                                                             field.onChange(selected);
//                                                         }}
//                                                         options={[
//                                                             { label: 'Articulação', value: 'articulacao' },
//                                                             { label: 'Fonação', value: 'fonacao' },
//                                                             { label: 'Prosódia', value: 'prosodia' },
//                                                             { label: 'Glota', value: 'glota' },
//                                                             { label: 'Reaprendizagem', value: 'reaprendizagem' }
//                                                         ]}
//                                                         filter
//                                                         display="chip"
//                                                         placeholder="Selecione os tipos de análise"
//                                                         className="w-full h-13 border"
//                                                     />

//                                                 )}
//                                             />

//                                             {tiposSelecionados.map((tipo) => (
//                                                 <div key={tipo} className="mt-4">
//                                                     <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">
//                                                     Comentário sobre {formatarTipo(tipo)}
//                                                     </label>
//                                                     <textarea
//                                                     rows="3"
//                                                     placeholder={`Descreva a análise de ${tipo}...`}
//                                                     className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                                     value={comentariosAnalises[tipo] || ""}
//                                                     onChange={(e) =>
//                                                         setComentariosAnalises((prev) => ({
//                                                         ...prev,
//                                                         [tipo]: e.target.value,
//                                                         }))
//                                                     }
//                                                     ></textarea>
//                                                 </div>
//                                             ))}
//                                         </div>
                                        
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Data da Análise</label>
//                                             <input
//                                                 type="date"
//                                                 name="analysis_date"
//                                                 {...register("analysis_date", { required: true })}
//                                                 required
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Observações Principais</label>
//                                             <textarea
//                                                 name="observations"
//                                                 rows="5"
//                                                 {...register("observations")}
//                                                 placeholder="Descreva os principais achados da análise..."
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             ></textarea>
//                                         </div>
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Recomendações ao Paciente</label>
//                                             <textarea
//                                                 name="recommendations"
//                                                 rows="5"
//                                                 {...register("recommendations")}
//                                                 placeholder="Sugira exercícios ou hábitos para a próxima semana..."
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             ></textarea>
//                                         </div>
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nota Confidencial (opcional)</label>
//                                             <textarea
//                                                 name="internal_note"
//                                                 rows="2"
//                                                 {...register("internal_note")}
//                                                 placeholder="Visível apenas para o terapeuta."
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             ></textarea>
//                                         </div>
//                                         <div>
//                                             <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Status do Relatório</label>
//                                             <select
//                                                 name="status"
//                                                 {...register("status", { required: true })}
//                                                 required
//                                                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                                             >
//                                                 <option value="rascunho">Rascunho</option>
//                                                 <option value="finalizado">Finalizado</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div className="flex justify-between mt-4">
//                                         <button
//                                             type="submit"
//                                             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                         >
//                                             Submeter
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
//                     )}
//         </div>
        
//     );
    
    
// }


// import React, { useEffect, useState } from "react";
// import api from "../../../api.jsx";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import { MultiSelect } from "primereact/multiselect";
// import { Pencil, Trash2, Plus, FileText, ArrowLeft } from "lucide-react";

// import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// export default function HealthUserInformation() {
//   const [utente, setUtente] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [mostrarFormulario, setMostrarFormulario] = useState(false);
//   const { register, handleSubmit, control } = useForm();
//   const [tiposSelecionados, setTiposSelecionados] = useState([]);
//   const [comentariosAnalises, setComentariosAnalises] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/informacao/${id}`);
//         setUtente(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   function calcularIdade(dataNascimento) {
//     if (!dataNascimento) return "N/A";
//     const dataNascimentoObj = new Date(dataNascimento);
//     const hoje = new Date();

//     let idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
//     const mesAtual = hoje.getMonth();
//     const mesNascimento = dataNascimentoObj.getMonth();
//     const diaAtual = hoje.getDate();
//     const diaNascimento = dataNascimentoObj.getDate();

//     if (
//       mesAtual < mesNascimento ||
//       (mesAtual === mesNascimento && diaAtual < diaNascimento)
//     ) {
//       idade--;
//     }

//     if (dataNascimentoObj.getFullYear() === hoje.getFullYear()) {
//       return mesAtual === mesNascimento ? `${idade} D` : `${idade} M`;
//     }
//     return `${idade} A`;
//   }

//   const handleEdit = () => navigate(`/utente/${id}/editar`);

//   const handleDelete = async () => {
//     if (!window.confirm("Tem a certeza que deseja eliminar este utente?"))
//       return;
//     try {
//       await api.delete(`/utente/informacao/${id}`);
//       navigate("/");
//     } catch (error) {
//       console.error("Erro ao eliminar utente:", error);
//     }
//   };

//   const handleSeeReport = () => navigate(`/utente/${id}/relatorio`);

//   const onSubmit = async (data) => {
//     try {
//       const analises = tiposSelecionados.map((tipo) => ({
//         tipo,
//         resultado: comentariosAnalises[tipo] || "",
//       }));

//       const payload = {
//         ...data,
//         analises,
//         utente_id: id,
//         status: data.status,
//         views: 0,
//         created_at: new Date().toISOString(),
//       };

//       await api.post(`/utente/${id}/relatorio/`, payload);
//       alert("Relatório enviado com sucesso!");
//       setMostrarFormulario(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Erro ao enviar relatório:", error);
//       alert("Erro ao enviar relatório.");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-xl font-semibold text-gray-700 dark:text-white">
//           Carregando dados do utente...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-xl font-semibold text-red-500">
//           Erro: {error.message}
//         </p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4 py-6">
//       {/* Barra superior */}
//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           <ArrowLeft className="w-5 h-5" /> Voltar
//         </button>

//         <button
//           onClick={handleSeeReport}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
//         >
//           <FileText className="w-5 h-5" /> Relatórios
//         </button>
//       </div>

//       {/* Card de informações do utente */}
//       <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
//           Dados do Utente
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {Object.entries(utente).map(([key, value]) => {
//             if (key === "_id") value = value.$oid || value;
//             if (key === "therapist") {
//               key = "Idade";
//               value = calcularIdade(utente.date_of_birth);
//             }

//             const labels = {
//               name: "Nome",
//               date_of_birth: "Data de Nascimento",
//               observation: "Observação",
//               health_user_number: "Nº Saúde",
//               address: "Morada",
//               medical_condition: "Condição de Saúde",
//               cellphone: "Telemóvel",
//               email: "Email",
//             };

//             return (
//               <div
//                 key={key}
//                 className="flex justify-between border-b pb-1 text-sm"
//               >
//                 <span className="font-semibold text-gray-700 dark:text-gray-300">
//                   {labels[key] || key}:
//                 </span>
//                 <span className="text-gray-600 dark:text-gray-100">
//                   {typeof value === "object" ? JSON.stringify(value) : value}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Botões de ação */}
//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             onClick={handleEdit}
//             className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
//           >
//             <Pencil className="w-4 h-4" /> Editar
//           </button>
//           <button
//             onClick={handleDelete}
//             className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             <Trash2 className="w-4 h-4" /> Eliminar
//           </button>
//         </div>
//       </div>

//       {/* Botão flutuante */}
//       <button
//         onClick={() => setMostrarFormulario(true)}
//         className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
//       >
//         <Plus className="w-6 h-6" />
//       </button>

//       {/* Modal de novo relatório */}
//       {mostrarFormulario && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">
//               Novo Relatório
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Título do relatório"
//                 {...register("title", { required: true })}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               />

//               <Controller
//                 name="type_of_analysis"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <MultiSelect
//                     {...field}
//                     value={tiposSelecionados}
//                     onChange={(e) => {
//                       const selected = e.value || [];
//                       setTiposSelecionados(selected);
//                       field.onChange(selected);
//                     }}
//                     options={[
//                       { label: "Articulação", value: "articulacao" },
//                       { label: "Fonação", value: "fonacao" },
//                       { label: "Prosódia", value: "prosodia" },
//                       { label: "Glota", value: "glota" },
//                       { label: "Reaprendizagem", value: "reaprendizagem" },
//                     ]}
//                     placeholder="Selecione os tipos de análise"
//                     filter
//                     display="chip"
//                     className="w-full"
//                   />
//                 )}
//               />

//               {tiposSelecionados.map((tipo) => (
//                 <textarea
//                   key={tipo}
//                   rows={3}
//                   placeholder={`Comentário sobre ${tipo}`}
//                   value={comentariosAnalises[tipo] || ""}
//                   onChange={(e) =>
//                     setComentariosAnalises((prev) => ({
//                       ...prev,
//                       [tipo]: e.target.value,
//                     }))
//                   }
//                   className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//                 />
//               ))}

//               <input
//                 type="date"
//                 {...register("analysis_date", { required: true })}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               />

//               <textarea
//                 rows={4}
//                 placeholder="Observações principais"
//                 {...register("observations")}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               />

//               <textarea
//                 rows={3}
//                 placeholder="Recomendações ao paciente"
//                 {...register("recommendations")}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               />

//               <textarea
//                 rows={2}
//                 placeholder="Nota interna (visível apenas ao terapeuta)"
//                 {...register("internal_note")}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               />

//               <select
//                 {...register("status", { required: true })}
//                 className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
//               >
//                 <option value="rascunho">Rascunho</option>
//                 <option value="finalizado">Finalizado</option>
//               </select>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setMostrarFormulario(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   Submeter
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../../../api.jsx";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import { MultiSelect } from "primereact/multiselect";
// import { Pencil, Trash2, Plus, FileText, ArrowLeft } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// export default function HealthUserInformation() {
//   const [utente, setUtente] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [mostrarFormulario, setMostrarFormulario] = useState(false);
//   const { register, handleSubmit, control } = useForm();
//   const [tiposSelecionados, setTiposSelecionados] = useState([]);
//   const [comentariosAnalises, setComentariosAnalises] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/informacao/${id}`);
//         setUtente(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   function calcularIdade(dataNascimento) {
//     if (!dataNascimento) return "N/A";
//     const nascimento = new Date(dataNascimento);
//     const hoje = new Date();

//     let idade = hoje.getFullYear() - nascimento.getFullYear();
//     const m = hoje.getMonth() - nascimento.getMonth();
//     if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;

//     if (nascimento.getFullYear() === hoje.getFullYear()) {
//       return m === 0 ? `${idade} D` : `${idade} M`;
//     }
//     return `${idade} A`;
//   }

//   const handleEdit = () => navigate(`/utente/${id}/editar`);
//   const handleSeeReport = () => navigate(`/utente/${id}/relatorio`);

//   const handleDelete = async () => {
//     if (!window.confirm("Tem a certeza que deseja eliminar este utente?")) return;
//     try {
//       await api.delete(`/utente/informacao/${id}`);
//       navigate("/");
//     } catch (error) {
//       console.error("Erro ao eliminar utente:", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const analises = tiposSelecionados.map((tipo) => ({
//         tipo,
//         resultado: comentariosAnalises[tipo] || "",
//       }));

//       const payload = {
//         ...data,
//         analises,
//         utente_id: id,
//         status: data.status,
//         views: 0,
//         created_at: new Date().toISOString(),
//       };

//       await api.post(`/utente/${id}/relatorio/`, payload);
//       alert("Relatório enviado com sucesso!");
//       setMostrarFormulario(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Erro ao enviar relatório:", error);
//       alert("Erro ao enviar relatório.");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-lg font-semibold text-gray-700 dark:text-white animate-pulse">
//           Carregando dados do utente...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-lg font-semibold text-red-500">
//           Erro: {error.message}
//         </p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-8">
//       {/* Barra superior */}
//       <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md"
//         >
//           <ArrowLeft className="w-5 h-5" /> Voltar
//         </button>

//         <button
//           onClick={handleSeeReport}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-800 transition-all shadow-md"
//         >
//           <FileText className="w-5 h-5" /> Relatórios
//         </button>
//       </div>

//       {/* Card de informações */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
//           Dados do Utente
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {Object.entries(utente).map(([key, value]) => {
//             if (key === "_id") value = value.$oid || value;
//             if (key === "therapist") {
//               key = "Idade";
//               value = calcularIdade(utente.date_of_birth);
//             }

//             const labels = {
//               name: "Nome",
//               date_of_birth: "Data de Nascimento",
//               observation: "Observação",
//               health_user_number: "Nº Saúde",
//               address: "Morada",
//               medical_condition: "Condição de Saúde",
//               cellphone: "Telemóvel",
//               email: "Email",
//             };

//             return (
//               <div
//                 key={key}
//                 className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-700 pb-1 text-sm"
//               >
//                 <span className="font-semibold text-gray-700 dark:text-gray-300">
//                   {labels[key] || key}:
//                 </span>
//                 <span className="text-gray-600 dark:text-gray-100 truncate max-w-[60%] text-right">
//                   {typeof value === "object" ? JSON.stringify(value) : value}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Ações */}
//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             onClick={handleEdit}
//             className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl transition-all shadow-md"
//           >
//             <Pencil className="w-4 h-4" /> Editar
//           </button>
//           <button
//             onClick={handleDelete}
//             className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all shadow-md"
//           >
//             <Trash2 className="w-4 h-4" /> Eliminar
//           </button>
//         </div>
//       </motion.div>

//       {/* Botão flutuante */}
//       <button
//         onClick={() => setMostrarFormulario(true)}
//         className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105"
//       >
//         <Plus className="w-6 h-6" />
//       </button>

//       {/* Modal */}
//       <AnimatePresence>
//         {mostrarFormulario && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6"
//             >
//               <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
//                 Novo Relatório
//               </h2>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Título do relatório"
//                   {...register("title", { required: true })}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 />

//                 <Controller
//                   name="type_of_analysis"
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <MultiSelect
//                       {...field}
//                       value={tiposSelecionados}
//                       onChange={(e) => {
//                         const selected = e.value || [];
//                         setTiposSelecionados(selected);
//                         field.onChange(selected);
//                       }}
//                       options={[
//                         { label: "Articulação", value: "articulacao" },
//                         { label: "Fonação", value: "fonacao" },
//                         { label: "Prosódia", value: "prosodia" },
//                         { label: "Glota", value: "glota" },
//                         { label: "Reaprendizagem", value: "reaprendizagem" },
//                       ]}
//                       placeholder="Selecione os tipos de análise"
//                       filter
//                       display="chip"
//                       className="w-full"
//                     />
//                   )}
//                 />

//                 {tiposSelecionados.map((tipo) => (
//                   <textarea
//                     key={tipo}
//                     rows={3}
//                     placeholder={`Comentário sobre ${tipo}`}
//                     value={comentariosAnalises[tipo] || ""}
//                     onChange={(e) =>
//                       setComentariosAnalises((prev) => ({
//                         ...prev,
//                         [tipo]: e.target.value,
//                       }))
//                     }
//                     className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                   />
//                 ))}

//                 <input
//                   type="date"
//                   {...register("analysis_date", { required: true })}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 />

//                 <textarea
//                   rows={4}
//                   placeholder="Observações principais"
//                   {...register("observations")}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 />

//                 <textarea
//                   rows={3}
//                   placeholder="Recomendações ao paciente"
//                   {...register("recommendations")}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 />

//                 <textarea
//                   rows={2}
//                   placeholder="Nota interna (visível apenas ao terapeuta)"
//                   {...register("internal_note")}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 />

//                 <select
//                   {...register("status", { required: true })}
//                   className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
//                 >
//                   <option value="rascunho">Rascunho</option>
//                   <option value="finalizado">Finalizado</option>
//                 </select>

//                 <div className="flex justify-between pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setMostrarFormulario(false)}
//                     className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
//                   >
//                     Cancelar
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                   >
//                     Submeter
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../../../api.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";
import { Pencil, Trash2, Plus, FileText, ArrowLeft, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function HealthUserInformation() {
  const [utente, setUtente] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { register, handleSubmit, control } = useForm();
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

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "N/A";
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;

    if (nascimento.getFullYear() === hoje.getFullYear()) {
      return m === 0 ? `${idade} D` : `${idade} M`;
    }
    return `${idade} A`;
  }

  const handleEdit = () => navigate(`/utente/${id}/editar`);
  const handleSeeReport = () => navigate(`/utente/${id}/relatorio`);

  const handleDelete = async () => {
    if (!window.confirm("Tem a certeza que deseja eliminar este utente?")) return;
    try {
      await api.delete(`/utente/informacao/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Erro ao eliminar utente:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const analises = tiposSelecionados.map((tipo) => ({
        tipo,
        resultado: comentariosAnalises[tipo] || "",
      }));

      const payload = {
        ...data,
        analises,
        utente_id: id,
        status: data.status,
        views: 0,
        created_at: new Date().toISOString(),
      };

      await api.post(`/utente/${id}/relatorio/`, payload);
      alert("Relatório enviado com sucesso!");
      setMostrarFormulario(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      alert("Erro ao enviar relatório.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
          Carregando dados do utente...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-lg font-semibold text-red-500">
          Erro: {error.message}
        </p>
      </div>
    );

  const labels = {
    name: "Nome",
    date_of_birth: "Data de Nascimento",
    observation: "Observação",
    health_user_number: "Nº Saúde",
    address: "Morada",
    medical_condition: "Condição de Saúde",
    cellphone: "Telemóvel",
    email: "Email",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-8 transition-colors duration-300">
      {/* Barra superior */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <button
          onClick={handleSeeReport}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 transition shadow-md"
        >
          <FileText className="w-5 h-5" /> Relatórios
        </button>
      </div>

      {/* Card de informações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="flex items-center justify-center gap-3">
          <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dados do Utente
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(utente).map(([key, value]) => {
            if (key === "_id") value = value.$oid || value;
            if (key === "therapist") {
              key = "Idade";
              value = calcularIdade(utente.date_of_birth);
            }
            return (
              <div
                key={key}
                className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-700/40 shadow-sm flex flex-col"
              >
                <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  {labels[key] || key}
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-100 mt-1 break-words">
                  {typeof value === "object" ? JSON.stringify(value) : value || "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Ações */}
        <div className="flex justify-center gap-4 pt-4 border-t dark:border-zinc-700">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition shadow-md"
          >
            <Pencil className="w-4 h-4" /> Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition shadow-md"
          >
            <Trash2 className="w-4 h-4" /> Eliminar
          </button>
        </div>
      </motion.div>

      {/* Botão flutuante */}
      <button
        onClick={() => setMostrarFormulario(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded shadow-xl transition-transform hover:scale-105"
      >
        {/* <Plus className="w-6 h-6" />*/} Novo Relatório 
      </button>

      {/* Modal */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
                Novo Relatório
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  placeholder="Título do relatório"
                  {...register("title", { required: true })}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                />

                <Controller
                  name="type_of_analysis"
                  control={control}
                  rules={{ required: true }}
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
                        { label: "Articulação", value: "articulacao" },
                        { label: "Fonação", value: "fonacao" },
                        { label: "Prosódia", value: "prosodia" },
                        // { label: "Glota", value: "glota" },
                        // { label: "Reaprendizagem", value: "reaprendizagem" },
                      ]}
                      placeholder="Selecione os tipos de análise"
                      filter
                      display="chip"
                      className="w-full"
                    />
                  )}
                />

                {tiposSelecionados.map((tipo) => (
                  <textarea
                    key={tipo}
                    rows={3}
                    placeholder={`Comentário sobre ${tipo}`}
                    value={comentariosAnalises[tipo] || ""}
                    onChange={(e) =>
                      setComentariosAnalises((prev) => ({
                        ...prev,
                        [tipo]: e.target.value,
                      }))
                    }
                    className="w-full border rounded-lg p-2 mb-2 dark:bg-zinc-700 dark:text-white"
                  />
                ))}

                <input
                  type="date"
                  {...register("analysis_date", { required: true })}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                />

                <textarea
                  rows={4}
                  placeholder="Observações principais"
                  {...register("observations")}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                />

                <textarea
                  rows={3}
                  placeholder="Recomendações ao paciente"
                  {...register("recommendations")}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                />

                <textarea
                  rows={2}
                  placeholder="Nota interna (visível apenas ao terapeuta)"
                  {...register("internal_note")}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                />

                <select
                  {...register("status", { required: true })}
                  className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:text-white"
                >
                  <option value="rascunho">Rascunho</option>
                  <option value="finalizado">Finalizado</option>
                </select>

                <div className="flex justify-between pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Submeter
                  </button>

                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
