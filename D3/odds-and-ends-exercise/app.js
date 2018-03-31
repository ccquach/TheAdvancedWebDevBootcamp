d3.queue()
  .defer(d3.csv, './data/population.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      population: +row["1990"]
    }
  })
  .defer(d3.csv, './data/co2-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      co2Emissions: +row["1990"]
    };
  })
  .defer(d3.csv, './data/methane-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      methaneEmissions: +row["1990"]
    };
  })
  .defer(d3.csv, './data/renewable-energy-consumption.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      renewConsumption: +row["1990"]
    };
  })
  .defer(d3.csv, './data/urban-population.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      urbanPop: +row["1990"]
    };
  })
  .await(function(err, popRes, co2Res, methaneRes, renewRes, urbanPopRes) {
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
    console.log(data);
    // plot data
    var width = 600;
    var height = 600;
    var padding = 50;

    // scales
    var xScale =
      d3.scaleLinear()
        .domain(d3.extent(data, d => d.co2Emissions))
        .range([padding, width - padding]);

    var yScale =
      d3.scaleLinear()
        .domain(d3.extent(data, d => d.methaneEmissions))
        .range([height - padding, padding]);

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

    var yAxis = d3.axisLeft(yScale);

    // build graph
    var svg = 
      d3.select("svg")
          .attr("width", width)
          .attr("height", height);

    // axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - padding})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxis);

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
        .attr("cx", d => xScale(d.co2Emissions))
        .attr("cy", d => yScale(d.methaneEmissions))
        .attr("r", d => rScale(d.urbanPop))
        .attr("fill", d => fScale(d.renewConsumption))
        .attr("stroke", "#fff")
        .attr("stroke-width", "0.5px");
  })

  function mustHaveKeys(obj) {
    var keys = [
      "co2Emissions",
      "methaneEmissions",
      "renewConsumption",
      "urbanPop"
    ];
    for (var i = 0; i < keys.length; i++) {
      if (isNaN(obj[keys[i]])) return false;
    }
    return true;
  }