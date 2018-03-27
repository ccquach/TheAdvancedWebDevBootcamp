var width = 600;
var height = 600;
var barPadding = 1;
var padding = 20;
var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);

var bars = 
  d3.select("svg")
      .attr("width", width)
      .attr("height", height);

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("input", function() {
      buildGraph(+d3.event.target.value);
    });

buildGraph(minYear);

function buildGraph(year) {
  var yearData = birthData.filter(d => d.year === year);

  var xScale =
    d3.scaleLinear()
      .domain([0, d3.max(yearData, d => d.births)])
      .rangeRound([padding, width - padding]);
  
  var histogram = 
    d3.histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks())
      .value(d => d.births);
  
  var bins = histogram(yearData);
  
  var yScale = 
    d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height, 0]);

  bars =
    d3.select("svg")
      .selectAll(".bar")
      .data(bins);

  bars
    .exit()
    .remove();

  var g =
    bars
      .enter()
      .append("g")
        .classed("bar", true);

  g.append("rect");
  g.append("text");

  g.merge(bars)
      .select("rect")
        .attr("x", (d,i) => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("height", d => height - yScale(d.length))
        .attr("width", d => {
          var width = xScale(d.x1) - xScale(d.x0) - barPadding;
          return width < 0 ? 0 : width;
        })
        .attr("fill", "#9c27b0");

  g.merge(bars)
      .select("text")
        .text(d => `${d.x0} - ${d.x1} (bar height: ${d.length})`)
        .attr("transform", "rotate(-90)")
        .attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
        .attr("x", -height + 10)
        .style("alignment-baseline", "middle");

  g.merge(bars)
      .attr("transform", `rotate(90, ${width / 2}, ${height / 2})`)
}