// // Traduções de chave
// const keyTranslations = {
//   static_result: "Resultados Estáticos",
//   no_static_result: "Resultados não Estáticos",
//   "avg BBEon_1": "Bark band energies in onset transitions 1",
//   "avg BBEon_2": "Bark band energies in onset transitions 2",
//   "avg_BBEon_3": "Média BBEon 3",
//   "avg_BBEon_4": "Média BBEon 4",
//   $oid: "ID do Objeto",
//   id: "Identificador",
//   date: "Data",
// };

// export function translateKey(key) {
//   return keyTranslations[key] || key.replace(/_/g, " ");
// }

const keyTranslations = {
  static_result: "Resultados Estáticos",
  no_static_result: "Resultados não Estáticos",
  $oid: "ID do Objeto",
  id: "Identificador",
  date: "Data",
};

export function translateKey(key) {
  // Traduz chaves conhecidas
  if (keyTranslations[key]) return keyTranslations[key];

  // Padrão: "avg BBEon_1" ou "dst BBEon_12"
  const pattern = /^(avg|dst) BBEon_(\d+)$/;
  const match = key.match(pattern);
  if (match) {
    const tipo = match[1] === "avg" ? "Média" : "Desvio padrão";
    const numero = match[2];
    return `${tipo} BBEon ${numero}`;
  }

  // Padrão genérico: substitui _ por espaço e capitaliza
  return key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}