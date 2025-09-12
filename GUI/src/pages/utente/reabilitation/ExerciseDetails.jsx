import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";

export default function ExerciseDetails() {
  const { id, exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("ID do utente:", id);
  console.log("ID do exercício:", exerciseId);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const res = await api.get(`/utente/rehabilitation/exercises/${exerciseId}`);
        setExercise(res.data);
      } catch (err) {
        setError(err);
        console.error("Erro ao buscar exercício:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExercise();
  }, [id, exerciseId]);

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja eliminar este exercício?")) {
      try {
        await api.delete(`/utente/rehabilitation/exercises/${exerciseId}`);
        navigate(-1); // Volta para a página anterior
      } catch (err) {
        console.error("Erro ao eliminar exercício:", err);
      }
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
          <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Erro ao carregar exercício: {error.message}</p>
        </div>
      );
    }
    if (!exercise) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
          <p className="text-2xl font-semibold text-center  dark:text-white mb-6">Exercício não encontrado</p>
        </div>
      );
    }

  return (
    <div className="p-6">
        {error && <p className="text-red-500 mb-4">Erro ao carregar exercício: {error.message}</p>}
      <h1 className="text-2xl font-bold">{exercise.title}</h1>
      <p><strong>Objetivo:</strong> {exercise.objective}</p>
      <p><strong>Descrição:</strong> {exercise.description}</p>
      <p><strong>Duração:</strong> {exercise.duration} min</p>
      <p><strong>Feedback:</strong> {exercise.feedback}</p>
      <p><strong>Notas do terapeuta:</strong> {exercise.notes}</p>

      <h2 className="text-xl font-semibold mt-4">Passos</h2>
      <ul className="list-disc pl-5">
        {exercise.steps?.map((step, idx) => (
          <li key={idx}>{step.instruction}</li>
        ))}
      </ul>


      {/* Mostra outros campos como dificuldade, passos, etc */}
      
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate(`/utente/${id}/reabilitacao/exercicio/editar/${exerciseId}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
