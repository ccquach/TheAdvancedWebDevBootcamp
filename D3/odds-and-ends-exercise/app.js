d3.queue()
  .defer(d3.csv, './data/co2-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      co2Emissions: +row["2000"]
    };
  })
  .defer(d3.csv, './data/methane-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      methaneEmissions: +row["2000"]
    };
  })
  .await(function(err, co2Res, methaneRes) {
    if (err) throw err;

    // get data for each country
    var data = co2Res.map(co2 => {
      co2.methaneEmissions = methaneRes.filter(methane => methane.countryCode === co2.countryCode)[0].methaneEmissions;
      return co2;
    });
    
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

    // build graph
    var svg = 
      d3.select("svg")
          .attr("width", width)
          .attr("height", height);

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
        .attr("r", "25px")
        .attr("fill", "#000")
        .attr("stroke", "#fff")
        .attr("stroke-width", "0.5px");
  })