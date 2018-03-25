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

var tooltip =
  d3.select("body")
    .append("div")
      .classed("tooltip", true);

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
  .attr("stroke-width", "0.5px")
  .on("mousemove", showTooltip)
  .on("touchstart", showTooltip)
  .on("mouseout", hideTooltip)
  .on("touchend", hideTooltip);

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

function showTooltip(d) {
  tooltip
    .style("opacity", 1)
    .style("left", d3.event.x - (tooltip.node().offsetWidth / 2) + "px")
    .style("top", d3.event.y + 25 + "px")
    .html(`
      <p>Region: ${d.region}</p>
      <p>Subscribers per 100: ${d.subscribersPer100}</p>
      <p>Adult Literacy Rate: ${d.adultLiteracyRate}</p>
    `);
}

function hideTooltip() {
  tooltip
    .style("opacity", 0);
}