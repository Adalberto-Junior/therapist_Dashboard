// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import api from "../../../api";


// export default function ExerciseForm () {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "Articulação",
//     objective: "",
//     description: "",
//     duration: "",
//     repetitions: "",
//     difficulty: "Iniciante",
//     feedback: "",
//     notes: "",
//     steps: [{ instruction: "", media: [] }],
//   });

//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [audios, setAudios] = useState([]);

//   // Atualiza campos básicos
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Atualiza passos
//   const handleStepChange = (index, field, value) => {
//     const newSteps = [...formData.steps];
//     newSteps[index][field] = value;
//     setFormData({ ...formData, steps: newSteps });
//   };

//   // Adiciona novo passo
//   const addStep = () => {
//     setFormData({
//       ...formData,
//       steps: [...formData.steps, { instruction: "", media: [] }],
//     });
//   };

//   // Upload de ficheiros
//   const handleFileChange = (e, type) => {
//     const files = Array.from(e.target.files).map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     if (type === "images") setImages([...images, ...files]);
//     if (type === "videos") setVideos([...videos, ...files]);
//     if (type === "audios") setAudios([...audios, ...files]);
//   };

//   // Remover ficheiro
//   const removeFile = (type, index) => {
//     if (type === "images") {
//       setImages(images.filter((_, i) => i !== index));
//     } else if (type === "videos") {
//       setVideos(videos.filter((_, i) => i !== index));
//     } else if (type === "audios") {
//       setAudios(audios.filter((_, i) => i !== index));
//     }
//   };

//   // Submissão
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key === "steps") {
//         data.append("steps", JSON.stringify(formData.steps));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     images.forEach(({ file }) => data.append("images", file));
//     videos.forEach(({ file }) => data.append("videos", file));
//     audios.forEach(({ file }) => data.append("audios", file));

//     try {
//       const res = await fetch("http://localhost:5000/api/exercises", {
//         method: "POST",
//         body: data,
//       });

//       if (res.ok) {
//         alert("Exercício salvo com sucesso!");
//         setFormData({
//           title: "",
//           category: "Articulação",
//           objective: "",
//           description: "",
//           duration: "",
//           repetitions: "",
//           difficulty: "Iniciante",
//           feedback: "",
//           notes: "",
//           steps: [{ instruction: "", media: [] }],
//         });
//         setImages([]);
//         setVideos([]);
//         setAudios([]);
//       } else {
//         alert("Erro ao salvar exercício");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Erro na conexão com o servidor");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
//       <h2 className="text-2xl font-bold mb-4">Adicionar Exercício</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Título */}
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Título do exercício"
//           className="w-full border rounded-lg p-2"
//           required
//         />

//         {/* Categoria */}
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-2"
//         >
//           <option>Articulação</option>
//           <option>Fonação</option>
//           <option>Prosódia</option>
//           <option>Orofaciais</option>
//           <option>Linguagem e Cognição</option>
//           <option>Fluência</option>
//           <option>Reaprendizagem</option>
//         </select>

//         {/* Objetivo */}
//         <textarea
//           name="objective"
//           value={formData.objective}
//           onChange={handleChange}
//           placeholder="Objetivo terapêutico"
//           className="w-full border rounded-lg p-2"
//         />

//         {/* Descrição */}
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Descrição / instruções"
//           className="w-full border rounded-lg p-2"
//         />

//         {/* Uploads + Pré-visualização */}
//         <div>
//           <label className="block font-semibold">Imagens</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={(e) => handleFileChange(e, "images")}
//           />
//           <div className="flex flex-wrap gap-2 mt-2">
//             {images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={img.preview}
//                   alt="preview"
//                   className="w-24 h-24 object-cover rounded-lg border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeFile("images", index)}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block font-semibold">Vídeos</label>
//           <input
//             type="file"
//             accept="video/*"
//             multiple
//             onChange={(e) => handleFileChange(e, "videos")}
//           />
//           <div className="flex flex-wrap gap-2 mt-2">
//             {videos.map((vid, index) => (
//               <div key={index} className="relative">
//                 <video
//                   src={vid.preview}
//                   controls
//                   className="w-40 h-28 rounded-lg border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeFile("videos", index)}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block font-semibold">Áudios</label>
//           <input
//             type="file"
//             accept="audio/*"
//             multiple
//             onChange={(e) => handleFileChange(e, "audios")}
//           />
//           <div className="flex flex-col gap-2 mt-2">
//             {audios.map((aud, index) => (
//               <div key={index} className="flex items-center gap-2 relative">
//                 <audio controls src={aud.preview} className="w-64" />
//                 <button
//                   type="button"
//                   onClick={() => removeFile("audios", index)}
//                   className="bg-red-500 text-white rounded-full w-6 h-6"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Passos */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Passos</h3>
//           {formData.steps.map((step, index) => (
//             <div key={index} className="mb-2 border p-2 rounded-lg">
//               <input
//                 type="text"
//                 placeholder={`Instrução do passo ${index + 1}`}
//                 value={step.instruction}
//                 onChange={(e) =>
//                   handleStepChange(index, "instruction", e.target.value)
//                 }
//                 className="w-full border rounded-lg p-2 mb-2"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addStep}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             + Adicionar Passo
//           </button>
//         </div>

//         {/* Outros campos */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             placeholder="Duração (min)"
//             className="w-full border rounded-lg p-2"
//           />
//           <input
//             type="number"
//             name="repetitions"
//             value={formData.repetitions}
//             onChange={handleChange}
//             placeholder="Repetições"
//             className="w-full border rounded-lg p-2"
//           />
//         </div>

//         <select
//           name="difficulty"
//           value={formData.difficulty}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-2"
//         >
//           <option>Iniciante</option>
//           <option>Intermédio</option>
//           <option>Avançado</option>
//         </select>

//         <textarea
//           name="feedback"
//           value={formData.feedback}
//           onChange={handleChange}
//           placeholder="Feedback esperado"
//           className="w-full border rounded-lg p-2"
//         />

//         <textarea
//           name="notes"
//           value={formData.notes}
//           onChange={handleChange}
//           placeholder="Notas do terapeuta"
//           className="w-full border rounded-lg p-2"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold"
//         >
//           Salvar Exercício
//         </button>
//       </form>
//     </div>
//   );
// };


// "use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { X, Plus } from "lucide-react";
import api from "../../../api";
import { useParams } from "react-router-dom";

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  category: z.string(),
  objective: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  repetitions: z.string().optional(),
  difficulty: z.string(),
  feedback: z.string().optional(),
  notes: z.string().optional(),
  steps: z.array(
    z.object({
      instruction: z.string().min(1, "Instrução obrigatória"),
    })
  ),
});

export default function ExerciseForm() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      category: "Articulação",
      objective: "",
      description: "",
      duration: "",
      repetitions: "",
      difficulty: "Iniciante",
      feedback: "",
      notes: "",
      steps: [{ instruction: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "steps",
  });

  // Upload de ficheiros
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (type === "images") setImages((prev) => [...prev, ...files]);
    if (type === "videos") setVideos((prev) => [...prev, ...files]);
    if (type === "audios") setAudios((prev) => [...prev, ...files]);
  };

  const removeFile = (type, index) => {
    if (type === "images") setImages(images.filter((_, i) => i !== index));
    if (type === "videos") setVideos(videos.filter((_, i) => i !== index));
    if (type === "audios") setAudios(audios.filter((_, i) => i !== index));
  };

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   console.log("Dados do formulário:", data);


  //   Object.keys(data).forEach((key) => {
  //     if (key === "steps") {
  //       formData.append("steps", JSON.stringify(data.steps));
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   });

  //   images.forEach(({ file }) => formData.append("images", file));
  //   videos.forEach(({ file }) => formData.append("videos", file));
  //   audios.forEach(({ file }) => formData.append("audios", file));

  //   console.log("FormData preparado para envio:", formData);

  //   try {
  //     const response = await api.post(`/utente/rehabilitation/${id}/exercises/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.ok) {
  //       alert("Exercício salvo com sucesso!");
  //       reset();
  //       setImages([]);
  //       setVideos([]);
  //       setAudios([]);
  //     } else {
  //       alert("Erro ao salvar exercício");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Erro na conexão com o servidor");
  //   }
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log("Dados do formulário:", data);

    Object.keys(data).forEach((key) => {
      if (key === "steps") {
        formData.append("steps", JSON.stringify(data.steps));
      } else {
        formData.append(key, data[key]);
      }
    });

    images.forEach(({ file }) => formData.append("images", file));
    videos.forEach(({ file }) => formData.append("videos", file));
    audios.forEach(({ file }) => formData.append("audios", file));

    console.log("FormData preparado para envio:", [...formData.entries()]); // para ver conteúdo

    try {
      const response = await api.post(
        `/utente/rehabilitation/${id}/exercises/`,
        formData
        // 👇 NÃO definir manualmente Content-Type!
      );

      if (response.status === 200 || response.status === 201) {
        alert("Exercício salvo com sucesso!");
        reset();
        setImages([]);
        setVideos([]);
        setAudios([]);
      } else {
        alert("Erro ao salvar exercício");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
      <Card className="max-w-3xl mx-auto shadow-lg m-y-8 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Adicionar Exercício</CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Input
            placeholder="Título do exercício"
            {...register("title")}
            className="w-full mb-4"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <Select {...register("category")}
            className="mb-2"
          >
            <SelectTrigger>Categoria</SelectTrigger>
            <SelectContent>
              <SelectItem value="Articulação">Articulação</SelectItem>
              <SelectItem value="Fonação">Fonação</SelectItem>
              <SelectItem value="Prosódia">Prosódia</SelectItem>
              <SelectItem value="Orofaciais">Orofaciais</SelectItem>
              <SelectItem value="Linguagem e Cognição">Linguagem e Cognição</SelectItem>
              <SelectItem value="Fluência">Fluência</SelectItem>
              <SelectItem value="Reaprendizagem">Reaprendizagem</SelectItem>
            </SelectContent>
            
          </Select>

          <div className="flex gap-4"></div>

          <Textarea placeholder="Objetivo terapêutico" {...register("objective")} className="w-full mb-3" />
          <Textarea placeholder="Descrição / instruções" {...register("description")} className="w-full mb-3" />

          {/* Uploads */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Imagens</label>
              <Input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, "images")} />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img.preview} alt="preview" className="w-24 h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removeFile("images", i)}
                      className="absolute top-26 right bg-red-500 text-white rounded w-0 h-6 flex items-center justify-center"
                    >
                      Apagar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
          <label className="block font-semibold">Vídeos</label>
           <Input
             type="file"
             accept="video/*"
             multiple
             onChange={(e) => handleFileChange(e, "videos")}
           />
           <div className="flex flex-wrap gap-2 mt-2">
             {videos.map((vid, index) => (
               <div key={index} className="relative">
                 <video
                   src={vid.preview}
                   controls
                 className="w-40 h-28 rounded-lg border"
                />
                 <button
                   type="button"
                   onClick={() => removeFile("videos", index)}
                   className="absolute top right bg-red-500 text-white rounded-full w-6 h-6"
                 >
                   cancelar
                 </button>
               </div>
             ))}
           </div>
         </div>

        <div>
          <label className="block font-semibold">Áudios</label>
          <Input
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => handleFileChange(e, "audios")}
          />
          <div className="flex flex-col gap-2 mt-2">
            {audios.map((aud, index) => (
              <div key={index} className="flex items-center gap-2 relative">
                <audio controls src={aud.preview} className="w-64" />
                <button
                  type="button"
                  onClick={() => removeFile("audios", index)}
                  className="bg-red-500 text-white rounded w-2 h-9"
                >
                  cancelar
                </button>
              </div>
            ))}
          </div>
        </div>

          {/* Passos */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Passos</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-2 border p-2 rounded-lg">
                <Input
                  placeholder={`Instrução do passo ${index + 1}`}
                  {...register(`steps.${index}.instruction`)}
                />
                {errors.steps?.[index]?.instruction && (
                  <p className="text-red-500 text-sm">{errors.steps[index].instruction.message}</p>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => append({ instruction: "" })} variant="outline" className="mt-2 rounded">
              <Plus className="w-4 h-4 mr-1" /> Adicionar Passo
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Duração (min)" {...register("duration")} />
            <Input type="number" placeholder="Repetições" {...register("repetitions")} />
          </div>

          <Select {...register("difficulty")}>
            <SelectTrigger>Dificuldade</SelectTrigger>
            <SelectContent>
              <SelectItem value="Iniciante">Iniciante</SelectItem>
              <SelectItem value="Intermédio">Intermédio</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-4"></div>
          <span
            className="text-gray-400 cursor-pointer"
            title="O que o terapeuta espera como resultado do utente. Ex: 'Pronunciar a palavra sem omissões', 'Sustentar a vogal por 5s'."
          >
            ℹ️
          </span>
          <Textarea placeholder="Feedback esperado"  {...register("feedback")} className="w-full mb-3" />
          <Textarea placeholder="Notas do terapeuta" {...register("notes")} className="w-full mb-3" />

          <Button type="submit" className="w-full rounded " disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Exercício"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
