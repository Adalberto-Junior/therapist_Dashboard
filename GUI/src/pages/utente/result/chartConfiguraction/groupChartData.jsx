// export function groupChartData(dataArr, config) {
//   const result = {};

//   Object.entries(config).forEach(([chartType]) => {
//     result[chartType] = {};
//   });

//   (dataArr || []).forEach(item => {
//     Object.entries(item || {}).forEach(([key, value]) => {
//       Object.entries(config).forEach(([chartType, { match }]) => {
//         const matchResult = key.match(match);
//         if (matchResult) {
//           const group = matchResult[1]; // Ex: BBEon
//           if (!result[chartType][group]) result[chartType][group] = [];
//           result[chartType][group].push({ axis: key, value: parseFloat(value) });
//           console.log("Grouped Data:", result[chartType][group]);
//         }
//       });
//     });
//   });

//   return result;
// }

export function groupChartData(staticData = [], nonStaticData = [], config, ms = 20) {
  const result = {};
  Object.keys(config).forEach(chartType => {
    result[chartType] = {};
  });

  // Processar dados estáticos (ex: radar)
  staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (matchResult && chartType === "radar") {
          let group = matchResult[1];
          if (group === "BBEon" || group === "BBEoff") {
            group = "BBEon_BBEoff"; // Agrupar ambos em um único grupo
          }
          key = key.replace(/avg|Avg/, ""); // Normalizar chave
      
          if (!result[chartType][group]) result[chartType][group] = [];
          result[chartType][group].push({ axis: key, value: parseFloat(value) });
        }
      });
    });
  });

//  // Processar dados não estáticos (line)
//   nonStaticData.forEach(item => {
//     Object.entries(item).forEach(([key, valueArray]) => {
//       Object.entries(config).forEach(([chartType, { match }]) => {
//         const matchResult = key.match(match);
//         if (matchResult && chartType !== "radar") {
//           const group = key;
//           if (!result[chartType][group]) result[chartType][group] = [];

//           const formattedData = valueArray.map((entry, i) => {
//             if (typeof entry === "object" && entry !== null && "label" in entry && "value" in entry) {
//               return { axis: entry.label, value: parseFloat(entry.value) };
//             } else {
//               return { axis: `Ponto ${i + 1}`, value: parseFloat(entry) };
//             }
//           });
//           result[chartType][group] = formattedData;
//           // console.log("Grouped Data:", result[chartType][group]);
//         }
//       });
//     });
//   });
  // console.log("Final Grouped Data:", result);
  // console.log("Static Data:", staticData);
  
  nonStaticData.forEach(item => {
  Object.entries(item).forEach(([key, valueArray]) => {
    Object.entries(config).forEach(([chartType, { match }]) => {
      const matchResult = key.match(match);
      if (matchResult && chartType !== "radar") {
        const group = key; // ou: const group = descriptorType se quiseres agrupar por tipo
        if (!result[chartType][group]) result[chartType][group] = [];

        const formattedData = valueArray.map((entry, i) => {
          const timeLabel = `${i * ms} ms`; // 20ms por deslocamento
          if (typeof entry === "object" && entry !== null && "label" in entry && "value" in entry) {
            return { axis: timeLabel, value: parseFloat(entry.value) };
          } else {
            return { axis: timeLabel, value: parseFloat(entry) };
          }
        });

        result[chartType][group] = formattedData;
      }
    });
  });
});

//Agrupado por categoria:
// const temporalStep = 20; // deslocamento de 20ms entre frames

// nonStaticData.forEach(item => {
//   Object.entries(item).forEach(([key, valueArray]) => {
//     Object.entries(config).forEach(([chartType, { match }]) => {
//       const matchResult = key.match(match);
//       if (matchResult && chartType !== "radar") {
//         // Extrair tipo de descritor (BBE, MFCC, etc.)
//         const [descriptorType] = key.split("_");

//         // Criar estrutura de categoria
//         if (!result[chartType][descriptorType]) result[chartType][descriptorType] = {};

//         // Inicializar vetor de pontos por descritor
//         if (!result[chartType][descriptorType][key]) {
//           result[chartType][descriptorType][key] = [];
//         }

//         const formattedData = valueArray.map((entry, i) => {
//           const time = i * temporalStep; // tempo em ms
//           if (typeof entry === "object" && entry !== null && "label" in entry && "value" in entry) {
//             return { axis: `${time} ms`, value: parseFloat(entry.value) };
//           } else {
//             return { axis: `${time} ms`, value: parseFloat(entry) };
//           }
//         });

//         result[chartType][descriptorType][key] = formattedData;
//       }
//     });
//   });
// });



  return result;
}

export function groupBBEonBBEoffData(staticData = [], config) {
  const result = {};
  Object.keys(config).forEach(chartType => {
    result[chartType] = {};
  });
 

  // Processar dados estáticos (ex: radar)
  staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        console.log("Match Result:", matchResult);
        if (matchResult && chartType === "radar") {
          let group = matchResult[1];
          if (group === "BBEon") {
            group = "BBEon"; 
          }
          if (group === "BBEoff") {
            group = "BBEoff";
          }
          key = key.replace(/avg|Avg/, ""); // Normalizar chave
      
          
          
          if (group === "BBEon" || group === "BBEoff") {
            if (!result[chartType][group]) result[chartType][group] = [];

            result[chartType][group].push({ axis: key, value: parseFloat(value) });
          } 
        }
      });
    });
  });
  return result;
}

export function groupNotBBEonBBEoffData(staticData = [], config) {
  const result = {};
  Object.keys(config).forEach(chartType => {
    result[chartType] = {};
  });
 

  // Processar dados estáticos (ex: radar)
  staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (matchResult && chartType === "radar") {
          let group = matchResult[1];
          if (group === "BBEon" || group === "BBEoff") {
            group = "BBEon_BBEoff"; // Agrupar ambos em um único grupo
          }
          if (group === "MFCCoff" || group === "MFCCon") {
            group = "MFCCon & MFCCoff"; 
          }
          if (group === "DMFCCon" || group === "DMFCCoff") {
            group = "DMFCCon & DMFCCoff"; 
          }
          if (group ==="DDMFCCon" || group === "DDMFCCoff") {
            group = "DDMFCCon & DDMFCCoff";
          }

          key = key.replace(/avg|Avg/, ""); // Normalizar chave
          
          if (group === "BBEon_BBEoff") {
            return; // Ignorar BBEon_BBEoff para este agrupamento
          }
          if (!result[chartType][group]) result[chartType][group] = [];
          result[chartType][group].push({ axis: key, value: parseFloat(value) });
        }
      });
    });
  });
  // console.log("Final Grouped Data for Not BBEon_BBEoff:", result);
  return result;
}


export function groupPhonactionData(staticData = [], config) {
  const result = {};
  Object.keys(config).forEach(chartType => {
    result[chartType] = {};
  });

  staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (!matchResult) return;

        if (chartType === "radar") {
          let group = matchResult[2];
          
          // Agrupamento especial
          if (["avg Shimmer","Shimmer", "avg Jitter", "Jitter", "avg apq", "apq", "avg ppq", "ppq", "DF0","avg DF0", "avg DDF0","DDF0","avg logE","logE"].includes(group)) {
            group = "Shimmer & Jitter & apq & ppq & DF0 & DDF0 & logE"; // Agrupar todos esses em um único grupo
          }else{
            return; // Ignorar outros grupos
          }

          // Normalização da chave para axis
          let axis = key.replace(/avg|Avg/, "").trim(); // remove avg e espaços
          const numericValue = parseFloat(value);
          if (isNaN(numericValue)) return;

          if (!result[chartType][group]) {
            result[chartType][group] = [];
          }

          result[chartType][group].push({
            axis,
            value: numericValue
          });
        }

        // Exemplo de uso para linha (se precisares disso também)
        // if (chartType === "line") {
        //   const group = matchResult[1]; // ou outro agrupador
        //   const numericValue = parseFloat(value);
        //   if (isNaN(numericValue)) return;

        //   if (!result[chartType][group]) {
        //     result[chartType][group] = [];
        //   }

        //   result[chartType][group].push({
        //     name: key,
        //     value: numericValue
        //   });
        // }
      });
    });
  });
  return result;
}

export function groupAllData(staticData = [], config,typeOfProcessing= "prosody") {
  const result = {};
  Object.keys(config).forEach(chartType => {
    result[chartType] = {};
  });

  if (typeOfProcessing === "fonactionRadar") {
   staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (!matchResult) return;

        if (chartType === "radar") {
          let group = matchResult[1];

          // Agrupamento especial
          if (["avg Shimmer","Shimmer", "avg Jitter", "Jitter", "avg apq", "apq", "avg ppq", "ppq", "DF0","avg DF0", "avg DDF0","DDF0","avg logE","logE"].includes(group)) {
            group = "Shimmer & Jitter & apq & ppq & DF0 & DDF0 & logE"; // Agrupar todos esses em um único grupo
          }else{
            return; // Ignorar outros grupos
          }

          // Normalização da chave para axis
          let axis = key.replace(/avg|Avg/, "").trim(); // remove avg e espaços
          const numericValue = parseFloat(value);
          if (isNaN(numericValue)) return;

          if (!result[chartType][group]) {
            result[chartType][group] = [];
          }

          result[chartType][group].push({
            axis,
            value: numericValue
          });
        }
      });
    });
  });
  }else if (typeOfProcessing === "prosody") {
    staticData.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (!matchResult) return;

        if (chartType === "radar") {
          let group = matchResult[2];
          console.log("Match Result:", matchResult);

          // Agrupamento especial
          if (["F0avg", "F0std", "F0max", "Evoiced", "stdEvoiced", "lastEunvoiced", "Vrate", "durvoiced", "stddurpause", "stddurunvoiced", "durunvoiced", "stddurvoiced"].includes(group)) {
            group = "F0 & Evoiced & Vrate & durvoiced & durpause & durunvoiced"; 
          }else{
            return; // Ignorar outros grupos
          }
          console.log("Group:", group);

          // Normalização da chave para axis
          // let axis = key.replace(/avg|Avg/, "").trim(); // remove avg e espaços
          let axis = key.trim(); // remove avg, espaços e underscores
          
          const numericValue = parseFloat(value);
          if (isNaN(numericValue)) return;

          if (!result[chartType][group]) {
            result[chartType][group] = [];
          }

          result[chartType][group].push({
            axis,
            value: numericValue
          });
        }
      });
    });
  });
  }

  return result;
}
