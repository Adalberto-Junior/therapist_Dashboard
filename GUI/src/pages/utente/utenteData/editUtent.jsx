// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../../api";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

// export default function EditUtente() {
//   const { id } = useParams(); // Pega o ID da URL
//   const navigate = useNavigate();
//   const [utente, setUtente] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchUtente() {
//       try {
//         const res = await api.get(`/utente/informacao/${id}`);
//         console.log(res.data);
//         setUtente(res.data);
//       } catch (err) {
//         setError("Erro ao carregar os dados do utente.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUtente();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUtente((prev) => ({ ...prev, [name]: value }));
    
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/utente/informacao/${id}`, utente);
//       alert("Utente atualizado com sucesso!");
//       navigate(`/utente/${id}/informacao`); // Redireciona para a lista ou perfil
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao atualizar o utente.");
//     }
//   };

//   if (loading){
//         return(
//          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//             <p className="text-2xl font-semibold text-center dark:text-white mb-6">Loading...</p>
//         </div>
//         );
//     }
//     if (error) {
//          return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//                 <p className="text-2xl font-semibold text-center dark:text-white mb-6">Error: {error.message}</p>
//             </div>
//          ) 
//     }
    

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
//     <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Editar Utente</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Nome:</label>
//           <input
//             type="text"
//             name="name"
//             value={utente.name || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={utente.email || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         {/* Adiciona mais campos conforme necessário, como profissão, data de nascimento etc. */}
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Número de Utente:</label>
//           <input
//             type="number"
//             name="health_user_number"
//             value={utente.health_user_number || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Morada:</label>
//           <input
//             type="text"
//             name="address"
//             value={utente.address || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Condição de Saúde:</label>
//           <input
//             type="text"
//             name="medical_condition"
//             value={utente.medical_condition || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Telemóvel:</label>
//           <PhoneInput
//             defaultCountry="PT"
//             international
//             name="cellphone"
//             value={utente.cellphone || ""}
//             onChange={(value) => setUtente((prev) => ({ ...prev, cellphone: value }))}
//             className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Observação:</label>
//           <textarea
//             name="observation"
//             value={utente.observation || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//             rows="3"
//           ></textarea>
//         </div>


//         <div>
//           <label className="block text-sm font-medium  text-black dark:text-white">Data de Nascimento:</label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={utente.date_of_birth?.slice(0, 10) || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
//           />
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             type="submit"
//             className="bg-green-500 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             Salvar Alterações
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate(`/utente/${id}/informacao`)}
//             className="bg-amber-500 dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded ml-2"
//           >
//             Cancelar
//           </button>
//         </div>
        
       
//       </form>
//     </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, X } from "lucide-react";
import api from "../../../api";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function EditUtente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      health_user_number: "",
      address: "",
      medical_condition: "",
      cellphone: "",
      observation: "",
      date_of_birth: "",
    }
  });

  useEffect(() => {
    async function fetchUtente() {
      try {
        const res = await api.get(`/utente/informacao/${id}`);
        const data = res.data;
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined) setValue(key, data[key]);
        });
      } catch (err) {
        setError("Erro ao carregar os dados do utente.");
      } finally {
        setLoading(false);
      }
    }

    fetchUtente();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/utente/informacao/${id}`, data);
      alert("Utente atualizado com sucesso!");
      navigate(`/utente/${id}/informacao`);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o utente.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-lg font-semibold text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Editar Utente
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
            <input
              type="text"
              {...register("name", { required: "O nome é obrigatório" })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
              })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Utente</label>
            <input
              type="number"
              {...register("health_user_number")}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Morada</label>
            <input
              type="text"
              {...register("address")}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Condição de Saúde</label>
            <input
              type="text"
              {...register("medical_condition")}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telemóvel</label>
            <PhoneInput
              defaultCountry="PT"
              international
              value={watch("cellphone")}
              onChange={(value) => setValue("cellphone", value)}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Observação</label>
            <textarea
              rows={3}
              {...register("observation")}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data de Nascimento</label>
            <input
              type="date"
              {...register("date_of_birth")}
              className="w-full border rounded-lg p-2 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div className="flex justify-between pt-4 border-t dark:border-zinc-700">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
            >
              <Save className="w-4 h-4" /> Salvar Alterações
            </button>

            <button
              type="button"
              onClick={() => navigate(`/utente/${id}/informacao`)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded shadow-md transition"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>

            
          </div>
        </form>
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../../api";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import { Loader2, Save, X } from "lucide-react";

// export default function EditUtente() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [utente, setUtente] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchUtente() {
//       try {
//         const res = await api.get(`/utente/informacao/${id}`);
//         setUtente(res.data);
//       } catch (err) {
//         setError("Erro ao carregar os dados do utente.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUtente();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUtente((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/utente/informacao/${id}`, utente);
//       alert("Utente atualizado com sucesso!");
//       navigate(`/utente/${id}/informacao`);
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao atualizar o utente.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
//         <p className="text-xl font-semibold text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 py-6">
//       <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
//           Editar Utente
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { label: "Nome", name: "name", type: "text" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Número de Utente", name: "health_user_number", type: "number" },
//             { label: "Morada", name: "address", type: "text" },
//             { label: "Condição de Saúde", name: "medical_condition", type: "text" },
//           ].map(({ label, name, type }) => (
//             <div key={name}>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 {label}:
//               </label>
//               <input
//                 type={type}
//                 name={name}
//                 value={utente[name] || ""}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
//               />
//             </div>
//           ))}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telemóvel:</label>
//             <PhoneInput
//               defaultCountry="PT"
//               international
//               name="cellphone"
//               value={utente.cellphone || ""}
//               onChange={(value) => setUtente((prev) => ({ ...prev, cellphone: value }))}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observação:</label>
//             <textarea
//               name="observation"
//               value={utente.observation || ""}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
//               rows="3"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data de Nascimento:</label>
//             <input
//               type="date"
//               name="date_of_birth"
//               value={utente.date_of_birth?.slice(0, 10) || ""}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
//             />
//           </div>

//           <div className="flex justify-between gap-4 mt-6">
//             <button
//               type="submit"
//               className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
//             >
//               <Save className="w-4 h-4" /> Salvar Alterações
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate(`/utente/${id}/informacao`)}
//               className="flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
//             >
//               <X className="w-4 h-4" /> Cancelar
//             </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
