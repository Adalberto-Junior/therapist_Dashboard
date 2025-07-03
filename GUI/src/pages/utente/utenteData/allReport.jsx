import { useEffect, useState } from "react";
import api from "../../../api.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

export default function ReportList() {
    const [relatorios, setRelatorios] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/utente/${id}/relatorio/`);
                    setRelatorios(response.data);
                    console.log(response.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
    }, [id]);

    const onEdit = (rel) => {
        const id_ = rel._id.$oid || rel._id; // Garante que o ID é uma string
        navigate(`/utente/${id}/relatorio/edit/${id_}`); // Garante que o ID é uma string
    };

    const onDelete = async (relId) => {
        if (window.confirm("Tem certeza que deseja eliminar este relatório?")) {
            try {
                const relId_ = relId.$oid || relId; // Garante que relId é uma string
                await api.delete(`/utente/${relId_}/relatorio/`);
                setRelatorios(relatorios.filter(rel => rel._id !== relId));
                alert("Relatório eliminado com sucesso.");
                // window.location.reload(); // Recarrega a página para atualizar a lista
            } catch (error) {
                console.error("Erro ao eliminar relatório:", error);
                alert("Erro ao eliminar relatório. Por favor, tente novamente.");
            }
        }
    };

    const exportarPDF = (rel, index, incluirNotaInterna) => {
        const element = document.getElementById(`relatorio-${index}`);
        if (!element) {
            console.error(`Elemento relatorio-${index} não encontrado.`);
            return;
        }

        const notaEl = element.querySelector('.nota-interna');
        const originalDisplay = notaEl?.style?.display;

        if (!incluirNotaInterna && notaEl) notaEl.style.display = 'none';

        const opt = {
            margin: 0.5,
            filename: `${rel.title.replace(/\s+/g, '_')}_${rel.analysis_date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            if (notaEl) notaEl.style.display = originalDisplay || '';
        });
    };

    const tipoDeAnalise = {
      "articulacao": "Articulação",
      "fonacao": "Fonação",
      "glotis": "Glotal",
      "prosodia": "Prosódia",
      "glota": "Glota",
      "reaprendizagem": "Reaprendizagem",
    }

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



    if (loading){
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center dark:text-white mb-6">Loading...</p>
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
    
    // console.log(relatorios);  
    return (
  <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4 py-6 relative">
    {/* Botão de voltar fixo no topo esquerdo */}
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 shadow"
    >
      ← Voltar
    </button>

    {/* Título centralizado */}
    <div className="text-center mb-12">
      <p className="text-4xl font-bold  dark:text-white">Relatórios Médicos</p>
    </div>

    {/* Relatórios */}
    <div className="max-w-4xl mx-auto space-y-12">
      {relatorios.length === 0 ? (
        <p className="text-2xl font-semibold text-center dark:text-white py-40">
          Nenhum relatório encontrado.
        </p>
      ) : (
        relatorios.map((rel, index) => (
          <div
            key={rel._id}
            id={`relatorio-${index}`}
            className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-zinc-700"
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white flex items-center gap-2">
                🩺 {rel.title}
              </h2>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {new Date(rel.analysis_date).toLocaleDateString()}
              </span>
            </div>

            <hr className="border-gray-300 dark:border-zinc-700 my-4" />

            {/* Corpo do relatório */}
            <div className="text-gray-700 dark:text-gray-500 font-serif space-y-4 text-lg leading-relaxed">
              <p>
                <strong className="dark:text-gray-900">Tipo de Análise:</strong>{" "}
                {rel.type_of_analysis?.map((tipo, index) => (
                    <span
                    key={index}
                    className="inline-block bg-gray-200 dark:bg-zinc-600 text-gray-800 dark:text-white px-2 py-1 rounded-full mr-2 text-sm"
                    >
                    {tipoDeAnalise[tipo] || tipo}
                    </span>
                ))}
              </p>
              <p><strong className="dark:text-gray-900">Observações Clínicas:</strong><br /> {rel.observations}</p>
              <p>
                <strong className="dark:text-gray-900">Comentários da Análise:</strong>{" "}
                {rel.analysis?.map((comentario,index) =>(
                  <ul
                  key={index}
                  //  className="text-sm italic dark:text-zinc-500 nota-interna"
                  >
                    <li>
                      <strong className="dark:text-gray-700">{formatarTipo(comentario.tipo)}: </strong>{comentario.resultado}
                    </li>
                  </ul>
                ))}

              </p>
              <p><strong className="dark:text-gray-900">Recomendações Terapêuticas:</strong><br /> {rel.recommendations}</p>
              {rel.internal_note && (
                <p className="text-sm italic dark:text-zinc-500 nota-interna">
                  <strong>Nota Interna:</strong> {rel.internal_note}
                </p>
              )}
              <p><strong className="dark:text-gray-900">Status:</strong> {rel.status}</p>
              <p><strong className="dark:text-gray-900">Visualizações:</strong> {rel.views || 0}</p>
              <p><strong className="dark:text-gray-900">Criado em:</strong> {new Date(rel.created_at).toLocaleDateString()}</p>
              {/* <p><strong className="dark:text-gray-900">Utente ID:</strong> {rel.utente_id.$oid || rel.utente_id}</p> */}

              {/* Assinatura fictícia */}
            {/* <div className="mt-12 text-right">
              <p className="text-sm">__________________________________</p>
              <p className="text-sm">Terapeuta Responsável</p>
            </div> */}
            </div>

            {/* Ações */}
            <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-4">
                <button
                  onClick={() => onEdit(rel)}
                  className="text-blue-600 dark:text-blue-400 hover:underline rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-zinc-700"
                >
                  ✏️ Editar Relatório
                </button>
                <button
                  onClick={() => onDelete(rel._id)}
                  className="text-red-600 dark:text-red-400 hover:underline rounded px-4 py-2 hover:bg-red-100 dark:hover:bg-zinc-700"
                >
                  🗑️ Eliminar Relatório
                </button>
              </div>

              <div className="relative group">
                <button className="text-green-600 dark:text-green-400 hover:underline rounded px-4 py-2">
                  📄 Exportar PDF ▾
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-zinc-800 shadow-lg rounded z-10 mt-1 right-0 w-60 border border-gray-200 dark:border-zinc-700">
                  <button
                    onClick={() => exportarPDF(rel, index, true)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm"
                  >
                    🔒 Uso interno (com nota)
                  </button>
                  <button
                    onClick={() => exportarPDF(rel, index, false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm"
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
