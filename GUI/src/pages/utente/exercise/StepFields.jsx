import React from 'react';
import { ErrorMessage } from "@hookform/error-message";

export function StepFields({ index, type, register, camposPorTipo, camposPorTipoEn, remove }) {
  if (type === 'novo') {
    return (
      <>
        <div className="mb-2">
          <label className="block text-sm">Descrição:</label>
          <input {...register(`steps.${index}.description`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Label:</label>
          <input {...register(`steps.${index}.label`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Valor:</label>
          <input {...register(`steps.${index}.value`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
        </div>
        <div className="mb-2">
          <label className="block text-sm">ID:</label>
          <input {...register(`steps.${index}.id`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
        </div>
        <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
      </>
    );
  }
  return (
    <>
      {(camposPorTipo[type] || []).map((campo, campoIdx) => {
        const fieldName = camposPorTipoEn[type]?.[campoIdx];
        return (
          <div className="mb-2" key={campo}>
            <label className="block text-sm capitalize">{campo}:</label>
            {campo === 'Texto' ? (
              <textarea {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            ) : (
              <input {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
            )}
          </div>
        );
      })}
      <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
    </>
  );
}

export function StepFieldsReadOnly({ field, index, type, camposPorTipo, camposPorTipoEn }) {
  return (
    <>
      {(type === 'novo' ? camposPorTipo['novo'] : camposPorTipo[type] || []).map((campo, i) => {
        const key = type === 'novo' ? campo.toLowerCase() : camposPorTipoEn[type]?.[i];
        const isTextarea = campo === 'Texto';
        return (
          <div className="mb-2" key={campo}>
            <label className="block text-sm capitalize">{campo}:</label>
            {isTextarea ? (
              <textarea value={field[key]} readOnly className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" />
            ) : (
              <input value={field[key]} readOnly className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" />
            )}
          </div>
        );
      })}
    </>
  );
}
