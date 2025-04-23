
import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../api"; 
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function LoginForm () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", data);
      localStorage.setItem("token", response.data.token);
      // navigate("/protected"); // Redireciona para a página protegida após o login
    } catch (error) {
      console.error("Login failed:", error);
        if (error.response && error.response.status === 401) {
            alert("Nome de utilizador ou senha inválidos. Tente novamente.");
        } else {
            alert("Erro ao fazer login. Tente novamente.");
        }
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
                required: "Email é obrigatório.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um email válido."
                }
            })}
          />
          <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />
        </div>
        <button type="submit">Login</button>
        <p>Não tem conta? <a href="/register">Registe-se</a></p>
      </form>
    </div>
  );
}
