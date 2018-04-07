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
      .on("click", () => {
        graph(getInputValues()[0], d3.event.target.value);
        // updateBars(d, emissionsData, getInputValues()[0], getInputValues()[1], yearRange);
      });

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
        .attr("id", d => d.id)
        .attr("d", path)
        .on("mousemove touchmove", showTooltip)
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
          
          var countryData = emissionsData.filter(e => e.countryCode === d.properties.countryCode);
          
          updateBars(countryData, !selected, emissionsData, yearRange, geoData);
        });
    
    // initial graphs
    graph(yearRange[0], unitInput.property("value"));
    
    function graph(year, unit) {
      var yearData = emissionsData.filter(d => d.year === year);

      countryNames.forEach(row => {
        var countries = geoData.filter(d => d.id === row.key);
        countries.forEach(country => {
          country.properties.country = row.value;
          // country.properties.year = year;
        });
      });
      updateMap(year, unit, yearData, geoData);

      var selectedCountry = d3.select(".selected");
      if (selectedCountry.node()) {
        var countryData = emissionsData.filter(d => d.countryCode === selectedCountry.attr("id"));
        updateBars(countryData, true, emissionsData, yearRange, geoData);
      }        
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
        <p>Year: ${getInputValues()[0]}</p>
      `
    });
}

function hideTooltip() {
  d3.select(".tooltip")
      .style("opacity", 0);
}