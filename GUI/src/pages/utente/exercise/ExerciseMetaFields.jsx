import React from 'react';
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { MultiSelect } from 'primereact/multiselect';

export function ExerciseMetaFields({ register, errors, control, options }) {
  return (
    <>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício</label>
        <input type="text" {...register("name", { required: "Nome do exercício é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
        <input type="text" {...register("description", { required: "Descrição é obrigatória." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
        <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento</label>
        <Controller
          name="typeOfProcessing"
          control={control}
          rules={{
            required: "Selecione pelo menos um tipo de Processamento.",
            validate: value => value?.length > 0 || "Selecione pelo menos um tipo."
          }}
          render={({ field }) => (
            <MultiSelect {...field} options={options} optionLabel="label" optionValue="value" filter placeholder="Selecione os tipos de processamento" display="chip" className="w-full md:w-20rem " />
          )}
        />
        <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
      </div>
    </>
  );
}
