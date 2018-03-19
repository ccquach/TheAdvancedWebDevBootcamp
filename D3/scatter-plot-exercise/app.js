var width = 600;
var height = 600;
var padding = 50;

var data = regionData.filter(mustHaveKeys);

var xScale = 
  d3.scaleLinear()
    .domain(d3.extent(data, d => d.adultLiteracyRate))
    .range([padding, width - padding]);

var yScale =
  d3.scaleLinear()
    .domain(d3.extent(data, d => d.subscribersPer100))
    .range([height - padding, padding]);

var fScale =
  d3.scaleLinear()
    .domain(d3.extent(data, d => d.urbanPopulationRate))
    .range(["green", "blue"]);

var rScale =
  d3.scaleLinear()
    .domain(d3.extent(data, d => d.medianAge))
    .range([5, 30]);

var xAxis = 
  d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0);

var yAxis = 
  d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0);

var svg = d3.select("svg");

// Axes
svg
  .append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

svg
  .append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

// X-axis label
svg
  .append("text")
    .attr("x", width / 2)
    .attr("y", height - padding)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Literacy Rate, Aged 15 and Up");

// Y-axis label
svg
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Cellular Subscribers per 100 People");

// Title
svg
  .append("text")
    .attr("x", width / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .style("font-size", "1.5em")
    .text("Cellular Subscriptions vs. Literacy Rate")

// Data points
svg
  .attr("width", width)
  .attr("height", height)
.selectAll("circle")
.data(data)
.enter()
.append("circle")
  .attr("cx", d => xScale(d.adultLiteracyRate))
  .attr("cy", d => yScale(d.subscribersPer100))
  .attr("r", d => rScale(d.medianAge))
  .attr("fill", d => fScale(d.urbanPopulationRate))
  .attr("stroke", "#fff")
  .attr("stroke-width", "0.5px");

function mustHaveKeys(obj) {
  var keys = [
    "subscribersPer100",
    "adultLiteracyRate",
    "medianAge",
    "urbanPopulationRate"
  ];
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}