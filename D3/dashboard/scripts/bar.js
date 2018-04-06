function drawBars(yearRange) {
  var barSelection =
    d3.select("#bar")
        .attr("width", width)
        .attr("height", height / 2);

  barSelection
    .append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height / 2 - padding / 2})`);

  barSelection
    .append("g")
      .classed("y-axis", true)
      .attr("transform", `translate(${padding - 10}, ${padding / 2})`);

  barSelection
    .append("text")
      .classed("yLabel", true)
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 4)
      .attr("dy", padding / 4 - 9)
      .attr("text-anchor", "middle");

  barSelection
    .append("text")
      .classed("barTitle", true)
      .text("Click on a country to see annual trends.")
      .attr("x", width / 2)
      .attr("y", padding / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em");
}