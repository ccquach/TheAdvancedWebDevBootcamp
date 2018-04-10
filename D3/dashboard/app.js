var width = d3.select(".group").node().offsetWidth;
var height = 500;

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
    
    var allData = formatData(emissionsData);
    var yearRange = d3.extent(allData, d => d.year);
    var currentYear = yearRange[0];
    var currentUnit = d3.select('input[name="unit"]:checked').attr("value");
    var geoData = topojson.feature(mapData, mapData.objects.countries).features;
    
    // get continents for pie chart color scale
    var continents = [];
    for (var i = 0; i < allData.length; i++) {
      var continent = allData[i].continent;
      if (!continents.includes(continent)) continents.push(continent);
    }
    
    // input setup
    d3.select("#year")
      .property("min", yearRange[0])
      .property("max", yearRange[1])
      .property("value", yearRange[0])
      .on("input", () => {
        currentYear = +d3.event.target.value;
        graph(currentYear, currentUnit);
      });

    d3.selectAll('input[name="unit"]')
      .on("change", () => {
        currentUnit = d3.event.target.value;
        graph(currentYear, currentUnit);
      });

    // initial graphs
    drawBars(yearRange, currentUnit);
    drawMap(currentYear, currentUnit, geoData);
    drawPie(allData)
    graph(yearRange[0], currentUnit);

    function graph(year, unit) {
      // update header current year
      d3.select(".current-year")
          .text(`Current Year: ${year}`);
      // get year data
      var yearData = allData.filter(d => d.year === year);
      // update charts
      updateMap(year, unit, yearRange, yearData, geoData, allData);
      updatePie(year, continents, yearData);
      
      var selectedCountry = d3.select(".selected");
      var countryData = selectedCountry.node() ? allData.filter(d => d.countryCode === selectedCountry.attr("id")) : [];
      updateBars(year, unit, countryData, true, yearRange);
    }
  });

function showTooltip(d, unit, pct) {
  var tooltip = d3.select(".tooltip");
  tooltip
    .style("opacity", 1)
    .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
    .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px")
    .html(() => {
      var data = d[unit];
      var dataStr = "";
      if (data) dataStr = `${data.toLocaleString()} ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`;
      else dataStr = "Data Not Available";

      var tooltipStr = `
        <p>Country: ${d.country}</p>
        <p>${unit}: ${dataStr}</p>
        <p>Year: ${d.year}</p>
      `
      if (pct) tooltipStr += `Percentage of total: ${(pct * 100).toFixed(2)}%`;
      return tooltipStr;
    });
}

function hideTooltip() {
  d3.select(".tooltip")
      .style("opacity", 0);
}

function formatData(data) {
  // get years
  var yearNest =
    d3.nest()
      .key(d => d.year)
      .entries(data);

  var years = yearNest.reduce((acc, next) => {
    acc.push(+next.key);
    return acc;
  }, []);

  // get countries
  var countryNest = 
      d3.nest()
        .key(d => d.country)
        .entries(data);

  // loop thru each country
  for (country in countryNest) {
    var countryData = data.filter(d => d.country === countryNest[country].key);
    // add object to array for missing years of a country
    if (countryData.length !== years.length) {
      // create empty country object
      var countryObj = Object.assign({}, countryData[0]);
      delete countryObj["Emissions"];
      delete countryObj["Emissions Per Capita"];
      delete countryObj.year;
      
      // get years country already has
      var countryYears = countryData.reduce((acc, next) => {
        acc.push(+next.year);
        return acc;
      }, []);

      for (var i = 0; i < years.length; i++) {
        // create new object for missing country year
        if (!countryYears.includes(years[i])) {
          var newCountryObj = Object.assign({ year: years[i] }, countryObj);
          data.push(newCountryObj);
        }
      }
    }
  }
  return data;
}