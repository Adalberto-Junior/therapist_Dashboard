import { useEffect, useState } from "react";
import { useParams, useNavigate, data  } from "react-router-dom";
import api from "../../../api";
import 'react-phone-number-input/style.css';
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function EditReport() {
  const { id, id_ } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { control, formState: { errors } } = useForm();
  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [comentariosAnalises, setComentariosAnalises] = useState({});

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await api.get(`/utente/relatorio/${id_}/`);
        console.log(res.data);
        setReport(res.data);
        const reportData = res.data;
        setTiposSelecionados(reportData.type_of_analysis || []);

        const comentarios = {};
        reportData.analises?.forEach(({ tipo, resultado }) => {
          comentarios[tipo] = resultado;
        });
        setComentariosAnalises(comentarios);
      } catch (err) {
        setError("Erro ao carregar o Relatório.");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id_]);

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
    console.log(report);
    
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const analises = tiposSelecionados.map((tipo) => ({
        tipo,
        resultado: comentariosAnalises[tipo] || "",
      }));

      const updatedReport = {
        ...report,
        analises,
        type_of_analysis: tiposSelecionados,
        views: report.views || 0,
      };

      await api.put(`/utente/relatorio/${id_}`, updatedReport);
      alert("Relatório atualizado com sucesso!");
      navigate(`/utente/${id}/relatorio`); 
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar este relatório.");
    }
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
    

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
    <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Editar Relatório</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Título:</label>
          <input
            type="text"
            name="title"
            value={report.title || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Data de Análise:</label>
          <input
            type="date"
            name="analysis_date"
            value={report.analysis_date?.slice(0, 10) || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
            />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">
            Tipo de Análise
          </label>
          <MultiSelect
            value={tiposSelecionados}
            options={[
              { label: 'Articulação', value: 'articulacao' },
              { label: 'Fonação', value: 'fonacao' },
              { label: 'Prosódia', value: 'prosodia' },
              { label: 'Glota', value: 'glotis' },
            ]}
            onChange={(e) => {
              const novosTipos = e.value || [];
              setTiposSelecionados(novosTipos);

              // Garante que cada tipo tenha um comentário mesmo que vazio
              const novosComentarios = { ...comentariosAnalises };
              novosTipos.forEach((tipo) => {
                if (!novosComentarios[tipo]) {
                  novosComentarios[tipo] = '';
                }
              });
              setComentariosAnalises(novosComentarios);
            }}
            optionLabel="label"
            optionValue="value"
            placeholder="Selecione os tipos de análise"
            display="chip"
            className="w-full"
          />
        </div>

         <div>
            {/* {tiposSelecionados.length > 0 && (
              <div className="mt-2">
                {tiposSelecionados.map((tipo) => (
                  <div key={tipo} className="mt-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">
                      Comentário sobre {formatarTipo(tipo)}
                    </label>
                    <textarea
                      name={`comentario_${tipo}`}
                      value={comentariosAnalises[tipo] || ""}
                      placeholder={`Descreva a análise de ${formatarTipo(tipo)}`}
                      onChange={(e) => {
                        setComentariosAnalises((prev) => ({
                          ...prev,
                          [tipo]: e.target.value,
                        }));
                      }}
                      className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            )} */}
            {tiposSelecionados.map((tipo) => (
              <div key={tipo} className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">
                  Comentário sobre {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
                <textarea
                  className="w-full border rounded p-2 dark:bg-zinc-700 dark:text-white"
                  rows= "3"
                  value={comentariosAnalises[tipo] || ""}
                  placeholder={`Descreva a análise de ${formatarTipo(tipo)}`}
                  onChange={(e) =>
                    setComentariosAnalises({
                      ...comentariosAnalises,
                      [tipo]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Observações Principais</label>
            <textarea
                name="observations"
                value={report.observations || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
                rows="3"
            ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Recomendações ao Paciente</label>
            <textarea
                name="recommendations"
                value={report.recommendations || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
                rows="3"
            ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nota Interna</label>
            <textarea
                name="internal_note"
                value={report.internal_note || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
                rows="3"
            ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Status</label>
            <select
                name="status"
                value={report.status || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
            >
                <option value="">Selecione...</option>
                <option value="rascunho">Rascunho</option>
                <option value="finalizado">Finalizado</option>
            </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Visualizações</label>
            <input
                type="number"
                name="views"
                value={report.views || 0}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
                min="0"
                //disabled // Desabilitado para edição, pois é gerenciado automaticamente
            />
        </div>
       </div>

         <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Salvar Alterações
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-amber-500 dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </div>
        
       
      </form>
    </div>
    </div>
  );
}
