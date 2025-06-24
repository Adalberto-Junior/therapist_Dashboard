import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
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

  useEffect(() => {
    async function fetchUtente() {
      try {
        const res = await api.get(`/utente/relatorio/${id_}/`);
        console.log(res.data);
        setReport(res.data);
      } catch (err) {
        setError("Erro ao carregar o Relatório.");
      } finally {
        setLoading(false);
      }
    }

    fetchUtente();
  }, [id_]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/utente/relatorio/${id_}`, report);
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
    <div className="p-6 m-8 max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Editar Relatório</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {/* <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Tipo de Análise:</label>
          <input
            type="text"
            name="type_of_analysis"
            value={report.type_of_analysis || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
            />
        </div>

        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Análise</label>
            <select {...register('type_of_analysis', { required: true })} 
                className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            >
                <option value="">Selecione...</option>
                <option value="articulacao">Articulação</option>
                <option value="fonacao">Fonação</option>
                <option value="prosodia">Prosódia</option>
                <option value="glotis">Glota</option>
             </select>
            <ErrorMessage errors={error} name="type_of_analysis" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
        </div> */}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Análise</label>
            {/* <select
                name="type_of_analysis"
                value={report.type_of_analysis || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
            >
                <option value="">Selecione...</option>
                <option value="articulacao">Articulação</option>
                <option value="fonacao">Fonação</option>
                <option value="prosodia">Prosódia</option>
                <option value="glotis">Glota</option>
            </select> */}
            <MultiSelect
                value={report.type_of_analysis || []}
                options={[
                    { label: 'Articulação', value: 'articulacao' },
                    { label: 'Fonação', value: 'fonacao' },
                    { label: 'Prosódia', value: 'prosodia' },
                    { label: 'Glota', value: 'glotis' }
                ]}
                onChange={(e) => setReport((prev) => ({ ...prev, type_of_analysis: e.value }))}
                className="w-full"
                placeholder="Selecione os tipos de análise"
            />
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

        <div className="flex items-center">
          <button
          type="submit"
          className="bg-green-500 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Salvar Alterações
        </button>
        </div>
        
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-amber-500 dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
