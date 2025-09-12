import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";

export default function ExercisesList() {
  const { id } = useParams(); // id do utente
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await api.get(`/utente/rehabilitation/${id}/exercises/`);
        setExercises(response.data);
      }  catch (err) {
        setError(err);
        console.error("Erro ao buscar Exercícios:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExercises();
  }, [id]);


  const handleOpen = (exerciseId) => {
    console.log("Abrir exercício com ID:", exerciseId);
    navigate(`/utente/${id}/reabilitacao/exercicio/${exerciseId}`);
  }

  if (loading){
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Loading...</p>
        </div>
        );
    }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
    <div className="p-6">
      <p className="text-3xl font-bold mb-4 dark:text-white">Lista de Exercícios</p>
      <table className="min-w-full border border-gray-300 bg-white dark:bg-zinc-800 dark:border-zinc-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-700">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Título</th>
            <th className="border px-4 py-2">Objetivo</th>
            <th className="border px-4 py-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((ex) => (
            <tr key={ex._id}>
              <td className="border px-4 py-2">{ex._id}</td>
              <td className="border px-4 py-2">{ex.title}</td>
              <td className="border px-4 py-2">{ex.objective}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleOpen(ex._id)}
                >
                  Abrir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {error && <p className="text-red-500 mt-4 dark:text-red-400">Erro ao carregar exercícios: {error.message}</p>}
        <div className="mt-6">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/utente/${id}/reabilitacao/novo-exercicio`)}
            >
                Adicionar Novo Exercício
            </button>
        </div>
    </div>
    </div>
  );
}
