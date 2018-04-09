function drawPie() {
  var pieSelection =
    d3.select("#pie")
        .attr("width", width)
        .attr("height", height / 2);

  // center pie chart
  pieSelection
    .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 4})`)
      .classed("chart", true);

  // title
  pieSelection
    .append("text")
      .classed("pie-title", true)
      .attr("x", width / 2)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");
}

function updatePie(year, continents, data) {
  // filter out countries with no data
  var yearData = data.reduce((acc, next) => {
    if (next.Emissions) acc.push(next);
    return acc;
  }, []);
  
  // get total emissions for the year
  var total = yearData.reduce((acc, next) => acc += +next.Emissions, 0);
  
  // color scale
  var colorScale =
    d3.scaleOrdinal()
      .domain(continents)
      .range(d3.schemeDark2);

  // get new arcs with updated data
  var arcs =
    d3.pie()
      .value(d => d.Emissions)
      .sort((a, b) => {
        if (a.continent < b.continent) return -1;
        else if (a.continent > b.continent) return 1;
        else return a.Emissions - b.Emissions;
      })
      (yearData);

  var path =
    d3.arc()
      .outerRadius(width / 8)
      .innerRadius(0)
      .padAngle(0);

   // update pie graph
  var pieUpdate =
    d3.select(".chart")
      .selectAll(".arc")
      .data(arcs);

  pieUpdate
    .exit()
    .remove();
  
  pieUpdate
    .enter()
    .append("path")
      .classed("arc", true)
    .merge(pieUpdate)
      .attr("fill", d => colorScale(d.data.continent))
      .attr("stroke", "white")
      .attr("stroke-width", "0.5px")
      .attr("d", path)
      .on("mousemove touchmove", d => showTooltip(d.data, "Emissions", d.data.Emissions / total))
      .on("mouseout touchend", hideTooltip);
  
  // title
  d3.select(".pie-title")
      .text(`Total emissions by continent and region, ${year}`);
}