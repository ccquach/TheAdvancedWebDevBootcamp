d3.queue()
  .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  .defer(d3.csv, "./data/all_data.csv", function(row) {
    return {
      country: row.Country,
      countryCode: row["Country Code"],
      continent: row.Continent,
      region: row.Region,
      year: +row.Year,
      perCapita: +row["Emissions Per Capita"],
      total: +row.Emissions
    };
  })
  .await(function(error, mapData, emissionsData) {
    if (error) throw error;
    
    var yearRange = d3.extent(emissionsData, d => d.year);
    
    var yearInput = d3.select('input[type="range"]');
    var unitInput = d3.selectAll('input[type="radio"]');

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

      updateMap(year, unit, yearData, geoData);
    }
    
    function getInputValues() {
      var unit = unitInput.nodes().filter(d => d.checked)[0].value;
      var year = +yearInput.property("value");
      return [year, unit];
    }
  });