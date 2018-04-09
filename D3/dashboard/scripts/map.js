function drawMap(year, unit, geoData) {
  var mapSelection =
    d3.select("#map")
        .attr("width", width)
        .attr("height", height);

  // title
  mapSelection
    .append("text")
      .classed("title", true)
      .attr("x", width / 2)
      .attr("y", "1.5em")
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");

  // draw map
  var projection =
    d3.geoMercator()
      .scale(100)
      .translate([width / 2, height / 1.4]);

  var path =
    d3.geoPath()
      .projection(projection);
  
  d3.select("#map")
    .selectAll(".country")
    .data(geoData)
    .enter()
    .append("path")
      .classed("country", true)
      .attr("id", d => d.id)
      .attr("d", path);
}

function updateMap(year, unit, yearRange, yearData, geoData, allData) {
  // join year data to geodata country object properties
  yearData.forEach(row => {
    var countries = geoData.filter(d => d.id === row.countryCode);
    countries.forEach(country => country.properties = row);
  });
  
  // add country and year data to geodata objects with empty properties
  var emptyCountries = geoData.filter(d => Object.keys(d.properties).length === 0);
  emptyCountries.forEach(country => country.properties = {
    country: "",
    year: year
  });
  
  // update path element data bindings
  d3.select("#map")
      .selectAll(".country")
      .data(geoData)
      .on("mousemove touchmove", d => showTooltip(d.properties, unit))
      .on("mouseout touchend", hideTooltip)
      .on("click", function(d) {
        // outline selected country
        var selected =
          d3.select(this)
              .classed("selected");
        
        d3.selectAll(".country")
            .classed("selected", false);

        if (!selected) {
          d3.select(this)
            .classed("selected", true);
        }
        // update bar graph with selected country's data
        var countryData = allData.filter(e => e.country === d.properties.country);
        updateBars(year, unit, countryData, !selected, yearRange);
      });

  // fill scale
  var maxEmissions = d3.max(yearData, d => d[unit]);

  var fScale =
    d3.scaleLinear()
      .domain(d3.extent(yearData, d => d[unit]))
      .range(["#ffcc00", "#4f0000"])
      .interpolate(d3.interpolateHsl);

  d3.selectAll(".country")
    .transition()
    .duration(750)
    .ease(d3.easeBackIn)
    .attr("fill", d => {
      var data = d.properties[unit];
      return data ? fScale(data) : "#ccc";
    });

  // title
  d3.select(".title")
      .text(`Carbon dioxide ${unit.toLowerCase()}, ${year}`);
}