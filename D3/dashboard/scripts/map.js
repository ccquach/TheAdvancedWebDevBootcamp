function getVariables() {
  var width = 960;
  var height = 600;

  var projection =
    d3.geoMercator()
      .scale(125)
      .translate([width / 2, height / 1.4]);

  var path =
    d3.geoPath()
      .projection(projection);

  return [width, height, path];
}

function drawMap() {
  var width = getVariables()[0];
  var height = getVariables()[1];

  var mapSelection =
    d3.select("#map")
        .attr("width", width)
        .attr("height", height);

  mapSelection
    .append("text")
      .classed("title", true)
      .attr("x", width / 2)
      .attr("y", "1.5em")
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");
}

function updateMap(year, unit, yearData, geoData) {
  yearData.forEach(row => {
    var countries = geoData.filter(d => d.id === row.countryCode);
    countries.forEach(country => country.properties = row);
  });

  var path = getVariables()[2];
  
  d3.select("#map")
    .selectAll(".country")
    .data(geoData)
    .enter()
    .append("path")
      .classed("country", true)
      .attr("d", path)
      .on("mousemove touchmove", showTooltip)
      .on("mouseout touchend", hideTooltip);

  var maxEmissions = d3.max(yearData, d => d[unit]);

  var fScale =
    d3.scaleLinear()
      .domain([0, maxEmissions / 4, maxEmissions])
      .range(["#ffcc00","#ff6600", "#990000"]);

  d3.selectAll(".country")
    .transition()
    .duration(750)
    .ease(d3.easeBackIn)
    .attr("fill", d => {
      var data = d.properties[unit];
      return data ? fScale(data) : "#ccc";
    });

  d3.select(".title")
      .text(`Carbon dioxide ${unit.toLowerCase()}, ${year}`);
}