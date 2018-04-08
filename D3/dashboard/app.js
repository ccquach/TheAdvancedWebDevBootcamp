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
    
    var allData = formatData(emissionsData);
    var yearRange = d3.extent(allData, d => d.year);
    var geoData = topojson.feature(mapData, mapData.objects.countries).features;

    // get continents for pie chart color scale
    var continents = [];
    for (var i = 0; i < allData.length; i++) {
      var continent = allData[i].continent;
      if (!continents.includes(continent)) continents.push(continent);
    }
    
    yearInput
      .property("min", yearRange[0])
      .property("max", yearRange[1])
      .property("value", yearRange[0])
      .on("input", () => graph(+d3.event.target.value, getInputValues()[1]));

    unitInput
      .on("click", () => graph(getInputValues()[0], d3.event.target.value));

    // initial graphs
    drawBars(yearRange);
    drawMap(yearRange, allData, geoData);
    drawPie(allData)
    graph(yearRange[0], unitInput.property("value"));

    function graph(year, unit) {
      var yearData = allData.filter(d => d.year === year);
      var geoData = topojson.feature(mapData, mapData.objects.countries).features;

      updateMap(year, unit, yearData, geoData);
      updatePie(year, continents, yearData);

      var selectedCountry = d3.select(".selected");
      if (selectedCountry.node()) {
        var countryData = allData.filter(d => d.countryCode === selectedCountry.attr("id"));
        updateBars(countryData, true, yearRange, geoData);
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
      var data = d[unit] ? d[unit] : d.properties[unit];
      var dataStr = "";
      if (data) dataStr = `${data.toLocaleString()} ${unit === "Emissions" ? "thousand metric tons" : "metric tons per capita"}`;
      else dataStr = "Data Not Available";
      return `
        <p>Country: ${d.country ? d.country : d.properties.country}</p>
        <p>${unit}: ${dataStr}</p>
        <p>Year: ${d.year ? d.year : d.properties.year}</p>
      `
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