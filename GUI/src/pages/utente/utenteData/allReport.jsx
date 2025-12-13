// import { useEffect, useState } from "react";
// import api from "../../../api.jsx";
// import { useNavigate, useParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';

// export default function ReportList() {
//     const [relatorios, setRelatorios] = useState([]);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const response = await api.get(`/utente/${id}/relatorio/`);
//                     setRelatorios(response.data);
//                     console.log(response.data);
//                 } catch (error) {
//                     setError(error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchData();
//     }, [id]);

//     const onEdit = (rel) => {
//         const id_ = rel._id.$oid || rel._id; // Garante que o ID é uma string
//         navigate(`/utente/${id}/relatorio/edit/${id_}`); // Garante que o ID é uma string
//     };

//     const onDelete = async (relId) => {
//         if (window.confirm("Tem certeza que deseja eliminar este relatório?")) {
//             try {
//                 const relId_ = relId.$oid || relId; // Garante que relId é uma string
//                 await api.delete(`/utente/${relId_}/relatorio/`);
//                 setRelatorios(relatorios.filter(rel => rel._id !== relId));
//                 alert("Relatório eliminado com sucesso.");
//                 // window.location.reload(); // Recarrega a página para atualizar a lista
//             } catch (error) {
//                 console.error("Erro ao eliminar relatório:", error);
//                 alert("Erro ao eliminar relatório. Por favor, tente novamente.");
//             }
//         }
//     };

//     const exportarPDF = (rel, index, incluirNotaInterna) => {
//         const element = document.getElementById(`relatorio-${index}`);
//         if (!element) {
//             console.error(`Elemento relatorio-${index} não encontrado.`);
//             return;
//         }

//         const notaEl = element.querySelector('.nota-interna');
//         const originalDisplay = notaEl?.style?.display;

//         if (!incluirNotaInterna && notaEl) notaEl.style.display = 'none';

//         const opt = {
//             margin: 0.5,
//             filename: `${rel.title.replace(/\s+/g, '_')}_${rel.analysis_date}.pdf`,
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//         };

//         html2pdf().set(opt).from(element).save().then(() => {
//             if (notaEl) notaEl.style.display = originalDisplay || '';
//         });
//     };

//     const tipoDeAnalise = {
//       "articulacao": "Articulação",
//       "fonacao": "Fonação",
//       "glotis": "Glotal",
//       "prosodia": "Prosódia",
//       "glota": "Glota",
//       "reaprendizagem": "Reaprendizagem",
//     }

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



//     if (loading){
//         return(
//          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             <p className="text-2xl font-semibold text-center dark:text-white mb-6">Loading...</p>
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
    
//     // console.log(relatorios);  
//     return (
//   <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4 py-6 relative">
//     {/* Botão de voltar fixo no topo esquerdo */}
//     <button
//       onClick={() => navigate(-1)}
//       className="absolute top-4 left-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 shadow"
//     >
//       ← Voltar
//     </button>

//     {/* Título centralizado */}
//     <div className="text-center mb-12">
//       <p className="text-4xl font-bold  dark:text-white">Relatórios Médicos</p>
//     </div>

//     {/* Relatórios */}
//     <div className="max-w-4xl mx-auto space-y-12">
//       {relatorios.length === 0 ? (
//         <p className="text-2xl font-semibold text-center dark:text-white py-40">
//           Nenhum relatório encontrado.
//         </p>
//       ) : (
//         relatorios.map((rel, index) => (
//           <div
//             key={rel._id}
//             id={`relatorio-${index}`}
//             className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-zinc-700"
//           >
//             {/* Cabeçalho */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white flex items-center gap-2">
//                 🩺 {rel.title}
//               </h2>
//               <span className="text-sm text-gray-500 dark:text-zinc-400">
//                 {new Date(rel.analysis_date).toLocaleDateString()}
//               </span>
//             </div>

//             <hr className="border-gray-300 dark:border-zinc-700 my-4" />

//             {/* Corpo do relatório */}
//             <div className="text-gray-700 dark:text-gray-500 font-serif space-y-4 text-lg leading-relaxed">
//               <p>
//                 <strong className="dark:text-gray-900">Tipo de Análise:</strong>{" "}
//                 {rel.type_of_analysis?.map((tipo, index) => (
//                     <span
//                     key={index}
//                     className="inline-block bg-gray-200 dark:bg-zinc-600 text-gray-800 dark:text-white px-2 py-1 rounded-full mr-2 text-sm"
//                     >
//                     {tipoDeAnalise[tipo] || tipo}
//                     </span>
//                 ))}
//               </p>
//               <p><strong className="dark:text-gray-900">Observações Clínicas:</strong><br /> {rel.observations}</p>
//               <p>
//                 <strong className="dark:text-gray-900">Comentários da Análise:</strong>{" "}
//                 {rel.analysis?.map((comentario,index) =>(
//                   <ul
//                   key={index}
//                   //  className="text-sm italic dark:text-zinc-500 nota-interna"
//                   >
//                     <li>
//                       <strong className="dark:text-gray-700">{formatarTipo(comentario.tipo)}: </strong>{comentario.resultado}
//                     </li>
//                   </ul>
//                 ))}

//               </p>
//               <p><strong className="dark:text-gray-900">Recomendações Terapêuticas:</strong><br /> {rel.recommendations}</p>
//               {rel.internal_note && (
//                 <p className="text-sm italic dark:text-zinc-500 nota-interna">
//                   <strong>Nota Interna:</strong> {rel.internal_note}
//                 </p>
//               )}
//               <p><strong className="dark:text-gray-900">Status:</strong> {rel.status}</p>
//               <p><strong className="dark:text-gray-900">Visualizações:</strong> {rel.views || 0}</p>
//               <p><strong className="dark:text-gray-900">Criado em:</strong> {new Date(rel.created_at).toLocaleDateString()}</p>
//               {/* <p><strong className="dark:text-gray-900">Utente ID:</strong> {rel.utente_id.$oid || rel.utente_id}</p> */}

//               {/* Assinatura fictícia */}
//             {/* <div className="mt-12 text-right">
//               <p className="text-sm">__________________________________</p>
//               <p className="text-sm">Terapeuta Responsável</p>
//             </div> */}
//             </div>

//             {/* Ações */}
//             <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => onEdit(rel)}
//                   className="text-blue-600 dark:text-blue-400 hover:underline rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-zinc-700"
//                 >
//                   ✏️ Editar Relatório
//                 </button>
//                 <button
//                   onClick={() => onDelete(rel._id)}
//                   className="text-red-600 dark:text-red-400 hover:underline rounded px-4 py-2 hover:bg-red-100 dark:hover:bg-zinc-700"
//                 >
//                   🗑️ Eliminar Relatório
//                 </button>
//               </div>

//               <div className="relative group">
//                 <button className="text-green-600 dark:text-green-400 hover:underline rounded px-4 py-2">
//                   📄 Exportar PDF ▾
//                 </button>
//                 <div className="absolute hidden group-hover:block bg-white dark:bg-zinc-800 shadow-lg rounded z-10 mt-1 right-0 w-60 border border-gray-200 dark:border-zinc-700">
//                   <button
//                     onClick={() => exportarPDF(rel, index, true)}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm"
//                   >
//                     🔒 Uso interno (com nota)
//                   </button>
//                   <button
//                     onClick={() => exportarPDF(rel, index, false)}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm"
//                   >
//                     👤 Para utente (sem nota)
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );

// }


// import { useEffect, useState } from "react";
// import api from "../../../api.jsx";
// import { useNavigate, useParams } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import { ArrowLeft, Pencil, Trash2, FileDown, ShieldCheck } from "lucide-react";

// export default function ReportList() {
//   const [relatorios, setRelatorios] = useState([]);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/utente/${id}/relatorio/`);
//         setRelatorios(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const onEdit = (rel) => {
//     const id_ = rel._id.$oid || rel._id;
//     navigate(`/utente/${id}/relatorio/edit/${id_}`);
//   };

//   const onDelete = async (relId) => {
//     if (window.confirm("Tem certeza que deseja eliminar este relatório?")) {
//       try {
//         const relId_ = relId.$oid || relId;
//         await api.delete(`/utente/${relId_}/relatorio/`);
//         setRelatorios(relatorios.filter((rel) => rel._id !== relId));
//       } catch (error) {
//         console.error("Erro ao eliminar relatório:", error);
//         alert("Erro ao eliminar relatório. Por favor, tente novamente.");
//       }
//     }
//   };

//   const exportarPDF = (rel, index, incluirNotaInterna) => {
//     const element = document.getElementById(`relatorio-${index}`);
//     if (!element) return;

//     const notaEl = element.querySelector(".nota-interna");
//     const originalDisplay = notaEl?.style?.display;

//     if (!incluirNotaInterna && notaEl) notaEl.style.display = "none";

//     const opt = {
//       margin: 0.5,
//       filename: `${rel.title.replace(/\s+/g, "_")}_${rel.analysis_date}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf()
//       .set(opt)
//       .from(element)
//       .save()
//       .then(() => {
//         if (notaEl) notaEl.style.display = originalDisplay || "";
//       });
//   };

//   const tipoDeAnalise = {
//     articulacao: "Articulação",
//     fonacao: "Fonação",
//     prosodia: "Prosódia",
//     glota: "Glota",
//     reaprendizagem: "Reaprendizagem",
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
//         <p className="text-xl text-gray-600 dark:text-white animate-pulse">
//           Carregando relatórios...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
//         <p className="text-xl text-red-500">Erro: {error.message}</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-8">
//       {/* Botão voltar */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
//       >
//         <ArrowLeft className="w-5 h-5" /> Voltar
//       </button>

//       {/* Cabeçalho */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//           Relatórios Médicos
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Histórico completo das análises e observações clínicas
//         </p>
//       </div>

//       {/* Lista de relatórios */}
//       <div className="max-w-5xl mx-auto space-y-10">
//         {relatorios.length === 0 ? (
//           <p className="text-center text-xl text-gray-500 dark:text-gray-300 py-20">
//             Nenhum relatório encontrado para este utente.
//           </p>
//         ) : (
//           relatorios.map((rel, index) => (
//             <div
//               key={rel._id}
//               id={`relatorio-${index}`}
//               className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700"
//             >
//               {/* Cabeçalho do relatório */}
//               <div className="flex justify-between items-center border-b border-gray-300 dark:border-zinc-700 pb-4 mb-4">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                   <ShieldCheck className="w-5 h-5 text-blue-600" /> {rel.title}
//                 </h2>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {new Date(rel.analysis_date).toLocaleDateString()}
//                 </span>
//               </div>

//               {/* Conteúdo */}
//               <div className="space-y-3 text-gray-700 dark:text-gray-300">
//                 <div>
//                   <strong>Tipo de Análise:</strong>{" "}
//                   {rel.type_of_analysis?.map((tipo, idx) => (
//                     <span
//                       key={idx}
//                       className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs mr-2"
//                     >
//                       {tipoDeAnalise[tipo] || tipo}
//                     </span>
//                   ))}
//                 </div>
//                 {rel.observations && (
//                   <p>
//                     <strong>Observações Clínicas:</strong> {rel.observations}
//                   </p>
//                 )}
//                 {rel.analysis?.length > 0 && (
//                   <div>
//                     <strong>Comentários da Análise:</strong>
//                     <ul className="list-disc list-inside mt-1 space-y-1">
//                       {rel.analysis.map((c, i) => (
//                         <li key={i}>
//                           <span className="font-semibold">
//                             {tipoDeAnalise[c.tipo] || c.tipo}:
//                           </span>{" "}
//                           {c.resultado}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {rel.recommendations && (
//                   <p>
//                     <strong>Recomendações:</strong> {rel.recommendations}
//                   </p>
//                 )}
//                 {rel.internal_note && (
//                   <p className="nota-interna text-xs italic text-gray-500 dark:text-gray-400">
//                     <strong>Nota Interna:</strong> {rel.internal_note}
//                   </p>
//                 )}
//                 <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2">
//                   <p>
//                     <strong>Status:</strong> {rel.status}
//                   </p>
//                   <p>
//                     <strong>Visualizações:</strong> {rel.views || 0}
//                   </p>
//                   <p>
//                     <strong>Criado em:</strong>{" "}
//                     {new Date(rel.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Ações */}
//               <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => onEdit(rel)}
//                     className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm transition"
//                   >
//                     <Pencil className="w-4 h-4" /> Editar
//                   </button>
//                   <button
//                     onClick={() => onDelete(rel._id)}
//                     className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
//                   >
//                     <Trash2 className="w-4 h-4" /> Eliminar
//                   </button>
//                 </div>

//                 <div className="relative group">
//                   <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm">
//                     <FileDown className="w-4 h-4" /> Exportar
//                   </button>
//                   <div className="absolute hidden group-hover:block bg-white dark:bg-zinc-700 rounded shadow-md border border-gray-200 dark:border-zinc-600 mt-1 right-0 w-52 z-10">
//                     <button
//                       onClick={() => exportarPDF(rel, index, true)}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm"
//                     >
//                       📄 Uso interno (com nota)
//                     </button>
//                     <button
//                       onClick={() => exportarPDF(rel, index, false)}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm"
//                     >
//                       👤 Para utente (sem nota)
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../../api.jsx";
import { useNavigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { ArrowLeft, Pencil, Trash2, FileDown, ShieldCheck, X, Loader2 } from "lucide-react";


export default function ReportList() {
  const [relatorios, setRelatorios] = useState([]);
  const [relatoriosFiltrados, setRelatoriosFiltrados] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/utente/${id}/relatorio/`);
        setRelatorios(response.data);
        setRelatoriosFiltrados(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 🔎 Aplicar filtros
  useEffect(() => {
    let filtrados = relatorios;

    if (dataInicio) {
      filtrados = filtrados.filter(
        (rel) => new Date(rel.analysis_date) >= new Date(dataInicio)
      );
    }

    if (dataFim) {
      filtrados = filtrados.filter(
        (rel) => new Date(rel.analysis_date) <= new Date(dataFim)
      );
    }

    if (tipoSelecionado) {
      filtrados = filtrados.filter((rel) =>
        rel.type_of_analysis?.includes(tipoSelecionado)
      );
    }

    setRelatoriosFiltrados(filtrados);
  }, [dataInicio, dataFim, tipoSelecionado, relatorios]);

  const resetFiltros = () => {
    setDataInicio("");
    setDataFim("");
    setTipoSelecionado("");
    setRelatoriosFiltrados(relatorios);
  };

  const onEdit = (rel) => {
    const id_ = rel._id.$oid || rel._id;
    navigate(`/utente/${id}/relatorio/edit/${id_}`);
  };

  // const onDelete = async (relId) => {
  //   if (window.confirm("Tem certeza que deseja eliminar este relatório?")) {
  //     try {
  //       const relId_ = relId.$oid || relId;
  //       await api.delete(`/utente/${relId_}/relatorio/`);
  //       setRelatorios(relatorios.filter((rel) => rel._id !== relId));
  //     } catch (error) {
  //       console.error("Erro ao eliminar relatório:", error);
  //       alert("Erro ao eliminar relatório. Por favor, tente novamente.");
  //     }
  //   }
  // };

  // const exportarPDF = async (rel, index, incluirNotaInterna) => {
  //   try {
  //     const element = document.getElementById(`relatorio-${index}`);
  //     if (!element) {
  //       console.error(`Elemento com id relatorio-${index} não encontrado.`);
  //       return;
  //     }

  //     const notaEl = element.querySelector(".nota-interna");
  //     const originalDisplay = notaEl?.style?.display;
  //     if (!incluirNotaInterna && notaEl) notaEl.style.display = "none";

  //     const opt = {
  //       margin: 0.5,
  //       filename: `${rel.title.replace(/\s+/g, "_")}_${rel.analysis_date}.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2, logging: true }, // logging ajuda a debugar
  //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //     };

  //     console.log("🔄 Gerando PDF para:", rel.title);
  //     await html2pdf().set(opt).from(element).save();
  //     console.log("✅ PDF gerado com sucesso!");
      
  //     if (notaEl) notaEl.style.display = originalDisplay || "";
  //   } catch (err) {
  //     console.error("❌ Erro ao gerar PDF:", err);
  //     alert("Ocorreu um erro ao exportar o relatório. Veja o console para detalhes.");
  //   }
  // };
  const exportarPDF = async (rel, index, incluirNotaInterna) => {
    try {
      const element = document.getElementById(`relatorio-${index}`);
      if (!element) {
        console.error(`Elemento com id relatorio-${index} não encontrado.`);
        return;
      }

      // 🔄 Clonar o elemento para não alterar o original
      const clone = element.cloneNode(true);
      clone.style.backgroundColor = "white";
      clone.style.color = "rgb(17, 24, 39)"; // text-gray-900

      // 🔄 Converter todas as cores internas para RGB
      const allNodes = clone.querySelectorAll("*");
      allNodes.forEach((node) => {
        const style = window.getComputedStyle(node);

        // Força cor de fundo para RGB ou branco
        const bg = style.backgroundColor;
        if (bg && bg.startsWith("oklch")) node.style.backgroundColor = "white";
        else if (bg && bg !== "rgba(0, 0, 0, 0)") node.style.backgroundColor = bg;

        // Força cor do texto para RGB
        const color = style.color;
        if (color && color.startsWith("oklch")) node.style.color = "rgb(17, 24, 39)";
        else if (color) node.style.color = color;
      });

      // 🔄 Se for para o utente, esconde a nota interna
      if (!incluirNotaInterna) {
        const notaEl = clone.querySelector(".nota-interna");
        if (notaEl) notaEl.style.display = "none";
      }

      // Configuração do PDF
      const opt = {
        margin: 0.5,
        filename: `${rel.title.replace(/\s+/g, "_")}_${rel.analysis_date}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      console.log("🔄 Gerando PDF para:", rel.title);
      await html2pdf().set(opt).from(clone).save();
      console.log("✅ PDF gerado com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao gerar PDF:", err);
      alert("Ocorreu um erro ao exportar o relatório. Veja o console para detalhes.");
    }
  };



  const tipoDeAnalise = {
    articulacao: "Articulação",
    fonacao: "Fonação",
    prosodia: "Prosódia",
    glota: "Glota",
    reaprendizagem: "Reaprendizagem",
  };

  if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
          <Loader2 className="animate-spin w-10 h-10 text-primary mb-3" />
          <p className="text-lg font-semibold dark:text-white">Carregando os dados...</p>
        </div>
      );
    }

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-xl text-red-500">Erro: {error.message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-8">
      {/* Botão voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
      >
        <ArrowLeft className="w-5 h-5" /> Voltar
      </button>

      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Relatórios
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Histórico completo das análises e observações clínicas
        </p>
      </div>

      {/* Filtros */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow p-4 mb-8 border border-gray-200 dark:border-zinc-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Filtrar Relatórios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Data Início
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full p-2 rounded border dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Data Fim
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full p-2 rounded border dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Tipo de Análise
            </label>
            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              className="w-full p-2 rounded border dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            >
              <option value="">Todos</option>
              {Object.entries(tipoDeAnalise).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFiltros}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 rounded w-full justify-center"
            >
              <X className="w-4 h-4" /> Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de relatórios */}
      <div className="max-w-5xl mx-auto space-y-10">
        {relatoriosFiltrados.length === 0 ? (
          <p className="text-center text-xl text-gray-500 dark:text-gray-300 py-20">
            Nenhum relatório encontrado para os filtros aplicados.
          </p>
        ) : (
          relatoriosFiltrados.map((rel, index) => (
            <div
              key={rel._id}
              id={`relatorio-${index}`}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700"
            >
              {/* Cabeçalho do relatório */}
              <div className="flex justify-between items-center border-b border-gray-300 dark:border-zinc-700 pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" /> {rel.title}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(rel.analysis_date).toLocaleDateString()}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div>
                  <strong>Tipo de Análise:</strong>{" "}
                  {rel.type_of_analysis?.map((tipo, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs mr-2"
                    >
                      {tipoDeAnalise[tipo] || tipo}
                    </span>
                  ))}
                </div>
                {rel.observations && (
                  <p>
                    <strong>Observações Clínicas:</strong> {rel.observations}
                  </p>
                )}
                {rel.analysis?.length > 0 && (
                  <div>
                    <strong>Comentários da Análise:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {rel.analysis.map((c, i) => (
                        <li key={i}>
                          <span className="font-semibold">
                            {tipoDeAnalise[c.tipo] || c.tipo}:
                          </span>{" "}
                          {c.resultado}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rel.recommendations && (
                  <p>
                    <strong>Recomendações:</strong> {rel.recommendations}
                  </p>
                )}
                {rel.internal_note && (
                  <p className="nota-interna text-xs italic text-red-500 dark:text-red-400">
                    <strong>Nota Interna:</strong> {rel.internal_note}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2">
                  <p>
                    <strong>Status:</strong> {rel.status}
                  </p>
                  <p>
                    <strong>Visualizações:</strong> {rel.views || 0}  
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Criado em:</strong>{" "}
                  {new Date(rel.created_at).toLocaleDateString()}
                </div>
                
              </div>

              {/* Ações */}
              <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(rel)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow-sm transition"
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button
                    onClick={() => onDelete(rel._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm transition"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                </div>

                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm">
                    <FileDown className="w-4 h-4" /> Exportar
                  </button>
                  <div className="absolute hidden group-hover:block bg-white dark:bg-zinc-700 rounded shadow-md border border-gray-200 dark:border-zinc-600 mt-1 right-0 w-52 z-10">
                    <button
                      onClick={() => exportarPDF(rel, index, true)}
                      className="block w-full px-4 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm"
                    >
                      📄 Uso interno (com nota)
                    </button>
                    <button
                      onClick={() => exportarPDF(rel, index, false)}
                      className="block w-full px-4 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm"
                    >
                      👤 Para utente (sem nota)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
