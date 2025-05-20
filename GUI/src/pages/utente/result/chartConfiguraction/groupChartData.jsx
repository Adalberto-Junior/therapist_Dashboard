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
          const group = matchResult[1];
          if (!result[chartType][group]) result[chartType][group] = [];
          result[chartType][group].push({ axis: key, value: parseFloat(value) });
        }
      });
    });
  });

 // Processar dados não estáticos (line)
  nonStaticData.forEach(item => {
    Object.entries(item).forEach(([key, valueArray]) => {
      Object.entries(config).forEach(([chartType, { match }]) => {
        const matchResult = key.match(match);
        if (matchResult && chartType !== "radar") {
          const group = key;
          if (!result[chartType][group]) result[chartType][group] = [];

          const formattedData = valueArray.map((entry, i) => {
            if (typeof entry === "object" && entry !== null && "label" in entry && "value" in entry) {
              return { axis: entry.label, value: parseFloat(entry.value) };
            } else {
              return { axis: `Ponto ${i + 1}`, value: parseFloat(entry) };
            }
          });

          result[chartType][group] = formattedData;
        }
      });
    });
  });

  return result;
}

