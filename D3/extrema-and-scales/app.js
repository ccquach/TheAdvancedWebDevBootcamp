var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;
var barPadding = 10;
var numBars = 12;
var barWidth = width / numBars - barPadding;
var maxBirths = d3.max(birthData, d => d.births);
var yScale = d3.scaleLinear()
               .domain([0, maxBirths])
               .range([height, 0]);

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter(d => d.year === minYear))
  .enter()
  .append("rect")
    .attr("width", barWidth)
    .attr("height", d => height - yScale(d.births))
    .attr("y", d => yScale(d.births))
    .attr("x", (d,i) => (barWidth + barPadding) * i)
    .attr("fill", "purple");

d3.select("input")
    .on("input", function() {
      var year = +d3.event.target.value;
      d3.selectAll("rect")
        .data(birthData.filter( d => d.year === year))
          .attr("height", d => height - yScale(d.births))
          .attr("y", d => yScale(d.births));
    });