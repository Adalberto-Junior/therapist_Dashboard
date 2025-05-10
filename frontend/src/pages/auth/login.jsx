
import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../../api"; 
import { useNavigate } from "react-router-dom";
import '../../App.css'; // Importando o CSS tradicional

export default function LoginForm () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful:", response.data);
      navigate("/protected"); // Redireciona para a página protegida após o login
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
    // <div className='container' >
    <div className="flex flex-col justify-center gap-4 md:gap-8  w-99 h-150  mt-30 p-5 rounded-2xl bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-5">Login</h2>
      <form  onSubmit={handleSubmit(onSubmit) } className="flex flex-col">
        <div>
          {/* <label className='p-2' htmlFor="email">Email</label> */}
          <input
            className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
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
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="w-full bg-white text-black p-2 border border-gray-300 rounded-md mb-4"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />
        </div>
        <button type="submit" className=" border w-full bg-green-500 text-white p-2 rounded-2x1 mb-2 hover:bg-green-600">Entrar</button>
        <div className="mt-4 text-center">
          <p>Não tem uma conta? <a href="/register" className="text-blue-500">Registrar</a></p>
        </div>
      </form>
    </div>
  );
};
