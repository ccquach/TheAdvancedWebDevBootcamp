function drawBars(yearRange) {
  var barSelection =
    d3.select("#bar")
        .attr("width", width)
        .attr("height", height / 2);

  barSelection
    .append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height / 2 - padding / 2})`);

  barSelection
    .append("g")
      .classed("y-axis", true)
      .attr("transform", `translate(${padding - 10}, ${padding / 2})`);

  var xScale =
    d3.scaleLinear()
      .domain(yearRange)
      .range([padding, width - padding]);

  var yScale =
    d3.scaleLinear()
      .range([height / 2 - padding, 0]);

  d3.select(".x-axis")
    .call(
      d3.axisBottom(xScale)
        .tickFormat(d3.format("d"))
    );

  d3.select(".y-axis")
    .call(
      d3.axisLeft(yScale)
        .ticks(0)
    );

  barSelection
    .append("text")
      .classed("yLabel", true)
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 4)
      .attr("dy", padding / 4 - 9)
      .attr("text-anchor", "middle");

  barSelection
    .append("text")
      .classed("barTitle", true)
      .text("Click on a country to see annual trends.")
      .attr("x", width / 2)
      .attr("y", padding / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");
}

function updateBars(data, selected, yearRange, geoData) {
  var year = getInputValues()[0];
  var unit = getInputValues()[1];
  var barPadding = 0.25;
  var numBars = yearRange[1] - yearRange[0] + 1;
  var barWidth = (width - 2 * padding) / numBars - barPadding;
  var country = data[0].country;
  var countryData = data.sort((a, b) => d3.ascending(a.year, b.year));
  
  var t =
    d3.transition()
      .duration(750)
      .ease(d3.easeBounceOut);

  if (!selected) {
    var countryData = data.sort((a, b) => d3.descending(a.year, b.year));

    d3.select("#bar")
      .selectAll("rect")
      .data(countryData, d => d.year)
      .transition(t)
      .delay((d, i) => i * 100)
      .attr("y", height / 2 - padding / 2)
      .attr("height", 0)
      .remove();

    d3.select(".barTitle")
        .text("Click on a country to see annual trends.");
        
    return;
  }

  var xScale =
    d3.scaleLinear()
      .domain(yearRange)
      .range([padding, width - padding]);

  var yScale =
    d3.scaleLinear()
      .domain([0, d3.max(countryData, d => d[unit])])
      .range([height / 2 - padding, 0]);
  
  d3.select(".y-axis")
      .transition()
      .duration(500)
      .call(d3.axisLeft(yScale));

  d3.select(".yLabel")
      .text(`CO2 emissions, ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`);
  
  d3.select(".barTitle")
      .text(`CO2 Emissions, ${country}`);

  var barUpdate =
    d3.select("#bar")
      .selectAll("rect")
      .data(countryData, d => d.year);
      
  barUpdate
    .exit()
    .remove();

  barUpdate
    .enter()
    .append("rect")
      .attr("x", d => xScale(d.year) - 10)
      .attr("y", height / 2 - padding / 2)
      .attr("height", 0)
    .merge(barUpdate)
      .attr("fill", d => d.year === year ? "#009973" : "#00cc99")
      .on("mousemove touchmove", showTooltip)
      .on("mouseout touchend", hideTooltip)
      .transition(t)
      .delay((d, i) => i * 100)
        .attr("width", barWidth)
        .attr("height", d => {
          var data = d[unit];
          return data ? height / 2 - padding - yScale(d[unit]) : 0;
        })
        .attr("y", d => {
          var data = d[unit];
          return data ? yScale(d[unit]) + padding / 2 : 0;
        })
        .attr("x", d => xScale(d.year) - 10);
}