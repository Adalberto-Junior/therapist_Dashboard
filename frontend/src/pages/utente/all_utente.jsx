import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../../api";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FloatingForm from './floatingUtenteForm'; // Importando o componente de formulário flutuante
// import '../../App.css'; // Importando o CSS tradicional


export default function AllUtente() {
    const [utentes, setUtentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Obter o ID do URL
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        // Fetch data from the Flask API
        const fetchData = async () => {
            try {
                const response = await api.get('/utente/');
                setUtentes(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/utente/", data); // Adjust the endpoint as needed
            setUtentes([...utentes, response.data]); // Add the new utente to the state
            alert("Utente added successfully:", response.data);  //TODO: delete this line
            // navigate("/utente/"); // Redirect to the all utente page after adding
            // window.location.reload(); // Reload the page to see the new utente in the list
        }
        catch (error) {
            console.error("Error adding utente:", error);
            alert("Erro ao adicionar utente. Por favor tenta novamente.");
        }
    }

    // const fetchUtente = async () => {
    //     try {
    //         const response = await api.get(`/utentes/${id}`); // Adjust the endpoint as needed
    //         setUtente(response.data);
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // fetchUtente();
    // }, [id]); // Dependência do ID para refazer a chamada quando o ID mudar
    // const handleDelete = async (id) => {
    //     try {
    //         await api.delete(`/utentes/${id}`); // Adjust the endpoint as needed
    //         setUtentes(utentes.filter((utente) => utente.id !== id)); // Remove the deleted utente from the state
    //     } catch (error) {
    //         console.error("Error deleting utente:", error);
    //     }
    // };
    const handleEdit = (id) => {
        navigate(`/utente/edit/${id}`); // Redirect to the edit page with the utente ID
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/utentes/${id}`); // Adjust the endpoint as needed
            setUtentes(utentes.filter((utente) => utente.id !== id)); // Remove the deleted utente from the state
        } catch (error) {
            console.error("Error deleting utente:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (utentes.length === 0) {
        return ( 
            <div className="flex flex-col items-center mt-10">
                <p>Nenhum dado disponível</p>
            <button
              onClick={() => setShowForm(true)}
              className="mybutton"
              style={{ width: '200px', height: '50px', fontSize: '16px' }}
            >
              Adicionar Utente
            </button>
            {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
          </div>
            // <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100">
            //     <h2 className="text-2xl font-bold text-center mb-5">Lista de Utentes</h2>
            //     <p className="text-center">Nenhum utente encontrado.</p>
            //     <p className="text-center">Adicione um utente acima.</p>
            //     <table className="min-w-full bg-white border border-gray-300">
            //         <thead>
            //             <tr className="bg-gray-200">
            //                 <th className="py-2 px-4 border-b">ID</th>
            //                 <th className="py-2 px-4 border-b">Nome</th>
            //                 <th className="py-2 px-4 border-b">Email</th>
            //                 <th className="py-2 px-4 border-b">Ações</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {utentes.map((utente) => (
            //                 <tr key={utente.id}>
            //                     <td className="py-2 px-4 border-b">{utente.id}</td>
            //                     <td className="py-2 px-4 border-b">{utente.nome}</td>
            //                     <td className="py-2 px-4 border-b">{utente.email}</td>
            //                     <td className="py-2 px-4 border-b">
            //                         <button onClick={() => handleEdit(utente.id)} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</button>
            //                         <button onClick={() => handleDelete(utente.id)} className="bg-red-500 text-white py-1 px-3 rounded">Eliminar</button>
            //                     </td>
            //                 </tr>
            //             ))}
            //         </tbody>
            //     </table>
            // </div>
            // <p>No data available</p>
        );
    }
        
    if (utentes.length > 0) {
        return (
            add_utente_forme(),
            <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100">
                <h2 className="text-2xl font-bold text-center mb-5">Lista de Utentes</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Nome</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utentes.map((utente) => (
                            <tr key={utente.id}>
                                <td className="py-2 px-4 border-b">{utente.id}</td>
                                <td className="py-2 px-4 border-b">{utente.nome}</td>
                                <td className="py-2 px-4 border-b">{utente.email}</td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => handleEdit(utente.id)} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</button>
                                    <button onClick={() => handleDelete(utente.id)} className="bg-red-500 text-white py-1 px-3 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}