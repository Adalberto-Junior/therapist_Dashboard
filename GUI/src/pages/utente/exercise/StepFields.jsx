import React from 'react';
import { ErrorMessage } from "@hookform/error-message";


// export function StepFields({ field, index, type, camposPorTipo, camposPorTipoEn, editable, register, remove }) {
//   // Helper to get field value for read-only
//   const getFieldValue = (key) => field ? field[key] : '';

//   if (type === 'novo') {
//     return (
//       <>
//         <div className="mb-2">
//           <label className="block text-sm">Descrição:</label>
//           {editable ? (
//             <input {...register(`steps.${index}.description`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
//           ) : (
//             <input value={getFieldValue('description')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
//           )}
//         </div>
//         <div className="mb-2">
//           <label className="block text-sm">Label:</label>
//           {editable ? (
//             <input {...register(`steps.${index}.label`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
//           ) : (
//             <input value={getFieldValue('label')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
//           )}
//         </div>
//         <div className="mb-2">
//           <label className="block text-sm">Valor:</label>
//           {editable ? (
//             <input {...register(`steps.${index}.value`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
//           ) : (
//             <input value={getFieldValue('value')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
//           )}
//         </div>
//         <div className="mb-2">
//           <label className="block text-sm">ID:</label>
//           {editable ? (
//             <input {...register(`steps.${index}.id`, { required: true })} className="w-full p-2 border rounded dark:bg-zinc-600" />
//           ) : (
//             <input value={getFieldValue('id')} readOnly className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
//           )}
//         </div>
//         {editable && (
//           <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
//         )}
//       </>
//     );
//   }
//   return (
//     <>
//       {(camposPorTipo[type] || []).map((campo, campoIdx) => {
//         const fieldName = camposPorTipoEn[type]?.[campoIdx];
//         const value = getFieldValue(fieldName);
//         return (
//           <div className="mb-2" key={campo}>
//             <label className="block text-sm capitalize">{campo}:</label>
//             {campo === 'Texto' ? (
//                 <textarea 
//                   {...register(`steps.${index}.${fieldName}`, { required: true })}
//                   defaultValue={value} 
//                   readOnly={!editable} 
//                   className="w-full p-5 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:border-zinc-600 dark:text-black" 
//                 />
//             ) : (
//                 // <input defaultValue={value} readOnly={!editable} className="w-full p-2 border rounded dark:bg-gray-400 dark:text-black" />
//                 <input 
//                   {...register(`steps.${index}.${fieldName}`, { required: true })}
//                   defaultValue={value}
//                   readOnly={!editable}
//                   className={`w-full p-2 border rounded ${editable ? "dark:bg-zinc-600" : "dark:bg-gray-400 dark:text-black"}`}
//                 />

//             )}
//           </div>
//         );
//       })}
//       {editable && (
//         <button type="button" onClick={() => remove(index)} className="mt-2 text-red-600 hover:underline rounded">Remover</button>
//       )}
//     </>
//   );
// }



export function StepFields({
  field,
  index,
  type,
  camposPorTipo,
  camposPorTipoEn,
  editable,
  register,
  remove,
}) {
  // 🔹 Sempre usa register para manter os valores no react-hook-form
  const isNovo = type === "novo";

  if (isNovo) {
    return (
      <div className="border rounded p-3 mb-3">
        <div className="mb-2">
          <label className="block text-sm">Instrução <span style={{ color: 'red' }}>*</span></label>
          <input
            {...register(`steps.${index}.description`, { required: true })}
            defaultValue={field?.description || ""}
            readOnly={!editable}
            className={`w-full p-2 border rounded ${
              editable ? "dark:bg-zinc-600" : "dark:bg-gray-400 dark:text-black"
            }`}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">Label <span style={{ color: 'red' }}>*</span></label>
          <input
            {...register(`steps.${index}.label`, { required: true })}
            defaultValue={field?.label || ""}
            readOnly={!editable}
            className={`w-full p-2 border rounded ${
              editable ? "dark:bg-zinc-600" : "dark:bg-gray-400 dark:text-black"
            }`}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">Valor <span style={{ color: 'red' }}>*</span></label>
          <input
            {...register(`steps.${index}.value`, { required: true })}
            defaultValue={field?.value || ""}
            readOnly={!editable}
            className={`w-full p-2 border rounded ${
              editable ? "dark:bg-zinc-600" : "dark:bg-gray-400 dark:text-black"
            }`}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">ID <span style={{ color: 'red' }}>*</span></label>
          <input
            {...register(`steps.${index}.id`, { required: true })}
            defaultValue={field?.id || ""}
            readOnly={!editable}
            className={`w-full p-2 border rounded ${
              editable ? "dark:bg-zinc-600" : "dark:bg-gray-400 dark:text-black"
            }`}
          />
        </div>

        {editable && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 text-red-600 hover:underline rounded"
          >
            Remover
          </button>
        )}
      </div>
    );
  }

  // 🔹 Para os outros tipos (palavras, frases, leitura, etc.)
  return (
    <div className="border rounded p-3 mb-3">
      {(camposPorTipo[type] || []).map((campo, campoIdx) => {
        const fieldName = camposPorTipoEn[type]?.[campoIdx];
        return (
          <div className="mb-2" key={campo}>
            <label className="block text-sm capitalize">{campo}<span style={{ color: 'red' }}>*</span></label>

            {campo === "Texto" ? (
              <textarea
                {...register(`steps.${index}.${fieldName}`, { required: true })}
                defaultValue={field?.[fieldName] || ""}
                readOnly={!editable}
                className={`w-full p-2 border rounded ${
                  editable
                    ? "dark:bg-zinc-600"
                    : "dark:bg-gray-400 dark:text-black"
                }`}
              />
            ) : (
              <input
                {...register(`steps.${index}.${fieldName}`, { required: true })}
                defaultValue={field?.[fieldName] || ""}
                readOnly={!editable}
                className={`w-full p-2 border rounded ${
                  editable
                    ? "dark:bg-zinc-600"
                    : "dark:bg-gray-400 dark:text-black"
                }`}
              />
            )}
          </div>
        );
      })}

      {editable && (
        <button
          type="button"
          onClick={() => remove(index)}
          className="mt-2 text-red-600 hover:underline rounded"
        >
          Remover
        </button>
      )}
    </div>
  );
}
