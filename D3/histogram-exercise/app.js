var width = 800;
var height = 500;
var barPadding = 1;
var padding = 80;
var data = regionData.filter(mustHaveKeys);

var xScale =
  d3.scaleLinear()
    .domain(d3.extent(data, d => d.medianAge))
    .rangeRound([padding, width - padding]);

var histogram = 
  d3.histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks())
      .value(d => d.medianAge);

var bins = histogram(data);

var yScale =
  d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - padding, padding]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

var svg = d3.select("svg");

svg
  .append("g")
    .attr("id", "xAxis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

svg
  .append("g")
    .classed("id", "yAxis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

svg
  .append("text")
    .attr("x", width / 2)
    .attr("y", height - padding)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Median Age");
    
svg
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Frequency");

svg
  .append("text")
  .attr("id", "count")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", "4.5em")
  .style("text-anchor", "middle")
  .text(`Number of bins: ${bins.length}`);

var bars =
  svg
      .attr("width", width)
      .attr("height", height)
    .selectAll(".bar")
    .data(bins)
    .enter()
    .append("rect")
      .classed("bar", true)
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("height", d => height - yScale(d.length) - padding)
      .attr("width", d => {
        var width = xScale(d.x1) - xScale(d.x0) - barPadding;
        return width < 0 ? 0 : width;
      })
      .attr("fill", "#0000ff");

d3.select("input")
    .property("min", 1)
    .property("max", 62)
    .property("value", xScale.ticks().length)
    .on("input", function() {
      var numBins = +d3.event.target.value;
      var ticks = xScale.ticks(numBins);
      histogram.thresholds(ticks);
      bins = histogram(data);
      yScale.domain([0, d3.max(bins, d => d.length)]);
      yAxis = d3.axisLeft(yScale);

      xAxis.tickValues(ticks);
      svg
        .select("#xAxis")
          .attr("transform", `translate(0, ${height - padding})`)
          .call(xAxis);

      svg
        .select("#yAxis")
          .attr("transform", `translate(${padding}, 0)`)
          .call(yAxis);

      svg
        .select("#count")
        .text(`Number of bins: ${bins.length}`);

      bars =
        d3.select("svg")
          .selectAll(".bar")
          .data(bins);

      bars
        .exit()
        .remove();

      bars
        .enter()
        .append("rect")
          .classed("bar", true)
        .merge(bars)
          .attr("x", d => xScale(d.x0))
          .attr("y", d => yScale(d.length))
          .attr("height", d => height - yScale(d.length) - padding)
          .attr("width", d => {
            var width = xScale(d.x1) - xScale(d.x0) - barPadding;
            return width < 0 ? 0 : width;
          })
          .attr("fill", "#0000ff");
    });

function mustHaveKeys(obj) {
  var keys = [
    "medianAge"
  ];
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}