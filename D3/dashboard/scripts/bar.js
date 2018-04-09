function drawBars(yearRange, unit) {
  var barSelection =
    d3.select("#bar")
        .attr("width", width)
        .attr("height", height / 2);

  // scales
  var xScale =
    d3.scaleLinear()
      .domain(yearRange)
      .range([padding, width - padding]);

  var yScale =
    d3.scaleLinear()
      .range([height / 2 - padding, 0]);

  // axis
  barSelection
    .append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(${padding / 2}, ${height / 2 - padding / 2})`)
      .call(
        d3.axisBottom(xScale)
          .tickFormat(d3.format("d"))
      );

  barSelection
    .append("g")
      .classed("y-axis", true)
      .attr("transform", `translate(${padding * 1.5 - 10}, ${padding / 2})`)
      .call(d3.axisLeft(yScale).ticks(0));

  // y-axis label
  barSelection
    .append("text")
      .text(`CO2 emissions, ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`)
      .classed("y-label", true)
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 4)
      .attr("dy", padding / 4 - 9)
      .attr("text-anchor", "middle");

  // title
  barSelection
    .append("text")
      .classed("bar-title", true)
      .text("Click on a country to see annual trends.")
      .attr("x", width / 2)
      .attr("y", padding / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");
}

function updateBars(year, unit, data, selected, yearRange) {
  var barPadding = 2;
  var numBars = yearRange[1] - yearRange[0] + 1;
  var barWidth = (width - padding * 1.5) / numBars - barPadding;

  // replace data with array of year objects for country with no data so bars can be removed in descending order
  if (data.length === 0) {
    data = [];
    for (var i = yearRange[0]; i <= yearRange[1]; i++) {
      data.push({ year: i });
    }
    selected = false;
  }

  var t =
    d3.transition()
      .duration(750)
      .ease(d3.easeBounceOut);
  
  // remove bars if country de-selected or country with no data selected
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

    d3.select(".bar-title")
        .text("Click on a country to see annual trends.");
        
    return;
  }

  // get country data
  var country = data[0].country;
  var countryData = data.sort((a, b) => d3.ascending(a.year, b.year));

  // scales
  var xScale =
    d3.scaleLinear()
      .domain(yearRange)
      .range([padding * 1.5, width - padding / 2]);

  var yScale =
    d3.scaleLinear()
      .domain([0, d3.max(countryData, d => d[unit])])
      .range([height / 2 - padding, 0]);

  // y-axis
  d3.select(".y-axis")
    .transition()
    .duration(500)
      .call(d3.axisLeft(yScale));

  d3.select(".y-label")
      .text(`CO2 emissions, ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`);
  
  // title
  d3.select(".bar-title")
      .text(`CO2 Emissions, ${country}`);

  // update bars
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
      .on("mousemove touchmove", d => showTooltip(d, unit))
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
          return data ? yScale(d[unit]) + padding / 2 : height / 2 - padding / 2;
        })
        .attr("x", d => xScale(d.year) - 10);
}