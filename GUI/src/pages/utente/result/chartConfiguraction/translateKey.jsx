// Traduções de chave
const keyTranslations = {
  static_result: "Resultados Estáticos",
  no_static_result: "Resultados não Estáticos",
  "avg BBEon_1": "Média BBEon 1",
  "avg_BBEon_2": "Média BBEon 2",
  "avg_BBEon_3": "Média BBEon 3",
  "avg_BBEon_4": "Média BBEon 4",
  $oid: "ID do Objeto",
  id: "Identificador",
  date: "Data",
};

export function translateKey(key) {
  return keyTranslations[key] || key.replace(/_/g, " ");
}