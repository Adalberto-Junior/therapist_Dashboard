import React, { useRef, useEffect } from 'react';
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

    // Escalas invertidas
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F2)).nice()
      .range([width, 0]); // invertido

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.F1)).nice()
      .range([0, height]); // invertido

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

    // Pontos + etiquetas
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.F2))
      .attr("cy", d => y(d.F1))
      .attr("r", 5)
      .style("fill", "#4e79a7");

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
};

