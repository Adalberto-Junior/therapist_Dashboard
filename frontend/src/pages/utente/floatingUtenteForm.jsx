
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../../api";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import '../../App.css'; // Importando o CSS tradicional
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function FloatingForm ({ onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [utentes, setUtentes] = useState([]); // State to hold the list of utentes

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/utente/", data); // Adjust the endpoint as needed
            // setUtentes([...utentes, response.data]); // Add the new utente to the state
            alert("Utente added successfully:", response.data);  //TODO: delete this line
            // navigate("/utente/"); // Redirect to the all utente page after adding
            // window.location.reload(); // Reload the page to see the new utente in the list
        }
        catch (error) {
            console.error("Error adding utente:", error);
            alert("Erro ao adicionar utente. Por favor tenta novamente.");
        }
    }

    return (
      <div className="fixed p-1.5 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4 text-black">Adicionar Novo Utente</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div>
                    <label htmlFor="name" className="text-xl font-bold text-gray-900">Nome</label>
                    <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome"
                        {...register("name", { required: "Nome é obrigatório." })}
                    />
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
        
                <div>
                    <label htmlFor="email" className="text-xl font-bold text-gray-900">Email</label>
                    <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                        required: "Email é obrigatório.",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um email válido." }
                        })}
                    />
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="health_user_number" className="text-xl font-bold text-gray-900">Número de Utente</label>
                    <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="number"
                        id="health_user_number"
                        name="health_user_number"
                        placeholder="health user number"
                        {...register("health_user_number", {
                        required: "Número de utente é obrigatório.",
                        minLength: {
                            value: 9,
                            message: "O número do Utente deve ter pelo menos 9 números."
                          },
                        })}
                    />
                    <ErrorMessage errors={errors} name="health_user_number" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="health_user_cellphone" className="text-xl font-bold text-gray-900">Número de Telemovel</label>
                    <PhoneInput
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        id="health_user_cellphone"
                        name="health_user_cellphone"
                        placeholder="health user cellphone"
                        {...register("health_user_cellphone", {
                        required: "Número de telemovel é obrigatório.",
                        minLength: {
                            value: 9,
                            message: "O número do telemovel deve ter pelo menos 9 números."
                          },
                        })}
                        defaultCountry="PT"
                        international
                    />
                    {/* <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="phone"
                        id="health_user_cellphone"
                        name="health_user_cellphone"
                        placeholder="health user cellphone"
                        {...register("health_user_cellphone", {
                        minLength: {
                            value: 9,
                            message: "O número do telemovel deve ter pelo menos 9 números."
                          },
                        })}
                    /> */}
                    <ErrorMessage errors={errors} name="health_user_cellphone" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="health_user_address" className="text-xl font-bold text-gray-900">Morada</label>
                    <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="text"
                        id="health_user_address"
                        name="health_user_address"
                        placeholder="health user address"
                        {...register("health_user_address", {
                        // required: "Morada é obrigatória.",
                        // minLength: {
                        //     value: 9,
                        //     message: "A morada deve ter pelo menos 9 caracteres."
                        //   },
                        })}
                    />
                    <ErrorMessage errors={errors} name="health_user_address" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="medical_condition" className="text-xl font-bold text-gray-900">Condição Medica</label>
                    <input
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        type="text"
                        id="medical_condition"
                        name="medical_condition"
                        placeholder= "medical condition"
                        {...register("medical_condition", {
                        // required: "Morada é obrigatória.",
                        // minLength: {
                        //     value: 9,
                        //     message: "A morada deve ter pelo menos 9 caracteres."
                        //   },
                        })}
                    />
                    <ErrorMessage errors={errors} name="medical_condition" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="date_birth" className="text-xl font-bold text-gray-900">Data de Nascimento</label>
                    <input
                        type="date"
                        id="date_birth"
                        name="date_birth"
                        {...register("date_birth", { required: "Data de nascimento é obrigatória." })}
                        className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        placeholder="Data de Nascimento"
                    />
                    <ErrorMessage errors={errors} name="date_birth" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <div>
                    <label htmlFor="observation" className="text-xl font-bold text-gray-900">Observação</label>
                    <textarea
                        className="w-full h-30 bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
                        id="observation"
                        name="observation"
                        placeholder="Observação"
                        {...register("observation")}
                    ></textarea>
                    <ErrorMessage errors={errors} name="observation" render={({ message }) => <span className="error-message">{message}</span>} />
                </div>
                <button type="submit" className=" mybutton w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Adicionar</button>
            </form>
          <button
            className=" w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={onClose}
            style={{ marginTop: '10px' }} // Add margin to separate from the form
        >
            Fechar
          </button>
        </div>
      </div>
    );
  };