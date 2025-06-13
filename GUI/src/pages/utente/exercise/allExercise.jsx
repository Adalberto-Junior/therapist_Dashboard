import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../../../../../frontend/src/api";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FloatingForm from './floatingExerciseForm'; // Importando o componente de formulário flutuante
// import '../../App.css'; // Importando o CSS tradicional


export default function AllExercise() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Obter o ID do URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/utente/${id}/exercicio/`);
                setExercises(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    // const fetchexercise = async () => {
    //     try {
    //         const response = await api.get(`/exercises/${id}`); // Adjust the endpoint as needed
    //         setexercise(response.data);
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // fetchexercise();
    // }, [id]); // Dependência do ID para refazer a chamada quando o ID mudar
    // const handleDelete = async (id) => {
    //     try {
    //         await api.delete(`/exercises/${id}`); // Adjust the endpoint as needed
    //         setexercises(exercises.filter((exercise) => exercise.id !== id)); // Remove the deleted exercise from the state
    //     } catch (error) {
    //         console.error("Error deleting exercise:", error);
    //     }
    // };
    const handleEdit = (id) => {
        navigate(`/exercicio/editar/${id}`); // Redirect to the edit page with the exercise ID
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/exercises/${id}`); // Adjust the endpoint as needed
            setexercises(exercises.filter((exercise) => exercise.id !== id)); // Remove the deleted exercise from the state
        } catch (error) {
            console.error("Error deleting exercise:", error);
        }
    };

    const handleOpen = async (id_) => {
        navigate(`/utente/${id}/exercicio/${id_}`);
        // try {
        //     await api.delete(`/exercises/${id}`); // Adjust the endpoint as needed
        //     setexercises(exercises.filter((exercise) => exercise.id !== id)); // Remove the deleted exercise from the state
        // } catch (error) {
        //     console.error("Error deleting exercise:", error);
        // }
    };

    if (loading) {
        return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Loading...</p>
        </div>
        );
    };

    if (error) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <p className="text-2xl font-semibold text-center text-black dark:text-white mb-6">Error: {error.message}</p>
            </div>
         ) 
    };

    if (exercises.length === 0) {
        return ( 
            <div className="flex flex-col items-center mt-10">
                <p>Nenhum dado disponível</p>
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
            >
                    Adicionar Exercícios
            </button>
            {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
          </div>
        );
    }
        
    if (exercises.length > 0) {
        return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                                <div className=" container w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                                {/* <div className="container mx-auto max-w-4xl mt-10 p-5 bg-gray-100"> */}
                                    <h2 className="text-2xl font-bold text-center mb-5">Lista dos Exercícios</h2>
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="py-2 px-4 border-b">ID</th>
                                                <th className="py-2 px-4 border-b">Tipo</th>
                                                <th className="py-2 px-4 border-b">Nome</th>
                                                <th className="py-2 px-4 border-b">Descrição</th>
                                                <th className="py-2 px-4 border-b">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exercises.map((exercise) => (
                                                <tr key={exercise._id.$oid || exercise._id}>
                                                    <td className="py-2 px-4 border-b">{exercise._id.$oid || exercise._id.toString()}</td>
                                                    <td className="py-2 px-4 border-b">{exercise.type}</td>
                                                    <td className="py-2 px-4 border-b">{exercise.name}</td>
                                                    <td className="py-2 px-4 border-b">{exercise.description}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        <button onClick={() => handleOpen(exercise._id.$oid || exercise._id.toString())}
                                                          className="bg-blue-400 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
                                                            Abrir
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody> 
                                    </table>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-green-400 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded mr-2 mt-4"
                                        style={{ width: '200px', height: '50px', fontSize: '16px', margin:'15px' }}
                                    >
                                         Adicionar Exercícios
                                    </button>
                                    {showForm && <FloatingForm onClose={() => setShowForm(false)} />}
                                </div>
                            </div>
        );
    }
}