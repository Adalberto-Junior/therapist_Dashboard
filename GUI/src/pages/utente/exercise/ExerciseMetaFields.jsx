// import React from 'react';
// import { ErrorMessage } from "@hookform/error-message";
// import { Controller } from "react-hook-form";
// import { MultiSelect } from 'primereact/multiselect';

// export function ExerciseMetaFields({ register, errors, control, options, appendStep }) {
//   return (
//     <>
//       <div>
//         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Nome do Exercício <span style={{ color: 'red' }}>*</span></label>
//         <input type="text" {...register("name", { required: "Nome do exercício é obrigatório." })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
//         <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//       </div>
//       <div>
//         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Descrição</label>
//         <input type="text" {...register("description", )} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
//         <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//       </div>
//       <div>
//         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-black">Tipo de Processamento <span style={{ color: 'red' }}>*</span></label>
//         <Controller
//           name="typeOfProcessing"
//           control={control}
//           rules={{
//             required: "Selecione pelo menos um tipo de Processamento.",
//             validate: value => value?.length > 0 || "Selecione pelo menos um tipo."
//           }}
//           render={({ field }) => (
//             <MultiSelect {...field} options={options} optionLabel="label" optionValue="value" filter placeholder="Selecione os tipos de processamento" display="chip" className="w-full md:w-20rem " />
//           )}
//         />
//         <ErrorMessage errors={errors} name="typeOfProcessing" render={({ message }) => <p className="text-red-500 text-sm">{message}</p>} />
//       </div>
//       <div>
//         <button type="button" onClick={appendStep} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Adicionar passos</button>
//       </div>
//     </>
//   );
// }


import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { MultiSelect } from "primereact/multiselect";
import { PlusCircle } from "lucide-react";

export function ExerciseMetaFields({ register, errors, control, options, appendStep }) {
  return (
    <div className="space-y-4 rounded-xl border p-4 bg-muted/30">
      {/* Nome */}
      <div>
        <label className="block mb-1 font-medium">
          Nome do Exercício <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          {...register("name", { required: "Nome do exercício é obrigatório." })}
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block mb-1 font-medium">Descrição</label>
        <Textarea {...register("description")} />
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
        />
      </div>

      {/* Tipo de processamento */}
      <div>
        <label className="block mb-1 font-medium">
          Tipo de Processamento <span className="text-red-500">*</span>
        </label>
        <Controller
          name="typeOfProcessing"
          control={control}
          rules={{
            required: "Selecione pelo menos um tipo de Processamento.",
            validate: (value) => value?.length > 0 || "Selecione pelo menos um tipo.",
          }}
          render={({ field }) => (
            <MultiSelect
              {...field}
              options={options}
              optionLabel="label"
              optionValue="value"
              filter
              placeholder="Selecione os tipos"
              display="chip"
              className="w-full"
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="typeOfProcessing"
          render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
        />
      </div>

      {/* Botão de adicionar passos */}
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={appendStep} className="flex gap-2">
          <PlusCircle size={16} /> Adicionar passo
        </Button>
      </div>
    </div>
  );
}
