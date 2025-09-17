
// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import api from "../../../api";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// // import '../../App.css'; // Importando o CSS tradicional
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

// export default function FloatingForm ({ onClose }) {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     // const [utentes, setUtentes] = useState([]); // State to hold the list of utentes

//     const onSubmit = async (data) => {
//         try {
//             const response = await api.post("/utente/", data);
//             alert("Utente adicionado com sucesso");
//             window.location.reload(); // Reload the page to see the new utente in the list
//         }
//         catch (error) {
//             console.error("Error adding utente:", error);
//             alert("Erro ao adicionar utente. Por favor tenta novamente.");
//         }
//     }

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//       <div className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Adicionar Utente</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
//                 <div className="mb-4">
                   
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="name"
//                         name="name"
//                         placeholder="Nome"
//                         {...register("name", { required: "Nome é obrigatório." })}
//                     />
//                     <ErrorMessage errors={errors} name="name" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
        
//                 <div className="mb-4">
                    
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Email"
//                         {...register("email", {
//                         required: "Email é obrigatório.",
//                         pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um email válido." }
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="email" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
                    
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="number"
//                         id="health_user_number"
//                         name="health_user_number"
//                         placeholder="Número de Saúde do Utente"
//                         {...register("health_user_number", {
//                         required: "Número de utente é obrigatório.",
//                         minLength: {
//                             value: 9,
//                             message: "O número do Utente deve ter pelo menos 9 números."
//                           },
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="health_user_number" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
                    
//                     <PhoneInput
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         id="health_user_cellphone"
//                         name="health_user_cellphone"
//                         placeholder="Telemovel"
//                         {...register("health_user_cellphone"
//                         // {
//                         // required: "Número de telemovel é obrigatório.",
//                         // minLength: {
//                         //     value: 9,
//                         //     message: "O número do telemovel deve ter pelo menos 9 números."
//                         //   },
//                         // }
//                         )}
//                         defaultCountry="PT"
//                         international
//                     />
//                     {/* <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="phone"
//                         id="health_user_cellphone"
//                         name="health_user_cellphone"
//                         placeholder="health user cellphone"
//                         {...register("health_user_cellphone", {
//                         minLength: {
//                             value: 9,
//                             message: "O número do telemovel deve ter pelo menos 9 números."
//                           },
//                         })}
//                     /> */}
//                     <ErrorMessage errors={errors} name="health_user_cellphone" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
                
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="health_user_address"
//                         name="health_user_address"
//                         placeholder="Morada"
//                         {...register("health_user_address", {
//                         // required: "Morada é obrigatória.",
//                         // minLength: {
//                         //     value: 9,
//                         //     message: "A morada deve ter pelo menos 9 caracteres."
//                         //   },
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="health_user_address" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
                    
//                     <input
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         type="text"
//                         id="medical_condition"
//                         name="medical_condition"
//                         placeholder= "Condição de Saúde"
//                         {...register("medical_condition", {
//                         // required: "Morada é obrigatória.",
//                         // minLength: {
//                         //     value: 9,
//                         //     message: "A morada deve ter pelo menos 9 caracteres."
//                         //   },
//                         })}
//                     />
//                     <ErrorMessage errors={errors} name="medical_condition" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="date_birth">Data de Nascimento</label>
//                     <input
//                         type="date"
//                         id="date_birth"
//                         name="date_birth"
//                         {...register("date_birth", { required: "Data de nascimento é obrigatória." })}
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         placeholder="Data de Nascimento"
//                     />
//                     <ErrorMessage errors={errors} name="date_birth" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <div className="mb-4">
//                     <textarea
//                         className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//                         id="observation"
//                         name="observation"
//                         placeholder="Observação"
//                         {...register("observation")}
//                     ></textarea>
//                     <ErrorMessage errors={errors} name="observation" render={({ message }) => <span className="error-message">{message}</span>} />
//                 </div>
//                 <button type="submit" 
//                 className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
//                 >
//                     Adicionar
//                 </button>
//             </form>
//           <button
//             className="w-full bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-2 rounded mr-2 mt-4"
//             onClick={onClose}
//             style={{ width: '320px', height: '40px', fontSize: '16px', margin:'15px' }}
//         >
//             Fechar
//           </button>
//         </div>
//       </div>
//     );
//   };


import React from "react";
import api from "../../../api";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { UserPlus, XCircle } from "lucide-react";

export default function FloatingForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/utente/", data);
      alert("Utente adicionado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar utente:", error);
      alert("Erro ao adicionar utente. Por favor, tenta novamente.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg dark:bg-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center dark:text-white">
            Adicionar Utente
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                type="text"
                placeholder="Nome"
                {...register("name", { required: "Nome é obrigatório." })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <span className="text-red-500 text-sm">{message}</span>}
              />
            </div>

            {/* Email */}
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email é obrigatório.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <span className="text-red-500 text-sm">{message}</span>}
              />
            </div>

            {/* Nº Saúde */}
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                type="number"
                placeholder="Número de Saúde do Utente"
                {...register("health_user_number", {
                  required: "Número de utente é obrigatório.",
                  minLength: {
                    value: 9,
                    message: "O número do Utente deve ter pelo menos 9 números.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="health_user_number"
                render={({ message }) => <span className="text-red-500 text-sm">{message}</span>}
              />
            </div>

            {/* Telemóvel */}
            <div>
              <PhoneInput
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                placeholder="Telemóvel"
                defaultCountry="PT"
                international
                {...register("health_user_cellphone")}
              />
              <ErrorMessage
                errors={errors}
                name="health_user_cellphone"
                render={({ message }) => <span className="text-red-500 text-sm">{message}</span>}
              />
            </div>

            {/* Morada */}
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                type="text"
                placeholder="Morada"
                {...register("health_user_address")}
              />
            </div>

            {/* Condição de Saúde */}
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                type="text"
                placeholder="Condição de Saúde"
                {...register("medical_condition")}
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="date_birth" className="block text-sm font-medium mb-1 dark:text-white">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="date_birth"
                {...register("date_birth", { required: "Data de nascimento é obrigatória." })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
              <ErrorMessage
                errors={errors}
                name="date_birth"
                render={({ message }) => <span className="text-red-500 text-sm">{message}</span>}
              />
            </div>

            {/* Observação */}
            <div>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                placeholder="Observações"
                {...register("observation")}
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <UserPlus size={18} /> Adicionar Utente
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <XCircle size={18} /> Fechar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
