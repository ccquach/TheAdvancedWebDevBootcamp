var width = 700;
var height = 600;
var padding = 80;

var yearInput = d3.select('input[type="range"]');
var unitInput = d3.selectAll('input[type="radio"]');

d3.queue()
  .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  .defer(d3.csv, "./data/all_data.csv", function(row) {
    return {
      country: row.Country,
      countryCode: row["Country Code"],
      continent: row.Continent,
      region: row.Region,
      year: +row.Year,
      "Emissions Per Capita": +row["Emissions Per Capita"],
      Emissions: +row.Emissions
    };
  })
  .await(function(error, mapData, emissionsData) {
    if (error) throw error;

    // get country names
    var countryNames = 
      d3.nest()
        .key(d => d.countryCode)
        .rollup(v => v[0].country)
        .entries(emissionsData);
    
    var yearRange = d3.extent(emissionsData, d => d.year);
    
    yearInput
      .property("min", yearRange[0])
      .property("max", yearRange[1])
      .property("value", yearRange[0])
      .on("input", () => graph(+d3.event.target.value, getInputValues()[1]));

    unitInput
      .on("click", () => graph(getInputValues()[0], d3.event.target.value));

    // graphs setup
    drawBars(yearRange);
    drawMap();

    var geoData = topojson.feature(mapData, mapData.objects.countries).features;

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
        .attr("d", path)
        .on("mousemove touchmove", showTooltip)
        .on("mouseout touchend", hideTooltip)
        .on("click", updateBars);
    
    // initial graphs
    graph(yearRange[0], unitInput.property("value"));
    
    function graph(year, unit) {
      var yearData = emissionsData.filter(d => d.year === year);

      countryNames.forEach(row => {
        var countries = geoData.filter(d => d.id === row.key);
        countries.forEach(country => {
          country.properties.country = row.value;
          country.properties.year = year;
        });
      });
      
      updateMap(year, unit, yearData, geoData);
    }
    
    function updateBars(d) {
      var barPadding = 0.25;
      var numBars = yearRange[1] - yearRange[0] + 1;
      var barWidth = (width - 2 * padding) / numBars - barPadding;
      var year = getInputValues()[0];
      var unit = getInputValues()[1];
      var country = d.properties.country;
      var countryData = emissionsData.filter(d => d.country === country).sort((a, b) => d3.ascending(a.year, b.year));

      var xScale =
        d3.scaleLinear()
          .domain(yearRange)
          .range([padding, width - padding]);

      var yScale =
        d3.scaleLinear()
          .domain([0, d3.max(countryData, d => d[unit])])
          .range([height / 2 - padding, 0]);
      
      // var yScale = 
      //   d3.scaleLinear()
      //     .range([0, height / 2 - padding]);

      d3.select(".x-axis")
        .call(
          d3.axisBottom(xScale)
            .tickFormat(d3.format("d"))
        );

      // d3.select(".y-axis")
      //   .call(
      //     d3.axisLeft(yScale)
      //       .ticks(0)
      //   );
      
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
          .attr("y", height / 2 - padding / 2)
          .attr("x", d => xScale(d.year) - 10)
          .attr("width", barWidth)
          .attr("height", 0)
        .merge(barUpdate)
          .transition()
          .duration(750)
          .delay((d, i) => i * 100)
          .ease(d3.easeBounceOut)
          .attr("height", d => height / 2 - padding - yScale(d[unit]))
          .attr("y", d => yScale(d[unit]) + padding / 2)
          .attr("fill", d => {
            return d.year === year ? "#009973" : "#00cc99";
          })
    }
  });

function getInputValues() {
  var year = +yearInput.property("value");
  var unit = unitInput.nodes().filter(d => d.checked)[0].value;
  return [year, unit];
}

function showTooltip(d) {
  var unit = getInputValues()[1];
  var tooltip = d3.select(".tooltip");
  tooltip
    .style("opacity", 1)
    .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
    .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px")
    .html(() => {
      var data = d.properties[unit];
      var dataStr = "";
      if (data) dataStr = `${data.toLocaleString()} ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`;
      else dataStr = "Data Not Available";
      return `
        <p>Country: ${d.properties.country}</p>
        <p>${unit}: ${dataStr}</p>
        <p>Year: ${d.properties.year}</p>
      `
    });
}

function hideTooltip() {
  d3.select(".tooltip")
      .style("opacity", 0);
}