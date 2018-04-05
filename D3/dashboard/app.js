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

    var width = 960;
    var height = 600;
    var yearRange = d3.extent(emissionsData, d => d.year);
    
    var projection =
      d3.geoMercator()
        .scale(125)
        .translate([width / 2, height / 1.4]);

    var path =
      d3.geoPath()
        .projection(projection);

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

    var yearInput = d3.select('input[type="range"]');
    var unitInput = d3.selectAll('input[type="radio"]');

    yearInput
      .property("min", yearRange[0])
      .property("max", yearRange[1])
      .property("value", yearRange[0])
      .on("input", () => {
        updateMap(+d3.event.target.value, getInputValues()[1]);
      });

    unitInput
      .on("click", () => updateMap(getInputValues()[0], d3.event.target.value));
    
    updateMap(yearRange[0], getInputValues()[1]);
    
    function getInputValues() {
      var unit = unitInput.nodes().filter(d => d.checked)[0].value;
      var year = +yearInput.property("value");
      return [year, unit];
    }

    function updateMap(year, unit) {
      var yearData = emissionsData.filter(d => d.year === year);
      var geoData = topojson.feature(mapData, mapData.objects.countries).features;
      
      yearData.forEach(row => {
        var countries = geoData.filter(d => d.id === row.countryCode);
        countries.forEach(country => country.properties = row);
      });

      mapSelection
        .selectAll(".country")
        .data(geoData)
        .enter()
        .append("path")
          .classed("country", true)
          .attr("d", path);

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
          .text(`Carbon dioxide emissions${unit === "perCapita" ? " per capita" : ""}, ${year}`);
    }
  });