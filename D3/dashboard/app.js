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
    var countriesData = 
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

    // initial graphs
    drawMap();
    graph(yearRange[0], unitInput.property("value"));
    
    function graph(year, unit) {
      var yearData = emissionsData.filter(d => d.year === year);
      var geoData = topojson.feature(mapData, mapData.objects.countries).features;

      countriesData.forEach(row => {
        var countries = geoData.filter(d => d.id === row.key);
        countries.forEach(country => {
          country.properties.country = row.value;
          country.properties.year = year;
        });
      });
      
      updateMap(year, unit, yearData, geoData);
    }
  });

var yearInput = d3.select('input[type="range"]');
var unitInput = d3.selectAll('input[type="radio"]');

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