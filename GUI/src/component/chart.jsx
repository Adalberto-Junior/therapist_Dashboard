// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// RadarChart Component
// export function RadarChart({ data, width = 900, height = 600, levels = 10, maxValue }) {
//   const ref = useRef();

//   useEffect(() => {
//     const svg = d3.select(ref.current);
//     svg.selectAll('*').remove();

//     const allAxes = data.map(d => d.axis);
//     const total = allAxes.length;
//     const radius = Math.min(width, height) / 2;
//     const angleSlice = (Math.PI * 2) / total;
//     const maxVal = maxValue || d3.max(data, d => d.value);

//     const rScale = d3.scaleLinear()
//       .range([0, radius])
//       .domain([0, maxVal]);

//     const g = svg.append('g')
//       .attr('transform', `translate(${width/2},${height/2})`);

//     // Draw grid levels
//     for (let level = 0; level < levels; level++) {
//       const rLevel = radius * ((level + 1) / levels);
//       g.append('circle')
//         .attr('r', rLevel)
//         .style('fill', 'none')
//         .style('stroke', '#bbb')
//         .style('stroke-width', '0.5px');

//       // Level labels
//       g.append('text')
//         .attr('x', 4)
//         .attr('y', -rLevel)
//         .attr('dy', '0.4em')
//         .style('font-size', '10px')
//         .style('fill', '#666')
//         .text(((level + 1) * maxVal / levels).toFixed(2));
//     }

//     // Draw axis lines and labels
//     const axis = g.selectAll('.axis')
//       .data(allAxes)
//       .enter()
//       .append('g')
//       .attr('class', 'axis');

//     axis.append('line')
//       .attr('x1', 0)
//       .attr('y1', 0)
//       .attr('x2', (_, i) => rScale(maxVal * 1.1) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('y2', (_, i) => rScale(maxVal * 1.1) * Math.sin(angleSlice * i - Math.PI/2))
//       .style('stroke', '#ccc')
//       .style('stroke-width', '1px');

//     axis.append('text')
//       .attr('class', 'legend')
//       .attr('x', (_, i) => rScale(maxVal * 1.2) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('y', (_, i) => rScale(maxVal * 1.2) * Math.sin(angleSlice * i - Math.PI/2))
//       .attr('dy', '0.35em')
//       .style('font-size', '11px')
//       .style('fill', '#333')
//       .style('text-anchor', 'middle')
//       .text(d => d);

//     // Radar area
//     const radarLine = d3.lineRadial()
//       .radius(d => rScale(d.value))
//       .angle((_, i) => i * angleSlice)
//       .curve(d3.curveLinearClosed);

//     g.append('path')
//       .datum(data)
//       .attr('d', radarLine)
//       .style('fill', '#3b82f6')
//       .style('fill-opacity', 0.3)
//       .style('stroke', '#3b82f6')
//       .style('stroke-width', '2px');

//     // Tooltip
//     const tooltip = d3.select('body')
//       .append('div')
//       .attr('class', 'tooltip')
//       .style('position', 'absolute')
//       .style('background', '#fff')
//       .style('padding', '4px 8px')
//       .style('border', '1px solid #999')
//       .style('border-radius', '4px')
//       .style('pointer-events', 'none')
//       .style('opacity', 0);

//     // Dots and interaction
//     g.selectAll('.radarCircle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'radarCircle')
//       .attr('r', 4)
//       .attr('cx', (_, i) => rScale(data[i].value) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('cy', (_, i) => rScale(data[i].value) * Math.sin(angleSlice * i - Math.PI/2))
//       .style('fill', '#3b82f6')
//       .style('fill-opacity', 0.8)
//       .on('mouseover', (event, d) => {
//         tooltip.transition().duration(200).style('opacity', 0.9);
//         tooltip.html(`<strong>${d.axis}</strong>: ${d.value.toFixed(2)}`)
//           .style('left', (event.pageX + 10) + 'px')
//           .style('top', (event.pageY - 28) + 'px');
//       })
//       .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));
//   }, [data, width, height, levels, maxValue]);

//   return <svg ref={ref} width={width} height={height}></svg>;
// }

// BarChart Component
// export function BarChart({ data, width = 400, height = 200, margin = { top: 20, right: 20, bottom: 30, left: 40 } }) {
//   const ref = useRef();

//   useEffect(() => {
//     const svg = d3.select(ref.current);
//     svg.selectAll('*').remove();

//     const x = d3.scaleBand()
//       .domain(data.map((_, i) => i))
//       .range([margin.left, width - margin.right])
//       .padding(0.1);

//     const y = d3.scaleLinear()
//       .domain([0, d3.max(data)])
//       .nice()
//       .range([height - margin.bottom, margin.top]);

//     const g = svg.append('g');

//     // X Axis
//     g.append('g')
//       .attr('transform', `translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(x).tickFormat(i => i + 1));

//     // Y Axis
//     g.append('g')
//       .attr('transform', `translate(${margin.left},0)`)
//       .call(d3.axisLeft(y));

//     // Tooltip
//     const tooltip = d3.select('body')
//       .append('div')
//       .attr('class', 'tooltip')
//       .style('position', 'absolute')
//       .style('background', '#fff')
//       .style('padding', '4px 8px')
//       .style('border', '1px solid #999')
//       .style('border-radius', '4px')
//       .style('pointer-events', 'none')
//       .style('opacity', 0);

//     // Bars
//     g.selectAll('.bar')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', (_, i) => x(i))
//       .attr('y', d => y(d))
//       .attr('height', d => y(0) - y(d))
//       .attr('width', x.bandwidth())
//       .style('fill', '#3b82f6')
//       .on('mouseover', (event, d) => {
//         tooltip.transition().duration(200).style('opacity', 0.9);
//         tooltip.html(d.toFixed(2))
//           .style('left', (event.pageX + 10) + 'px')
//           .style('top', (event.pageY - 28) + 'px');
//       })
//       .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));
//   }, [data, width, height, margin]);

//   return <svg ref={ref} width={width} height={height}></svg>;
// }

// src/component/charts.jsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// export function RadarChart({
//   data,
//   width = 1000,
//   height = 1000,
//   levels = 10,
//   margin = { top: 70, right: 40, bottom: 200, left: 0 },
//   maxValue
// }) {
//   const ref = useRef();

//   useEffect(() => {
//     const svg = d3.select(ref.current);
//     svg.selectAll('*').remove();

//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;
//     const cx = margin.left + innerWidth / 2;
//     const cy = margin.top + innerHeight / 2;
//     const radius = Math.min(innerWidth, innerHeight) / 2;
//     const allAxes = data.map(d => d.axis);
//     const total = allAxes.length;
//     const angleSlice = (Math.PI * 2) / total;
//     const maxVal = maxValue ?? d3.max(data, d => d.value);

//     const rScale = d3.scaleLinear()
//       .range([0, radius])
//       .domain([0, maxVal]);

//     const g = svg.append('g')
//       .attr('transform', `translate(${cx},${cy})`);

//     // grid levels
//     for (let lvl = 0; lvl < levels; lvl++) {
//       const rLvl = radius * ((lvl + 1) / levels);
//       g.append('circle')
//         .attr('r', rLvl)
//         .style('fill', 'none')
//         .style('stroke', '#bbb')
//         .style('stroke-width', '0.5px');

//       g.append('text')
//         .attr('x', 4)
//         .attr('y', -rLvl)
//         .attr('dy', '0.4em')
//         .style('font-size', '10px')
//         .style('fill', '#666')
//         .text(((lvl + 1) * maxVal / levels).toFixed(2));
//     }

//     // axes
//     const axis = g.selectAll('.axis')
//       .data(allAxes)
//       .enter()
//       .append('g')
//       .attr('class', 'axis');

//     axis.append('line')
//       .attr('x1', 0).attr('y1', 0)
//       .attr('x2', (_, i) => rScale(maxVal * 1.05) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('y2', (_, i) => rScale(maxVal * 1.05) * Math.sin(angleSlice * i - Math.PI/2))
//       .style('stroke', '#ccc')
//       .style('stroke-width', '1px');

//     axis.append('text')
//       .attr('class', 'legend')
//       .attr('x', (_, i) => rScale(maxVal * 1.15) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('y', (_, i) => rScale(maxVal * 1.15) * Math.sin(angleSlice * i - Math.PI/2))
//       .attr('dy', '0.35em')
//       .style('font-size', '11px')
//       .style('fill', '#333')
//       .style('text-anchor', 'middle')
//       .text(d => d);

//     // radar area
//     const radarLine = d3.lineRadial()
//       .radius(d => rScale(d.value))
//       .angle((_, i) => i * angleSlice)
//       .curve(d3.curveLinearClosed);

//     g.append('path')
//       .datum(data)
//       .attr('d', radarLine)
//       .style('fill', '#3b82f6')
//       .style('fill-opacity', 0.3)
//       .style('stroke', '#3b82f6')
//       .style('stroke-width', '2px');

//     // dots + tooltip
//     const tooltip = d3.select('body').append('div')
//       .attr('class', 'tooltip')
//       .style('position', 'absolute')
//       .style('background', '#fff')
//       .style('padding', '4px 8px')
//       .style('border', '1px solid #999')
//       .style('border-radius', '4px')
//       .style('pointer-events', 'none')
//       .style('opacity', 0);

//     g.selectAll('.radarCircle')
//       .data(data)
//       .enter().append('circle')
//       .attr('class', 'radarCircle')
//       .attr('r', 4)
//       .attr('cx', (_, i) => rScale(data[i].value) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('cy', (_, i) => rScale(data[i].value) * Math.sin(angleSlice * i - Math.PI/2))
//       .style('fill', '#3b82f6')
//       .style('fill-opacity', 0.8)
//       .on('mouseover', (event, d) => {
//         tooltip.transition().duration(200).style('opacity', 0.9);
//         tooltip.html(`<strong>${d.axis}</strong>: ${d.value.toFixed(2)}`)
//           .style('left', (event.pageX + 10) + 'px')
//           .style('top', (event.pageY - 28) + 'px');
//       })
//       .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));
//   }, [data, width, height, levels, margin, maxValue]);

//   return (
//     <svg ref={ref} width={width} height={height}>
//       {/* opcionalmente bg com classe Tailwind */}  
//     </svg>
//   );
// }

export function RadarChart({
  data,
  width = 600,
  height = 600,
  levels = 10,
  margin = { top: 60, right: 60, bottom: 60, left: 60 },
  maxValue
}) {
  const ref = useRef();

  useEffect(() => {
    // console.log("Dados recebidos pelo RadarChart:", data);
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    // Preparação para lidar com valores negativos
    const values = data.map(d => d.value);
    const minVal = d3.min(values);
    const maxValOrig = maxValue ?? d3.max(values);
    const offset = minVal < 0 ? -minVal : 0;
    const maxVal = maxValOrig + offset;

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const cx = margin.left + innerW / 2;
    const cy = margin.top + innerH / 2;
    const radius = Math.min(innerW, innerH) / 2;
    const allAxes = data.map(d => d.axis);
    const total = allAxes.length;
    const angleSlice = (Math.PI * 2) / total;

    // Escala linear de 0 a maxVal para [0, radius]
    const rScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, radius]);

    const g = svg.append('g')
      .attr('transform', `translate(${cx},${cy})`);

    // Desenha níveis de grid
    for (let lvl = 0; lvl < levels; lvl++) {
      const rLvl = radius * ((lvl + 1) / levels);
      g.append('circle')
        .attr('r', rLvl)
        .style('fill', 'none')
        .style('stroke', '#bbb')
        .style('stroke-width', '0.5px');
      g.append('text')
        .attr('x', 4)
        .attr('y', -rLvl)
        .attr('dy', '0.4em')
        .style('font-size', '10px')
        .style('fill', '#666')
        .text(((lvl + 1) * maxVal / levels - offset).toFixed(2));
    }

    // Eixos e legendas
    const axis = g.selectAll('.axis')
      .data(allAxes)
      .enter().append('g')
      .attr('class', 'axis');

    axis.append('line')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', (_, i) => rScale(maxVal * 1.05) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (_, i) => rScale(maxVal * 1.05) * Math.sin(angleSlice * i - Math.PI/2))
      .style('stroke', '#ccc')
      .style('stroke-width', '1px');

    // axis.append('text')
    //   .attr('class', 'legend')
    //   .attr('x', (_, i) => rScale(maxVal * 1.15) * Math.cos(angleSlice * i - Math.PI/2))
    //   .attr('y', (_, i) => rScale(maxVal * 1.15) * Math.sin(angleSlice * i - Math.PI/2))
    //   .attr('dy', '0.35em')
    //   .style('font-size', '11px')
    //   .style('fill', '#333')
    //   .style('text-anchor', 'middle')
    //   .text(d => d);
    
    // axis.append('text')
    //   .attr('class', 'legend')
    //   .attr('text-anchor', 'middle')
    //   .attr('transform', (_, i) => {
    //     const angleDeg = (angleSlice * i * 180 / Math.PI) - 90;
    //     const x = rScale(maxVal * 1.15) * Math.cos(angleSlice * i - Math.PI/2);
    //     const y = rScale(maxVal * 1.15) * Math.sin(angleSlice * i - Math.PI/2);
    //     return `translate(${x}, ${y}) rotate(${angleDeg})`;
    //   })
    //   .style('font-size', '11px')
    //   .style('fill', '#333')
    //   .text(d => d);

    axis.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('transform', (_, i) => {
        const angle = angleSlice * i;
        const angleDeg = angle * 180 / Math.PI - 90;

        const x = rScale(maxVal * 1.15) * Math.cos(angle - Math.PI/2);
        const y = rScale(maxVal * 1.15) * Math.sin(angle - Math.PI/2);

        // Se o ângulo estiver entre 90° e 270°, invertemos (para manter leitura correta)
        const flip = angleDeg > 90 && angleDeg < 270 ? 180 : 0;

        return `translate(${x}, ${y}) rotate(${angleDeg + flip})`;
      })
      .style('font-size', '11px')
      .style('fill', '#333')
      .text((d, i) => d);



    // Gerar a área do radar ajustando cada valor com offset
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value + offset))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(data)
      .attr('d', radarLine)
      .style('fill', '#3b82f6')
      .style('fill-opacity', 0.3)
      .style('stroke', '#3b82f6')
      .style('stroke-width', '2px');

    // Pontos interativos + tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '4px 8px')
      .style('border', '1px solid #999')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    g.selectAll('.radarCircle')
      .data(data)
      .enter().append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 4)
      .attr('cx', (_, i) => rScale(data[i].value + offset) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('cy', (_, i) => rScale(data[i].value + offset) * Math.sin(angleSlice * i - Math.PI/2))
      .style('fill', '#3b82f6')
      .style('fill-opacity', 0.8)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.axis}</strong>: ${d.value.toFixed(2)}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));
  }, [data, width, height, levels, margin, maxValue]);

  return (
    <svg ref={ref} width={width} height={height}></svg>
  );
}



// src/component/charts.jsx (atualize apenas o BarChart)
export function BarChart({ data, width = 400, height = 200, margin = { top: 20, right: 20, bottom: 30, left: 40 } }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    // calcula domínio considerando negativos
    const minVal = d3.min(data);
    const maxVal = d3.max(data);
    const yDomain = [Math.min(0, minVal), Math.max(0, maxVal)];

    const x = d3.scaleBand()
      .domain(data.map((_, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain(yDomain)
      .nice()
      .range([height - margin.bottom, margin.top]);

    const g = svg.append('g');

    // eixos
    g.append('g')
      .attr('transform', `translate(0,${y(0)})`)       // baseline no zero
      .call(d3.axisBottom(x).tickFormat(i => i + 1));

    g.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // tooltip (como antes)
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '4px 8px')
      .style('border', '1px solid #999')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // desenha barras acima e abaixo da baseline
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => x(i))
      .attr('y', d => d >= 0 ? y(d) : y(0))               // se negativo, partem da base
      .attr('height', d => Math.abs(y(d) - y(0)))        // altura sempre positiva
      .attr('width', x.bandwidth())
      .style('fill', '#3b82f6')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(d.toFixed(2))
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height}></svg>;
}

// src/component/StaticBarChart.jsx
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

export function StaticBarChart({
  data,             // [{ axis: 'avg_BBEon_1', value:  -2.5 }, ...]
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 120 }
}) {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    // eixos
    const x = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.value),
        d3.max(data, d => d.value)
      ])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.axis))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    // bars
    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .attr('x', d => x(Math.min(0, d.value)))
        .attr('y', d => y(d.axis))
        .attr('width', d => Math.abs(x(d.value) - x(0)))
        .attr('height', y.bandwidth())
        .attr('fill', d => d.value >= 0 ? '#3b82f6' : '#f87171')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.axis}</strong>: ${d.value.toFixed(2)}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => tooltip.style('opacity', 0));

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(5));

    // Y Axis
    svg.append('g')
      .attr('transform', `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll('text')
        .style('font-size', '0.85em');

    // Tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '4px 8px')
      .style('border', '1px solid #999')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height}></svg>;
}

// LineChart
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export function LineChart({ data }) {
//   const chartData = data.map((value, index) => ({
//     name: `Ponto ${index + 1}`,
//     value,
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <RechartsLineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="value"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//         />
//       </RechartsLineChart>
//     </ResponsiveContainer>
//   );
// }


//LineChart.jsx
export function LineChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    // console.log("Dados recebidos pelo LineChart:", data);
    // Limpar SVG anterior
    d3.select(ref.current).selectAll("*").remove();

    if (!data || data.length < 2) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 1150 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3.scalePoint()
      .domain(data.map(d => d.axis))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.value) - 1,
        d3.max(data, d => d.value) + 1
      ])
      .range([height, 0]);

    // Eixos
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    // Linha
    const line = d3.line()
      .x(d => x(d.axis))
      .y(d => y(d.value));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Pontos
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.axis))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .attr("fill", "#4f46e5");

    // Tooltip
    const tooltip = d3.select(ref.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "4px 8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    svg.selectAll("circle")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`<strong>${d.axis}</strong><br/>${d.value}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`)
          .style("opacity", 1);
      })
      .on("mouseout", () => tooltip.style("opacity", 0));
  }, [data]);

  return <div ref={ref} style={{ position: "relative" }} />;
}


// export function LineChart({ data = [] }) {
//   const wrapper = useRef();          // div wrapper
//   const svgRef = useRef();           // svg element

//   useEffect(() => {
//     if (!data || data.length < 2) return;
//     const parsed = data.map((d, i) =>
//       typeof d === "object"
//         ? { label: d.axis ?? `Ponto ${i + 1}`, value: +d.value }
//         : { label: `Ponto ${i + 1}`, value: +d }
//     );

//     // ——— Dimensions ———
//     const W = 600;
//     const H = 300;
//     const margin = { top: 20, right: 20, bottom: 50, left: 50 };
//     const width = W - margin.left - margin.right;
//     const height = H - margin.top - margin.bottom;

    

//     // ——— Clear previous draw ———
//     d3.select(svgRef.current).selectAll("*").remove();

//     // ——— Scales ———
//     const x = d3
//       .scalePoint()
//       .domain(parsed.map(d => d.label))
//       .range([margin.left, width + margin.left]);

//     const y = d3
//       .scaleLinear()
//       .domain(d3.extent(parsed, d => d.value))
//       .nice()
//       .range([height + margin.top, margin.top]);

//     // ——— SVG root ———
//     const svg = d3
//       .select(svgRef.current)
//       .attr("viewBox", `0 0 ${W} ${H}`)
//       .attr("width", "100%")
//       .attr("height", "auto")
//       .style("overflow", "visible")
//       .style("font", "10px sans-serif")
//       .style("-webkit-tap-highlight-color", "transparent")
//       .on("pointerenter pointermove", pointermoved)
//       .on("pointerleave", pointerleft)
//       .on("touchstart", e => e.preventDefault());

//     // ——— Axes ———
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height + margin.top})`)
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("transform", "rotate(-45)")
//       .style("text-anchor", "end");

//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},0)`)
//       .call(d3.axisLeft(y))
//       .call(g => g.select(".domain").remove())
//       .call(g =>
//         g
//           .selectAll(".tick line")
//           .clone()
//           .attr("x2", width)
//           .attr("stroke-opacity", 0.1)
//       );

//     // ——— Line generator ———
//     const line = d3
//       .line()
//       .x(d => x(d.label))
//       .y(d => y(d.value));

//     svg
//       .append("path")
//       .datum(parsed)
//       .attr("fill", "none")
//       .attr("stroke", "#4f46e5")
//       .attr("stroke-width", 1.5)
//       .attr("d", line);

//     // ——— Tooltip group ———
//     const tooltip = svg.append("g").style("display", "none");

//     // Helpers
//     const bisect = d3.bisector(d => d.label).center; // para scalePoint
//     function pointermoved(event) {
//       const xm = event.layerX;
//       const label = x.invert ? x.invert(xm) : parsed[bisect(parsed, xm)].label;
//       const i = parsed.findIndex(d => d.label === label);
//       if (i === -1) return;
//       const d = parsed[i];

//       tooltip.style("display", null);
//       tooltip.attr(
//         "transform",
//         `translate(${x(d.label)},${y(d.value)})`
//       );

//       const path = tooltip
//         .selectAll("path")
//         .data([null])
//         .join("path")
//         .attr("fill", "white")
//         .attr("stroke", "black");

//       const text = tooltip
//         .selectAll("text")
//         .data([null])
//         .join("text")
//         .call(t =>
//           t
//             .selectAll("tspan")
//             .data([d.label, d.value.toFixed(2)])
//             .join("tspan")
//             .attr("x", 0)
//             .attr("y", (_, j) => `${j * 1.1}em`)
//             .attr("font-weight", (_, j) => (j ? null : "bold"))
//             .text(s => s)
//         );

//       size(text, path);
//     }

//     function pointerleft() {
//       tooltip.style("display", "none");
//     }

//     // dar forma ao balão
//     function size(text, path) {
//       const { x: bx, y: by, width: bw, height: bh } = text.node().getBBox();
//       text.attr("transform", `translate(${-bw / 2},${15 - by})`);
//       path.attr(
//         "d",
//         `M${-bw / 2 - 10},5H-5l5,-5l5,5H${bw / 2 + 10}v${bh + 20}h-${
//           bw + 20
//         }z`
//       );
//     }
//   }, [data]);

//   return <svg ref={svgRef} />;
// }
