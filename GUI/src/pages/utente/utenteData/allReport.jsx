import { useEffect, useState } from "react";
import api from "../../../api.jsx";
import { useNavigate, useParams } from 'react-router-dom';

export default function ReportList() {
    const [relatorios, setRelatorios] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/utente/relatorio/${id}`);
                    setRelatorios(response.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
    }, [id]);

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
        <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Relatórios Existentes</h2>
        {relatorios.length === 0 ? (
            <p>Nenhum relatório encontrado.</p>
        ) : (
            <ul className="space-y-4">
            {relatorios.map((rel) => (
                <li key={rel._id} className="border rounded p-4 shadow-sm bg-white dark:bg-zinc-800">
                <h3 className="text-lg font-bold">{rel.title}</h3>
                <p><strong>Tipo:</strong> {rel.type}</p>
                <p><strong>Data:</strong> {new Date(rel.analysis_date).toLocaleDateString()}</p>
                <p><strong>Observações:</strong> {rel.observations}</p>
                <p><strong>Recomendações:</strong> {rel.recommendations}</p>
                <p className="text-sm italic text-zinc-400"><strong>Nota Interna:</strong> {rel.internal_note}</p>

                <button
                    onClick={() => onEdit(rel)}
                    className="mt-2 text-blue-600 hover:underline"
                >
                    Editar
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
