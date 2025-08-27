import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

// 🔹 Traduções de Processamentos
const processingLabels = {
  articulation: "Articulação",
  phonation: "Fonação",
  glotta: "Glota",
  prosody: "Prosódia",
  replearning: "Reaprendizagem",
};

// 🔹 Traduções de Campos de Steps
const stepLabels = {
  text: "Texto",
  title: "Título",
  description: "Instrução",
  word: "Palavra",
  sentence: "Frase",
  step: "Passo",
  question: "Pergunta",
  typeOfConsonant: "Tipo de Consoante",
  syllables: "Sílaba",
};

// 🔹 Funções utilitárias
const translateStepKey = (key) => stepLabels[key] || key.replace(/_/g, " ");

const formatValue = (key, value) => {
  if (key === "typeOfProcessing") {
    if (Array.isArray(value)) return value.map((v) => processingLabels[v] || v).join(", ");
    return processingLabels[value] || value;
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  if (key === "Id do Exercício" || key === "_id") {
    return value.$oid || value.toString();
  }
  return value?.toString() || "N/A";
};

export default function GenericExerciseDetail() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.get(`/utente/exercicio/${id}/`);
        setExercise(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  // 🔹 Editar
  const handleEdit = () => {
     navigate(`/exercicios/genericos/detail/editar/${id}`);
  };

  // 🔹 Eliminar
  const handleDelete = async () => {
    if (!window.confirm("Tem a certeza que deseja eliminar este exercício?")) return;
    try {
      await api.delete(`/utente/exercicio/${id}/`);
      navigate(-1); // Volta para a página anterior
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao eliminar exercício.");
    }
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
          Carregando exercício...
        </p>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-300">
          Erro: {error.message}
        </p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Nenhum exercício encontrado.</p>
      </div>
    );
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">

        <div className="absolute top-25 left-1">
            <button 
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 shadow-md"
                >
                ⬅️ Voltar
            </button>
      </div>
      <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
        
        {/* Título */}
        <div className="flex justify-center items-center mb-6">
            <span className="text-center text-4xl font-bold dark:text-white p-2">Detalhes do Exercício</span>
        </div>

        {/* 🔹 Info Principal */}
        <div className="grid grid-cols-2 gap-6 bg-white dark:bg-gray-500 p-5 rounded-lg shadow-md">
          {Object.entries(exercise).map(([key, value]) => {
            if (["user", "therapist", "steps"].includes(key)) return null;

            let label = key;
            if (key === "name") label = "Nome do Exercício";
            if (key === "description") label = "Descrição";
            if (key === "type") label = "Tipo do Exercício";
            if (key === "userName") return null;
            if (key === "_id") label = "Id do Exercício";
            if (key === "typeOfProcessing") label = "Tipo de Processamento";

            return (
              <div key={key} className="flex flex-col border-b pb-2">
                <span className="font-semibold text-gray-700 dark:text-black">{label}:</span>
                <span className="text-gray-600 dark:text-gray-700">
                  {formatValue(key, value)}
                </span>
              </div>
            );
          })}
        </div>

        {/* 🔹 Passos */}
        {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
          <div className="mt-8">
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Passos ({exercise.steps.length})
            </p>
            <Accordion alwaysOpen>
              {exercise.steps.map((step, index) => (
                <Accordion.Item eventKey={`step-${index}`} key={index}>
                  <Accordion.Header>📄 Passo {index + 1}</Accordion.Header>
                  <Accordion.Body>
                    {Object.entries(step).map(([k, v]) =>
                      v !== "" ? (
                        <div key={k} className="mb-2">
                          <span className="font-semibold">{translateStepKey(k)}:</span>{" "}
                          <span>{typeof v === "string" ? v : JSON.stringify(v)}</span>
                        </div>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )}

        {/* 🔹 Botões */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
