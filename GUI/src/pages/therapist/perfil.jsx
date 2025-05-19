import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function PerfilTerapeuta() {
  const [perfil, setPerfil] = useState(null);
  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState('');
  const [prioridade, setPrioridade] = useState('média');
  const [modoOrdenacao, setModoOrdenacao] = useState('data');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPerfil() {
      const res = await api.get('/me');
      setPerfil(res.data);
    }

    async function fetchNotas() {
      const res = await api.get('/notas');
      setNotas(res.data);
    }

    fetchPerfil();
    fetchNotas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAdicionarNota = async () => {
    if (!novaNota.trim()) return;
    const nova = {
      texto: novaNota,
      prioridade,
      data: new Date().toISOString(),
    };
    const res = await api.post('/notas', nova);
    setNotas([res.data, ...notas]);
    setNovaNota('');
  };

  const notasOrdenadas = [...notas].sort((a, b) => {
    if (modoOrdenacao === 'prioridade') {
      const ordem = { alta: 0, média: 1, baixa: 2 };
      return ordem[a.prioridade] - ordem[b.prioridade];
    }
    return new Date(b.data) - new Date(a.data);
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-black dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Perfil da Terapeuta</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {perfil && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div><strong>Nome:</strong> {perfil.nome}</div>
            <div><strong>Email:</strong> {perfil.email}</div>
            <div><strong>Telefone:</strong> {perfil.telefone}</div>
            <div><strong>Especialidade:</strong> {perfil.especialidade}</div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Bloco de Notas</h2>
          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="w-full rounded p-2 dark:bg-zinc-700"
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
              <option value="data">Data</option>
              <option value="prioridade">Prioridade</option>
            </select>
          </div>

          <ul className="space-y-4">
            {notasOrdenadas.map((nota, index) => (
              <li key={index} className={`border-l-4 p-4 rounded shadow-md dark:bg-zinc-700 ${
                nota.prioridade === 'alta' ? 'border-red-500' : nota.prioridade === 'média' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold capitalize">Prioridade: {nota.prioridade}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{format(new Date(nota.data), 'dd/MM/yyyy HH:mm')}</span>
                </div>
                <p className="mt-2 whitespace-pre-line">{nota.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
