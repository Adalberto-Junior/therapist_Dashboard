import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function EditUtente() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [utente, setUtente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUtente() {
      try {
        const res = await api.get(`/utente/informacao/${id}`);
        console.log(res.data);
        setUtente(res.data);
      } catch (err) {
        setError("Erro ao carregar os dados do utente.");
      } finally {
        setLoading(false);
      }
    }

    fetchUtente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUtente((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/utente/informacao/${id}`, utente);
      alert("Utente atualizado com sucesso!");
      navigate(`/utente/${id}/informacao`); // Redireciona para a lista ou perfil
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o utente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 m-8 max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Editar Utente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Nome:</label>
          <input
            type="text"
            name="name"
            value={utente.name || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={utente.email || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>

        {/* Adiciona mais campos conforme necessário, como profissão, data de nascimento etc. */}
        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Número de Utente:</label>
          <input
            type="number"
            name="health_user_number"
            value={utente.health_user_number || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Morada:</label>
          <input
            type="text"
            name="address"
            value={utente.address || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Condição de Saúde:</label>
          <input
            type="text"
            name="medical_condition"
            value={utente.medical_condition || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Telemóvel:</label>
          <PhoneInput
            defaultCountry="PT"
            international
            name="cellphone"
            value={utente.cellphone || ""}
            onChange={(value) => setUtente((prev) => ({ ...prev, cellphone: value }))}
            className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Observação:</label>
          <textarea
            name="observation"
            value={utente.observation || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
            rows="3"
          ></textarea>
        </div>


        <div>
          <label className="block text-sm font-medium  text-black dark:text-white">Data de Nascimento:</label>
          <input
            type="date"
            name="date_of_birth"
            value={utente.date_of_birth?.slice(0, 10) || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:text-white"
          />
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
          onClick={() => navigate(`/utente/${id}/informacao`)}
          className="bg-amber-500 dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
