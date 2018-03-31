document.addEventListener("DOMContentLoaded", function() {
  var width = 800;
  var height = 800;
  var padding = 60;
  var minYear = 1990;
  var maxYear = 2012;

  var svg = 
    d3.select("svg")
        .attr("width", width)
        .attr("height", height);

  // axes
  svg
    .append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height - padding})`);

  svg
    .append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(${padding}, 0)`);

  // axis labels
  svg
    .append("text")
      .attr("x", width / 2)
      .attr("dy", height - padding / 5)
      .style("text-anchor", "middle")
      .text("CO2 Emissions (kt per person)");

  svg
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("dy", padding / 5)
      .style("text-anchor", "middle")
      .text("Methane Emissions (kt of CO2 equivalent per person");

  // title
  svg
    .append("text")
      .classed("title", true)
      .attr("x", width / 2)
      .attr("dy", padding)
      .style("text-anchor", "middle")
      .style("font-size", "2.0em");
    
  buildGraph(minYear);

  // year range input
  d3.select("input")
      .property("min", minYear)
      .property("max", maxYear)
      .property("value", minYear)
      .on("input", () => buildGraph(+d3.event.target.value));

  function buildGraph(year) {
    var res = getData(year);
    res.await(function(err, popRes, co2Res, methaneRes, renewRes, urbanPopRes) {
      if (err) throw err;
      
      // get data for each country
      var allData = popRes.map(pop => {
        pop.co2Emissions = co2Res.filter(co2 => co2.countryCode === pop.countryCode)[0].co2Emissions / pop.population;
        pop.methaneEmissions = methaneRes.filter(methane => methane.countryCode === pop.countryCode)[0].methaneEmissions / pop.population;
        pop.renewConsumption = renewRes.filter(renew => renew.countryCode === pop.countryCode)[0].renewConsumption;
        pop.urbanPop = urbanPopRes.filter(uPop => uPop.countryCode === pop.countryCode)[0].urbanPop;
        return pop;
      });
      var data = allData.filter(mustHaveKeys);
      // console.log(`YEAR: ${year}`);
      // console.log(data);

      // scales
      var xScale =
        d3.scaleLinear()
          .domain(d3.extent(data, d => d.co2Emissions))
          .range([padding * 1.7, width - padding * 1.7]);

      var yScale =
        d3.scaleLinear()
          .domain(d3.extent(data, d => d.methaneEmissions))
          .range([height - padding * 1.7, padding * 1.7]);

      var fScale =
        d3.scaleLinear()
          .domain(d3.extent(data, d => d.renewConsumption))
          .range(["black", "green"]);

      var rScale =
        d3.scaleLinear()
          .domain(d3.extent(data, d => d.urbanPop))
          .range([5, 30]);

      // axes
      var xAxis = d3.axisBottom(xScale);

      d3.select(".x-axis")
        .call(xAxis);

      var yAxis = d3.axisLeft(yScale);

      d3.select(".y-axis")
        .call(yAxis);

      // title
      d3.select(".title")
          .text(`Methane vs. CO2 emissions per capita (${year})`);

      // bind data
      var circle =
        svg
          .selectAll("circle")
          .data(data);

      // remove old data
      circle
        .exit()
        .remove();

      // add element for new nodes
      circle
        .enter()
          .append("circle")
        .merge(circle)
          .attr("stroke", "#fff")
          .attr("stroke-width", "0.5px")
        .transition()
        .duration(800)
        .delay((d, i) => i * 2)
        .ease(d3.easeSinIn)
          .attr("cx", d => xScale(d.co2Emissions))
          .attr("cy", d => yScale(d.methaneEmissions))
          .attr("r", d => rScale(d.urbanPop))
          .attr("fill", d => fScale(d.renewConsumption));
    });
  }

  function getData(year) {
    return d3.queue()
      .defer(d3.csv, './data/population.csv', function(row) {
        return {
          country: row["Country Name"],
          countryCode: row["Country Code"],
          population: +row[year]
        };
      })
      .defer(d3.csv, './data/co2-emissions.csv', function(row) {
        return {
          country: row["Country Name"],
          countryCode: row["Country Code"],
          co2Emissions: +row[year]
        };
      })
      .defer(d3.csv, './data/methane-emissions.csv', function(row) {
        return {
          country: row["Country Name"],
          countryCode: row["Country Code"],
          methaneEmissions: +row[year]
        };
      })
      .defer(d3.csv, './data/renewable-energy-consumption.csv', function(row) {
        return {
          country: row["Country Name"],
          countryCode: row["Country Code"],
          renewConsumption: +row[year]
        };
      })
      .defer(d3.csv, './data/urban-population.csv', function(row) {
        return {
          country: row["Country Name"],
          countryCode: row["Country Code"],
          urbanPop: +row[year]
        };
      });
  }

  function mustHaveKeys(obj) {
    var keys = [
      "population",
      "co2Emissions",
      "methaneEmissions",
      "renewConsumption",
      "urbanPop"
    ];
    for (var i = 0; i < keys.length; i++) {
      if (isNaN(obj[keys[i]]) || obj[keys[i]] === 0) return false;
    }
    return true;
  }
});