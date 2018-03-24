var width = 800;
var height = 600;
var barPadding = 1;
var padding = 80;
var data = regionData.filter(d => d.medianAge !== null);
var initialBinCount = 16;

var svg = 
  d3.select("svg")
      .attr("width", width)
      .attr("height", height);
      
svg
  .append("g")
    .attr("id", "xAxis")
    .attr("transform", `translate(0, ${height - padding})`);
    
svg
  .append("g")
    .attr("id", "yAxis")
    .attr("transform", `translate(${padding}, 0)`);

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
    .text(`Number of bins: ${initialBinCount}`);

updateRects(initialBinCount);

d3.select("input")
    .property("value", initialBinCount)
    .on("input", function() {
      updateRects(+d3.event.target.value);
    });
      
function updateRects(val) {
  var xScale =
    d3.scaleLinear()
      .domain(d3.extent(data, d => d.medianAge))
      .rangeRound([padding, width - padding]);

  var ticks = xScale.ticks(val);
  
  var histogram = 
    d3.histogram()
      .domain(xScale.domain())
      .thresholds(ticks)
      .value(d => d.medianAge);
  
  var bins = histogram(data);
  
  var yScale =
    d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height - padding, padding]);
  
  d3.select("#xAxis")
      .call(
        d3.axisBottom(xScale)
          .tickValues(ticks)
      );
  
  d3.select("#yAxis")
      .call(d3.axisLeft(yScale));
  
  d3.select("#count")
      .text(`Number of bins: ${bins.length}`);
  
  var bars =
    svg
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
}