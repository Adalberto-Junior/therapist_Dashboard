import React from 'react';
import { ErrorMessage } from "@hookform/error-message";


export function StepFields({ field, index, type, camposPorTipo, camposPorTipoEn, editable, register, remove }) {
  // Helper to get field value for read-only
  const getFieldValue = (key) => field ? field[key] : '';

  if (type === 'novo') {
    return (
      <>
        <div className="mb-2">
          <label className="block text-sm">Descrição:</label>
          {editable ? (
            <input {...register(`steps.${index}.description`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          ) : (
            <input value={getFieldValue('description')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm">Label:</label>
          {editable ? (
            <input {...register(`steps.${index}.label`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          ) : (
            <input value={getFieldValue('label')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm">Valor:</label>
          {editable ? (
            <input {...register(`steps.${index}.value`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          ) : (
            <input value={getFieldValue('value')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm">ID:</label>
          {editable ? (
            <input {...register(`steps.${index}.id`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
          ) : (
            <input value={getFieldValue('id')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
          )}
        </div>
        {editable && (
          <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
        )}
      </>
    );
  }
  return (
    <>
      {(camposPorTipo[type] || []).map((campo, campoIdx) => {
        const fieldName = camposPorTipoEn[type]?.[campoIdx];
        const value = getFieldValue(fieldName);
        console.log("fieellllllds: ", fieldName, "campos: ", campoIdx, "value: ", value)
        return (
          <div className="mb-2" key={campo}>
            <label className="block text-sm capitalize">{campo}:</label>
            {campo === 'Texto' ? (
                <textarea value={value} readOnly className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" />
            //   editable ? (
            //     <textarea {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            //   ) : (
            //   )
            ) : (
                <input value={value} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
            //   editable ? (
            //     <input {...register(`steps.${index}.${fieldName}`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
            //   ) : (
            //   )
            )}
          </div>
        );
      })}
      {editable && (
        <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
      )}
    </>
  );
}

