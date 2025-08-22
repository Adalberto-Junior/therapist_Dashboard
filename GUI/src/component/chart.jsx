import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';


export function RadarChart({
  data,
  width = 600,
  height = 500,
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


export function LineChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    if (!data || data.length < 2) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 1150 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.axis))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value) - 1, d3.max(data, (d) => d.value) + 1])
      .range([height, 0]);

    // Eixos
    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    chart.append("g").call(d3.axisLeft(y));

    // Linha
    const line = d3
      .line()
      .x((d) => x(d.axis))
      .y((d) => y(d.value));

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Tooltip container
    const tooltip = d3
      .select(ref.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("box-shadow", "0 2px 6px rgba(0, 0, 0, 0.2)");

    // Pontos
    chart
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.axis))
      .attr("cy", (d) => y(d.value))
      .attr("r", 4)
      .attr("fill", "#4f46e5")
      .on("mouseover click", function (event, d) {
        const bounds = ref.current.getBoundingClientRect();
        tooltip
          .html(`<strong>${d.axis}</strong><br/>Valor: ${d.value}`)
          .style("left", `${event.clientX - bounds.left + 10}px`)
          .style("top", `${event.clientY - bounds.top - 30}px`)
          .style("opacity", 1);
      })
      .on("mouseout", () => tooltip.style("opacity", 0));
  }, [data]);

  return <div ref={ref} style={{ position: "relative" }} />;
}

// Gráficos por categoria
export function LineChartCategory({ dataGroup }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    if (!dataGroup || Object.keys(dataGroup).length === 0) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 1150 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Pegar todos os pontos de tempo
    const allAxis = new Set();
    const allValues = [];

    Object.values(dataGroup).forEach(series => {
      series.forEach(d => {
        allAxis.add(d.axis);
        allValues.push(d.value);
      });
    });

    const x = d3.scalePoint()
      .domain(Array.from(allAxis))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(allValues) - 1, d3.max(allValues) + 1])
      .range([height, 0]);

    // Eixos
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Tooltip container
    const tooltip = d3.select(ref.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "4px 8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Linhas e círculos
    Object.entries(dataGroup).forEach(([label, series], index) => {
      const line = d3.line()
        .x(d => x(d.axis))
        .y(d => y(d.value));

      svg.append("path")
        .datum(series)
        .attr("fill", "none")
        .attr("stroke", color(index))
        .attr("stroke-width", 2)
        .attr("d", line);

      svg.selectAll(`.circle-${label}`)
        .data(series)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.axis))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", color(index))
        .on("mouseover", function (event, d) {
          tooltip
            .html(`<strong>${label}</strong><br/>${d.axis}: ${d.value}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`)
            .style("opacity", 1);
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
    });
  }, [dataGroup]);

  return <div ref={ref} style={{ position: "relative" }} />;
}



// export function AcousticSpaceD3({ data }) {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const margin = { top: 20, right: 30, bottom: 40, left: 50 };
//     const width = 600 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom);

//     svg.selectAll("*").remove(); // limpar SVG

//     const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

//     // Escalas invertidas
//     const x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.F2)).nice()
//       .range([width, 0]); // invertido

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.F1)).nice()
//       .range([0, height]); // invertido

//      const tooltip = d3
//       .select(svgRef.current)
//       .append("div")
//       .style("position", "absolute")
//       .style("background", "#fff")
//       .style("border", "1px solid #ccc")
//       .style("border-radius", "4px")
//       .style("padding", "6px 10px")
//       .style("font-size", "12px")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .style("box-shadow", "0 2px 6px rgba(0, 0, 0, 0.2)");

//     // Eixos
//     g.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x))
//       .append("text")
//       .attr("x", width / 2)
//       .attr("y", 35)
//       .attr("fill", "#000")
//       .text("F2 (Hz)");

//     g.append("g")
//       .call(d3.axisLeft(y))
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("x", -height / 2)
//       .attr("y", -40)
//       .attr("fill", "#000")
//       .text("F1 (Hz)");

//     // Pontos + etiquetas
//     g.selectAll(".dot")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => x(d.F2))
//       .attr("cy", d => y(d.F1))
//       .attr("r", 5)
//       .style("fill", "#4e79a7");

//     g.selectAll(".label")
//       .data(data)
//       .enter()
//       .append("text")
//       .attr("x", d => x(d.F2))
//       .attr("y", d => y(d.F1) - 10)
//       .attr("text-anchor", "middle")
//       .text(d => d.id)
//       .style("font-size", "14px");

//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };


export function AcousticSpaceD3({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // limpar SVG

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("stroke", "#000")
    .style("stroke-width", 2);

    // Escalas invertidas
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F2)).nice()
      .range([width, 0]); // invertido

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F1)).nice()
      .range([0, height]); // invertido
      

    // Grade
    const xGrid = d3.axisBottom(x).tickSize(-height).tickFormat("");
    const yGrid = d3.axisLeft(y).tickSize(-width).tickFormat("");

    // Eixo X com grid cinzenta
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(-height)  // ativa linhas da grid
        .tickPadding(10))
      .selectAll(".tick line")
      .attr("stroke", "#ccc") // cinzento claro
      .select(".domain").remove();

    // Eixo Y com grid cinzenta
    g.append("g")
      .call(d3.axisLeft(y)
        .tickSize(-width)   // ativa linhas da grid
        .tickPadding(10))
      .selectAll(".tick line")
      .attr("stroke", "#ccc") // cinzento claro
      .select(".domain").remove();

    // g.append("g")
    //   .attr("class", "x grid")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(xGrid);

    // g.append("g")
    //   .attr("class", "y grid")
    //   .call(yGrid);

    // Eixos
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .attr("fill", "#000")
      .text("F2 (Hz)");

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("fill", "#000")
      .text("F1 (Hz)");

    // Tooltip (div flutuante)
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("opacity", 0);

    // Pontos + eventos de tooltip
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.F2))
      .attr("cy", d => y(d.F1))
      .attr("r", 5)
      .style("fill", "#4e79a7")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.id}</strong><br>F1: ${d.F1} Hz<br>F2: ${d.F2} Hz`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 30) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Etiquetas (opcional)
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => x(d.F2))
      .attr("y", d => y(d.F1) - 10)
      .attr("text-anchor", "middle")
      .text(d => d.id)
      .style("font-size", "14px");

  }, [data]);

  return <svg ref={svgRef}></svg>;
}



export function AcousticSpaceD3V2({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // limpar SVG

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("stroke", "#000")
      .style("stroke-width", 2);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F2)).nice()
      .range([width, 0]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F1)).nice()
      .range([0, height]);

    // Eixos com grid
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(-height).tickPadding(10))
      .selectAll(".tick line").attr("stroke", "#ccc");

    g.append("g")
      .call(d3.axisLeft(y).tickSize(-width).tickPadding(10))
      .selectAll(".tick line").attr("stroke", "#ccc");

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .attr("fill", "#000")
      .text("F2 (Hz)");

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("fill", "#000")
      .text("F1 (Hz)");

    // Paleta de cores por data
    const labels = Array.from(new Set(data.map(d => d.label)));
    const color = d3.scaleOrdinal().domain(labels).range(d3.schemeCategory10);

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("opacity", 0);

    // Pontos
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.F2))
      .attr("cy", d => y(d.F1))
      .attr("r", 5)
      .style("fill", d => color(d.label || "default"))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.id}</strong><br>F1: ${d.F1} Hz<br>F2: ${d.F2} Hz<br>Data: ${d.label}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 30) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Etiquetas dos pontos
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => x(d.F2))
      .attr("y", d => y(d.F1) - 10)
      .attr("text-anchor", "middle")
      .text(d => d.id)
      .style("font-size", "14px");

    // Legenda
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top + 60})`);

    labels.forEach((label, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(${i * 160}, 0)`);

      legendRow.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", color(label));

      legendRow.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .attr("fill", "#000")
        .style("font-size", "14px")
        .text(label);
    });

    // Cleanup do tooltip ao desmontar
    return () => {
      tooltip.remove();
    };

  }, [data]);

  return <svg ref={svgRef}></svg>;
}


// export function Boxplot({ data, width = 400, height = 300 }) {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     // Clear previous content
//     d3.select(svgRef.current).selectAll("*").remove();

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Boxplot stats
//     const sorted = data.slice().sort(d3.ascending);
//     const q1 = d3.quantile(sorted, 0.25);
//     const median = d3.quantile(sorted, 0.5);
//     const q3 = d3.quantile(sorted, 0.75);
//     const min = d3.min(sorted);
//     const max = d3.max(sorted);

//     // Scales
//     const xScale = d3.scaleBand().domain(["F0"]).range([0, innerWidth]).padding(0.5);
//     const yScale = d3.scaleLinear().domain([min, max]).nice().range([innerHeight, 0]);

//     // Y axis with grid lines
//     svg.append("g")
//       .call(d3.axisLeft(yScale)
//         .tickSize(-innerWidth) // Extend ticks across the width
//         .tickFormat(d => d))   // Keep default formatting
//       .call(g => g.selectAll(".tick line").attr("stroke", "#ccc")) // Light gray grid lines
//       .call(g => g.select(".domain").remove()); // Remove axis line

//     // Box
//     svg.append("rect")
//       .attr("x", xScale("F0"))
//       .attr("y", yScale(q3))
//       .attr("height", yScale(q1) - yScale(q3))
//       .attr("width", xScale.bandwidth())
//       .attr("stroke", "black")
//       .attr("fill", "#69b3a2");

//     // Median line
//     svg.append("line")
//       .attr("x1", xScale("F0"))
//       .attr("x2", xScale("F0") + xScale.bandwidth())
//       .attr("y1", yScale(median))
//       .attr("y2", yScale(median))
//       .attr("stroke", "black");

//     // Whiskers
//     svg.append("line")
//       .attr("x1", xScale("F0") + xScale.bandwidth() / 2)
//       .attr("x2", xScale("F0") + xScale.bandwidth() / 2)
//       .attr("y1", yScale(min))
//       .attr("y2", yScale(q1))
//       .attr("stroke", "black");

//     svg.append("line")
//       .attr("x1", xScale("F0") + xScale.bandwidth() / 2)
//       .attr("x2", xScale("F0") + xScale.bandwidth() / 2)
//       .attr("y1", yScale(q3))
//       .attr("y2", yScale(max))
//       .attr("stroke", "black");

//     // Whisker caps
//     svg.append("line")
//       .attr("x1", xScale("F0") + xScale.bandwidth() / 4)
//       .attr("x2", xScale("F0") + (3 * xScale.bandwidth()) / 4)
//       .attr("y1", yScale(min))
//       .attr("y2", yScale(min))
//       .attr("stroke", "black");

//     svg.append("line")
//       .attr("x1", xScale("F0") + xScale.bandwidth() / 4)
//       .attr("x2", xScale("F0") + (3 * xScale.bandwidth()) / 4)
//       .attr("y1", yScale(max))
//       .attr("y2", yScale(max))
//       .attr("stroke", "black");

//   }, [data, width, height]);

//   return <svg ref={svgRef}></svg>;
// }

export function Boxplot({ data, width = 500, height = 300 }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const plotArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 🔹 Normalize: if `data` is an array, turn it into { id: values }
    let dataMap = {};
    if (Array.isArray(data)) {
      data.forEach(d => {
        if (d.id && d.F0) {
          dataMap[d.id] = d.F0; // adjust if you want a different feature than F0
        }
      });
    } else {
      dataMap = data; // already in object format
    }

    const categories = Object.keys(dataMap);
    const allValues = categories.flatMap(key => dataMap[key]);
    const min = d3.min(allValues);
    const max = d3.max(allValues);

    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([min, max])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    // Grid lines
    plotArea.append("g")
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(""))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e0e0e0"))
      .call(g => g.select(".domain").remove());

    // Y Axis
    plotArea.append("g").call(d3.axisLeft(yScale));

    // X Axis
    plotArea.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    const boxWidth = 30;

    // Tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "6px 10px")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("visibility", "hidden");

    categories.forEach(key => {
      const values = dataMap[key].slice().sort(d3.ascending);
      const q1 = d3.quantile(values, 0.25);
      const median = d3.quantile(values, 0.5);
      const q3 = d3.quantile(values, 0.75);
      const localMin = d3.min(values);
      const localMax = d3.max(values);
      const center = xScale(key) + xScale.bandwidth() / 2;
      const color = colorScale(key);

      // Box
      plotArea.append("rect")
        .attr("x", center - boxWidth / 2)
        .attr("y", yScale(q3))
        .attr("height", yScale(q1) - yScale(q3))
        .attr("width", boxWidth)
        .attr("stroke", "black")
        .attr("fill", color)
        .on("mouseover", () => {
          tooltip.style("visibility", "visible")
            .html(`
              <strong>${key}</strong><br/>
              Min: ${localMin}<br/>
              Q1: ${q1}<br/>
              Median: ${median}<br/>
              Q3: ${q3}<br/>
              Max: ${localMax}
            `);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", `${event.pageY - 10}px`)
                 .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      // Median line
      plotArea.append("line")
        .attr("x1", center - boxWidth / 2)
        .attr("x2", center + boxWidth / 2)
        .attr("y1", yScale(median))
        .attr("y2", yScale(median))
        .attr("stroke", "black");

      // Whiskers
      plotArea.append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", yScale(localMin))
        .attr("y2", yScale(q1))
        .attr("stroke", "black");

      plotArea.append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", yScale(q3))
        .attr("y2", yScale(localMax))
        .attr("stroke", "black");

      // Whisker caps
      plotArea.append("line")
        .attr("x1", center - boxWidth / 4)
        .attr("x2", center + boxWidth / 4)
        .attr("y1", yScale(localMin))
        .attr("y2", yScale(localMin))
        .attr("stroke", "black");

      plotArea.append("line")
        .attr("x1", center - boxWidth / 4)
        .attr("x2", center + boxWidth / 4)
        .attr("y1", yScale(localMax))
        .attr("y2", yScale(localMax))
        .attr("stroke", "black");
    });

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
}


// export function Boxplot({ data, width = 500, height = 300 }) {
//   const svgRef = useRef();
//   console.log("BoxF0: ", data)
//   useEffect(() => {
//     if (!data || Object.keys(data).length === 0) return;

//     d3.select(svgRef.current).selectAll("*").remove();

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height);

//     const plotArea = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const categories = Object.keys(data);
//     const allValues = categories.flatMap(key => data[key]);
//     const min = d3.min(allValues);
//     const max = d3.max(allValues);

//     const xScale = d3.scaleBand()
//       .domain(categories)
//       .range([0, innerWidth])
//       .padding(0.4);

//     const yScale = d3.scaleLinear()
//       .domain([min, max])
//       .nice()
//       .range([innerHeight, 0]);

//     const colorScale = d3.scaleOrdinal()
//       .domain(categories)
//       .range(d3.schemeCategory10); // 10 distinct colors

//     // Grid lines
//     plotArea.append("g")
//       .call(d3.axisLeft(yScale)
//         .tickSize(-innerWidth)
//         .tickFormat(""))
//       .call(g => g.selectAll(".tick line").attr("stroke", "#e0e0e0"))
//       .call(g => g.select(".domain").remove());

//     // Y Axis
//     plotArea.append("g").call(d3.axisLeft(yScale));

//     // X Axis
//     plotArea.append("g")
//       .attr("transform", `translate(0,${innerHeight})`)
//       .call(d3.axisBottom(xScale));

//     const boxWidth = 30;

//     // Tooltip div
//     const tooltip = d3.select("body")
//       .append("div")
//       .style("position", "absolute")
//       .style("padding", "6px 10px")
//       .style("background", "white")
//       .style("border", "1px solid #ccc")
//       .style("border-radius", "4px")
//       .style("pointer-events", "none")
//       .style("font-size", "12px")
//       .style("visibility", "hidden");
    
//     categories.forEach(key => {
//       const values = data[key].slice().sort(d3.ascending);
//       const q1 = d3.quantile(values, 0.25);
//       const median = d3.quantile(values, 0.5);
//       const q3 = d3.quantile(values, 0.75);
//       const localMin = d3.min(values);
//       const localMax = d3.max(values);
//       const center = xScale(key) + xScale.bandwidth() / 2;
//       const color = colorScale(key);

//       // Box
//       plotArea.append("rect")
//         .attr("x", center - boxWidth / 2)
//         .attr("y", yScale(q3))
//         .attr("height", yScale(q1) - yScale(q3))
//         .attr("width", boxWidth)
//         .attr("stroke", "black")
//         .attr("fill", color)
//         .on("mouseover", () => {
//           tooltip.style("visibility", "visible")
//             .html(`
//               <strong>${key}</strong><br/>
//               Min: ${localMin}<br/>
//               Q1: ${q1}<br/>
//               Median: ${median}<br/>
//               Q3: ${q3}<br/>
//               Max: ${localMax}
//             `);
//         })
//         .on("mousemove", (event) => {
//           tooltip.style("top", `${event.pageY - 10}px`)
//                  .style("left", `${event.pageX + 10}px`);
//         })
//         .on("mouseout", () => {
//           tooltip.style("visibility", "hidden");
//         });

//       // Median line
//       plotArea.append("line")
//         .attr("x1", center - boxWidth / 2)
//         .attr("x2", center + boxWidth / 2)
//         .attr("y1", yScale(median))
//         .attr("y2", yScale(median))
//         .attr("stroke", "black");

//       // Whiskers
//       plotArea.append("line")
//         .attr("x1", center)
//         .attr("x2", center)
//         .attr("y1", yScale(localMin))
//         .attr("y2", yScale(q1))
//         .attr("stroke", "black");

//       plotArea.append("line")
//         .attr("x1", center)
//         .attr("x2", center)
//         .attr("y1", yScale(q3))
//         .attr("y2", yScale(localMax))
//         .attr("stroke", "black");

//       // Whisker caps
//       plotArea.append("line")
//         .attr("x1", center - boxWidth / 4)
//         .attr("x2", center + boxWidth / 4)
//         .attr("y1", yScale(localMin))
//         .attr("y2", yScale(localMin))
//         .attr("stroke", "black");

//       plotArea.append("line")
//         .attr("x1", center - boxWidth / 4)
//         .attr("x2", center + boxWidth / 4)
//         .attr("y1", yScale(localMax))
//         .attr("y2", yScale(localMax))
//         .attr("stroke", "black");
//     });

//   }, [data, width, height]);

//   return <svg ref={svgRef}></svg>;
// }

export function PauseBoxplot({ data, width = 500, height = 300 }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const plotArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 🔑 Normalize data: if array, convert to { id: values[] }
    let normalized = {};
    if (Array.isArray(data)) {
      data.forEach(item => {
        const [key, values] = Object.entries(item)[0]; // e.g. {id:..., pausedurations:[...]}
        const label = item.id || key;
        normalized[label] = Array.isArray(values) ? values : [values];
      });
    } else {
      Object.entries(data).forEach(([key, values]) => {
        normalized[key] = Array.isArray(values) ? values : [values];
      });
    }

    const categories = Object.keys(normalized);
    const allValues = categories.flatMap(key => normalized[key]);
    const min = d3.min(allValues);
    const max = d3.max(allValues);

    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([min, max])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    // Grid lines
    plotArea.append("g")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e0e0e0"))
      .call(g => g.select(".domain").remove());

    // Y Axis
    plotArea.append("g").call(d3.axisLeft(yScale));

    // X Axis
    plotArea.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    const boxWidth = 30;

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "6px 10px")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("visibility", "hidden");

    console.log("Categoria (normalized): ", categories);

    categories.forEach(key => {
      const values = normalized[key].slice().sort(d3.ascending);
      const q1 = d3.quantile(values, 0.25);
      const median = d3.quantile(values, 0.5);
      const q3 = d3.quantile(values, 0.75);
      const localMin = d3.min(values);
      const localMax = d3.max(values);
      const center = xScale(key) + xScale.bandwidth() / 2;
      const color = colorScale(key);

      // Draw box, whiskers, median...
      plotArea.append("rect")
        .attr("x", center - boxWidth / 2)
        .attr("y", yScale(q3))
        .attr("height", yScale(q1) - yScale(q3))
        .attr("width", boxWidth)
        .attr("stroke", "black")
        .attr("fill", color)
        .on("mouseover", () => {
          tooltip.style("visibility", "visible")
            .html(`
              <strong>${key}</strong><br/>
              Min: ${localMin}<br/>
              Q1: ${q1}<br/>
              Median: ${median}<br/>
              Q3: ${q3}<br/>
              Max: ${localMax}
            `);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", `${event.pageY - 10}px`)
                 .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", () => tooltip.style("visibility", "hidden"));

      // Median line
      plotArea.append("line")
        .attr("x1", center - boxWidth / 2)
        .attr("x2", center + boxWidth / 2)
        .attr("y1", yScale(median))
        .attr("y2", yScale(median))
        .attr("stroke", "black");

      // Whiskers
      plotArea.append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", yScale(localMin))
        .attr("y2", yScale(q1))
        .attr("stroke", "black");

      plotArea.append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", yScale(q3))
        .attr("y2", yScale(localMax))
        .attr("stroke", "black");

      // Whisker caps
      plotArea.append("line")
        .attr("x1", center - boxWidth / 4)
        .attr("x2", center + boxWidth / 4)
        .attr("y1", yScale(localMin))
        .attr("y2", yScale(localMin))
        .attr("stroke", "black");

      plotArea.append("line")
        .attr("x1", center - boxWidth / 4)
        .attr("x2", center + boxWidth / 4)
        .attr("y1", yScale(localMax))
        .attr("y2", yScale(localMax))
        .attr("stroke", "black");
    });

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
}


export function PauseBoxplot1({ data, width = 400, height = 300 }) {
  const svgRef = useRef();

  // console.log("PauseBox: ",data)

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const sorted = data.slice().sort(d3.ascending);
    const q1 = d3.quantile(sorted, 0.25);
    const median = d3.quantile(sorted, 0.5);
    const q3 = d3.quantile(sorted, 0.75);
    const min = d3.min(sorted);
    const max = d3.max(sorted);

    const yScale = d3.scaleLinear().domain([min, max]).nice().range([innerHeight, 0]);
    const xScale = d3.scaleBand().domain(["Pause"]).range([0, innerWidth]).padding(0.5);

    // Grid
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e0e0e0"))
      .call(g => g.select(".domain").remove());

    // Y Axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Box
    svg.append("rect")
      .attr("x", xScale("Pause"))
      .attr("y", yScale(q3))
      .attr("height", yScale(q1) - yScale(q3))
      .attr("width", xScale.bandwidth())
      .attr("stroke", "black")
      .attr("fill", "#69b3a2");

    // Median line
    svg.append("line")
      .attr("x1", xScale("Pause"))
      .attr("x2", xScale("Pause") + xScale.bandwidth())
      .attr("y1", yScale(median))
      .attr("y2", yScale(median))
      .attr("stroke", "black");

    // Whiskers
    svg.append("line")
      .attr("x1", xScale("Pause") + xScale.bandwidth() / 2)
      .attr("x2", xScale("Pause") + xScale.bandwidth() / 2)
      .attr("y1", yScale(min))
      .attr("y2", yScale(q1))
      .attr("stroke", "black");

    svg.append("line")
      .attr("x1", xScale("Pause") + xScale.bandwidth() / 2)
      .attr("x2", xScale("Pause") + xScale.bandwidth() / 2)
      .attr("y1", yScale(q3))
      .attr("y2", yScale(max))
      .attr("stroke", "black");

    // Whisker caps
    svg.append("line")
      .attr("x1", xScale("Pause") + xScale.bandwidth() / 4)
      .attr("x2", xScale("Pause") + (3 * xScale.bandwidth()) / 4)
      .attr("y1", yScale(min))
      .attr("y2", yScale(min))
      .attr("stroke", "black");

    svg.append("line")
      .attr("x1", xScale("Pause") + xScale.bandwidth() / 4)
      .attr("x2", xScale("Pause") + (3 * xScale.bandwidth()) / 4)
      .attr("y1", yScale(max))
      .attr("y2", yScale(max))
      .attr("stroke", "black");

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
}


export function IntensityChart({ data, width = 800, height = 300 }) {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);
  const [hoverData, setHoverData] = useState(null);

  if (!data || data.length === 0) return null;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.db) - 5, d3.max(data, (d) => d.db) + 5])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.db));

    const zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", (event) => {
      const transform = event.transform;
      const newX = transform.rescaleX(x);
      const newLine = d3
        .line()
        .x((d) => newX(d.time))
        .y((d) => y(d.db));

      svg.selectAll("path").attr("d", newLine(data));
      svg.select(".x-axis").call(d3.axisBottom(newX));
    });

    svg.call(zoom);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Hover interativo
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mousemove", function (event) {
        const [mx] = d3.pointer(event);
        const time = x.invert(mx);
        const pontoMaisProximo = data.reduce((a, b) =>
          Math.abs(b.time - time) < Math.abs(a.time - time) ? b : a
        );
        setHoverData(pontoMaisProximo);
      })
      .on("mouseleave", () => setHoverData(null));

    // Estatísticas
    const valoresValidos = data.filter((d) => typeof d.db === "number" && !isNaN(d.db));

    const mediaRaw = d3.mean(valoresValidos, (d) => d.db);
    const maxRaw = d3.max(valoresValidos, (d) => d.db);
    const minRaw = d3.min(valoresValidos, (d) => d.db);

    const media = mediaRaw !== undefined ? mediaRaw.toFixed(2) : "N/A";
    const max = maxRaw !== undefined ? maxRaw.toFixed(2) : "N/A";
    const min = minRaw !== undefined ? minRaw.toFixed(2) : "N/A";

    setTooltip({ media, max, min });
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      {/* Container do gráfico + hover */}
      <div style={{ position: "relative" }}>
        <svg ref={svgRef}></svg>

        {hoverData && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#e0f7fa",
              padding: "8px",
              border: "1px solid #aaa",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          >
            {typeof hoverData.db === "number" && typeof hoverData.time === "number" && (
              <div>
                <strong>🕒 {hoverData.time.toFixed(2)}s</strong>
                <br />
                Intensidade: {hoverData.db.toFixed(2)} dB
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar fixa à direita */}
      {tooltip && (
        <div
          style={{
            background: "#fff8dc",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minWidth: "160px",
            height: 150, // mesma altura do gráfico
          }}
        >
          <strong>📊 Estatísticas:</strong>
          <br />
          Média: {tooltip.media} dB
          <br />
          Máximo: {tooltip.max} dB
          <br />
          Mínimo: {tooltip.min} dB
        </div>
      )}
    </div>
  );
}


export function ComparacaoIntensidade  ({ audioA, audioB, nomeA = "Áudio A", nomeB = "Áudio B", width = 800, height = 350 }) {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // const width = 800;
    // const height = 350;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);

    const allData = [...audioA, ...audioB];

    const x = d3
      .scaleLinear()
      .domain(d3.extent(allData, (d) => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(allData, (d) => d.db) - 5, d3.max(allData, (d) => d.db) + 5])
      .range([height - margin.bottom, margin.top]);

    const lineA = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.db));

    const lineB = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.db));

    svg
      .append("path")
      .datum(audioA)
      .attr("fill", "none")
      .attr("stroke", "#42a5f5")
      .attr("stroke-width", 2)
      .attr("d", lineA);

    svg
      .append("path")
      .datum(audioB)
      .attr("fill", "none")
      .attr("stroke", "#ef5350")
      .attr("stroke-width", 2)
      .attr("d", lineB);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Estatísticas
    const statsA = {
      média: d3.mean(audioA, (d) => d.db).toFixed(2),
      máximo: d3.max(audioA, (d) => d.db).toFixed(2),
      mínimo: d3.min(audioA, (d) => d.db).toFixed(2),
    };

    const statsB = {
      média: d3.mean(audioB, (d) => d.db).toFixed(2),
      máximo: d3.max(audioB, (d) => d.db).toFixed(2),
      mínimo: d3.min(audioB, (d) => d.db).toFixed(2),
    };

    setTooltip({ statsA, statsB });
  }, [audioA, audioB]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "#f9fbe7",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <strong>📊 Estatísticas:</strong><br />
          <span style={{ color: "#42a5f5" }}>{nomeA}</span>: Média {tooltip.statsA.média} dB, Máx {tooltip.statsA.máximo}, Mín {tooltip.statsA.mínimo}<br />
          <span style={{ color: "#ef5350" }}>{nomeB}</span>: Média {tooltip.statsB.média} dB, Máx {tooltip.statsB.máximo}, Mín {tooltip.statsB.mínimo}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          fontSize: "13px",
          background: "#fff",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        <strong>Legenda:</strong><br />
        <span style={{ color: "#42a5f5" }}>● {nomeA}</span><br />
        <span style={{ color: "#ef5350" }}>● {nomeB}</span>
      </div>
    </div>
  );
};


