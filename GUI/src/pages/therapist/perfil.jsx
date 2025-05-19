import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState('');
  const [prioridade, setPrioridade] = useState('média');
  const [modoOrdenacao, setModoOrdenacao] = useState('data');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPerfil() {
      try {
        const res = await api.get('/auth/me');
        console.log(res.data)
        setPerfil(res.data.user);
      }catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchNotas() {
      try {
        const res = await api.get('/auth/notas');
        setNotas(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerfil();
    fetchNotas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const handleAdicionarNota = async () => {
    if (!novaNota.trim()) return;
    const nova = {
      texto: novaNota,
      prioridade,
      data: new Date().toISOString(),
    };
    const res = await api.post('/auth/notas', nova);
    // setNotas([res.data, ...notas]);
    window.location.reload();
    setNovaNota('');
  };

  const notasOrdenadas = [...notas].sort((a, b) => {
    if (modoOrdenacao === 'priority') {
      const ordem = { alta: 0, média: 1, baixa: 2 };
      return ordem[a.priority] - ordem[b.priority];
    }
    return new Date(b.date) - new Date(a.date);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-xl font-semibold text-black dark:text-white">A carregar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <p className="text-xl font-semibold text-red-600">Erro: {error.message}</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-black dark:text-white p-6">
      <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <div className=" container flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Perfil</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {perfil && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div><strong>Nome:</strong> {perfil.name}</div>
            <div><strong>Email:</strong> {perfil.email}</div>
            <div><strong>Especialidade:</strong> {perfil.profession}</div>
            <div><strong>Data de Nascimento:</strong> {perfil.date_of_birth}</div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Bloco de Notas</h2>
          <div className="flex items-center gap-2 mb-4">
            <textarea
              // className="w-full rounded p-2 dark:bg-zinc-700 dark:text-white"
              className="w-full p-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              rows="2"
              placeholder="Escreva uma nova nota..."
              value={novaNota}
              onChange={(e) => setNovaNota(e.target.value)}
            />
            <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} className="rounded px-2 py-1 dark:bg-zinc-700">
              <option value="alta">Alta</option>
              <option value="média">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            <button onClick={handleAdicionarNota} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Adicionar
            </button>
          </div>

          <div className="flex justify-end mb-2">
            <label className="mr-2">Ordenar por:</label>
            <select value={modoOrdenacao} onChange={(e) => setModoOrdenacao(e.target.value)} className="rounded px-2 py-1 dark:bg-zinc-700">
              <option value="date">Data</option>
              <option value="priority">Prioridade</option>
            </select>
          </div>

          <ul className="space-y-4">
            {notasOrdenadas.map((nota, index) => (
              <li key={index} className={`border-l-4 p-4 rounded shadow-md dark:bg-zinc-700 dark:text-white ${
                nota.priority === 'alta' ? 'border-red-500' : nota.priority === 'média' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold capitalize">Prioridade: {nota.priority}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300"> {nota.date ? new Date(nota.date).toLocaleString() : "Data desconhecida"}</span>
                </div>
                <p className="mt-2 whitespace-pre-line">{nota.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
