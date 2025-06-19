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

export function groupChartData(staticData = [], nonStaticData = [], config) {
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
          const timeLabel = `${i * 20} ms`; // 20ms por deslocamento
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
        if (matchResult && chartType === "radar") {
          let group = matchResult[1];
          if (group === "BBEon" || group === "BBEoff") {
            group = "BBEon_BBEoff"; // Agrupar ambos em um único grupo
          }
          key = key.replace(/avg|Avg/, ""); // Normalizar chave
      
          
          
          if (group === "BBEon_BBEoff") {
            if (!result[chartType][group]) result[chartType][group] = [];

            result[chartType][group].push({ axis: key, value: parseFloat(value) });
          } 

          // else {
          //   result[chartType][group].push({ axis: key, value: parseFloat(value) });
          // }
          
        }
      });
    });
  });
  // console.log("Final Grouped Data for BBEon_BBEoff:", result);
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