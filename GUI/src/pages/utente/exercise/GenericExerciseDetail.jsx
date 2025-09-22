// import React, { useEffect, useState } from "react";
// import api from "../../../api";
// import { useNavigate, useParams } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import "bootstrap/dist/css/bootstrap.min.css";

// // 🔹 Traduções de Processamentos
// const processingLabels = {
//   articulation: "Articulação",
//   phonation: "Fonação",
//   glotta: "Glota",
//   prosody: "Prosódia",
//   replearning: "Reaprendizagem",
// };

// // 🔹 Traduções de Campos de Steps
// const stepLabels = {
//   text: "Texto",
//   title: "Título",
//   description: "Instrução",
//   word: "Palavra",
//   sentence: "Frase",
//   step: "Passo",
//   question: "Pergunta",
//   typeOfConsonant: "Tipo de Consoante",
//   syllables: "Sílaba",
// };

// // 🔹 Funções utilitárias
// const translateStepKey = (key) => stepLabels[key] || key.replace(/_/g, " ");

// const formatValue = (key, value) => {
//   if (key === "typeOfProcessing") {
//     if (Array.isArray(value)) return value.map((v) => processingLabels[v] || v).join(", ");
//     return processingLabels[value] || value;
//   }
//   if (typeof value === "object" && value !== null) {
//     return JSON.stringify(value, null, 2);
//   }
//   if (key === "Id do Exercício" || key === "_id") {
//     return value.$oid || value.toString();
//   }
//   return value?.toString() || "N/A";
// };

// export default function GenericExerciseDetail() {
//   const [exercise, setExercise] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const response = await api.get(`/utente/exercicio/${id}/`);
//         setExercise(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchExercise();
//   }, [id]);

//   // 🔹 Editar
//   const handleEdit = () => {
//      navigate(`/exercicios/genericos/detail/editar/${id}`);
//   };

//   // 🔹 Eliminar
//   const handleDelete = async () => {
//     if (!window.confirm("Tem a certeza que deseja eliminar este exercício?")) return;
//     try {
//       await api.delete(`/utente/exercicio/${id}/`);
//       navigate(-1); // Volta para a página anterior
//     } catch (err) {
//       console.error("Erro ao deletar:", err);
//       alert("Erro ao eliminar exercício.");
//     }
//   };

//   // 🔹 Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
//           Carregando exercício...
//         </p>
//       </div>
//     );
//   }

//   // 🔹 Error State
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
//         <p className="text-xl font-semibold text-red-600 dark:text-red-300">
//           Erro: {error.message}
//         </p>
//       </div>
//     );
//   }

//   if (!exercise) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-lg text-gray-600 dark:text-gray-300">Nenhum exercício encontrado.</p>
//       </div>
//     );
//   }

//   return (
//    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">

//         <div className="absolute top-25 left-1">
//             <button 
//                 onClick={() => navigate(-1)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 shadow-md"
//                 >
//                 ⬅️ Voltar
//             </button>
//       </div>
//       <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
        
//         {/* Título */}
//         <div className="flex justify-center items-center mb-6">
//             <span className="text-center text-4xl font-bold dark:text-white p-2">Detalhes do Exercício</span>
//         </div>

//         {/* 🔹 Info Principal */}
//         <div className="grid grid-cols-2 gap-6 bg-white dark:bg-gray-500 p-5 rounded-lg shadow-md">
//           {Object.entries(exercise).map(([key, value]) => {
//             if (["user", "therapist", "steps"].includes(key)) return null;

//             let label = key;
//             if (key === "name") label = "Nome do Exercício";
//             if (key === "description") label = "Descrição";
//             if (key === "type") label = "Tipo do Exercício";
//             if (key === "userName") return null;
//             if (key === "_id") label = "Id do Exercício";
//             if (key === "typeOfProcessing") label = "Tipo de Processamento";

//             return (
//               <div key={key} className="flex flex-col border-b pb-2">
//                 <span className="font-semibold text-gray-700 dark:text-black">{label}:</span>
//                 <span className="text-gray-600 dark:text-gray-700">
//                   {formatValue(key, value)}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* 🔹 Passos */}
//         {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
//           <div className="mt-8">
//             <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               Passos ({exercise.steps.length})
//             </p>
//             <Accordion alwaysOpen>
//               {exercise.steps.map((step, index) => (
//                 <Accordion.Item eventKey={`step-${index}`} key={index}>
//                   <Accordion.Header>📄 Passo {index + 1}</Accordion.Header>
//                   <Accordion.Body>
//                     {Object.entries(step).map(([k, v]) =>
//                       v !== "" ? (
//                         <div key={k} className="mb-2">
//                           <span className="font-semibold">{translateStepKey(k)}:</span>{" "}
//                           <span>{typeof v === "string" ? v : JSON.stringify(v)}</span>
//                         </div>
//                       ) : null
//                     )}
//                   </Accordion.Body>
//                 </Accordion.Item>
//               ))}
//             </Accordion>
//           </div>
//         )}

//         {/* 🔹 Botões */}
//         <div className="flex justify-center gap-6 mt-8">
//           <button
//             onClick={handleEdit}
//             className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
//           >
//             ✏️ Editar
//           </button>
//           <button
//             onClick={handleDelete}
//             className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
//           >
//             🗑️ Eliminar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import { Loader2, Edit, Trash2, ListChecks, FileText, ArrowLeft } from "lucide-react";

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

const translateStepKey = (key) => stepLabels[key] || key.replace(/_/g, " ");

const formatValue = (key, value) => {
  if (key === "typeOfProcessing") {
    if (Array.isArray(value)) return value.map((v) => processingLabels[v] || v).join(", ");
    return processingLabels[value] || value;
  }
  if (typeof value === "object" && value !== null) return JSON.stringify(value, null, 2);
  if (key === "Id do Exercício" || key === "_id") return value?.$oid || value?.toString();
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

  const handleEdit = () => {
    navigate(`/exercicios/genericos/detail/editar/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem a certeza que deseja eliminar este exercício?")) return;
    try {
      await api.delete(`/utente/exercicio/${id}/`);
      navigate(-1);
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao eliminar exercício.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold dark:text-white">
          Carregando exercício...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
        <p className="text-lg font-semibold text-red-600 dark:text-red-300">
          Erro: {error.message}
        </p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-lg dark:text-gray-300">
          Nenhum exercício encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto p-6 space-y-6 pb-32">
        {/* Botão de Voltar */}
        <div className="flex justify-start p-1.5">
          {/* <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2 rounded"
          >
            <ArrowLeft size={16} /> Voltar
          </Button> */}
        </div>

        {/* Card Principal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <FileText className="text-primary w-7 h-7" />
              Detalhes do Exercício
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(exercise).map(([key, value]) => {
              if (["user", "therapist", "steps", "userName", "_id"].includes(key)) return null;

              const labelMap = {
                name: "Nome do Exercício",
                description: "Descrição",
                type: "Tipo do Exercício",
                _id: "ID do Exercício",
                typeOfProcessing: "Tipo de Processamento",
              };

              return (
                <div
                  key={key}
                  className="flex flex-col p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow-sm"
                >
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {labelMap[key] || key.replace(/_/g, " ")}
                  </span>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {formatValue(key, value)}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Passos */}
        {Array.isArray(exercise.steps) && exercise.steps.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ListChecks className="text-primary w-5 h-5" />
              <CardTitle className="text-xl">
                Passos ({exercise.steps.length})
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {exercise.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    {Object.entries(step).map(([k, v]) =>
                      v !== "" ? (
                        <p key={k} className="text-sm text-gray-800 dark:text-gray-200">
                          <span className="font-medium">{translateStepKey(k)}:</span>{" "}
                          {typeof v === "string" ? v : JSON.stringify(v)}
                        </p>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-end">
          <Button
            onClick={handleEdit}
            variant="outline"
            className="flex items-center gap-2 rounded"
          >
            <Edit size={16} /> Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="flex items-center gap-2 rounded"
          >
            <Trash2 size={16} /> Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
