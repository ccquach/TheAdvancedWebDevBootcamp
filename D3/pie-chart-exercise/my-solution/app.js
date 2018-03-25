var width = 600;
var height = 600;
var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var quarters = ["Q1", "Q2", "Q3", "Q4"];

var outerColorScale =
  d3.scaleOrdinal()
    .domain(months)
    .range(d3.schemeCategory20c);

var innerColorScale =
  d3.scaleOrdinal()
    .domain(quarters)
    .range(d3.schemeCategory10);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .classed("chart", true)
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

d3.select("input")
    .attr("min", minYear)
    .attr("max", maxYear)
    .attr("value", minYear)
  .on("input", function() {
    makeGraph(+d3.event.target.value);
  });

makeGraph(minYear);

function makeGraph(year) {
  var yearData = birthData.filter(d => d.year === year);
  var quarterData = getQuarterData(yearData);
  
  var outerArcs = 
    d3.pie()
      .value(d => d.births)
      .sort((a,b) => months.indexOf(a.month) - months.indexOf(b.month))
      (yearData);

  var outerPath =
    d3.arc()
      .innerRadius(width / 4)
      .outerRadius(width / 2 - 10);

  var outerUpdate =
    d3.select(".chart")
      .selectAll(".outerArc")
      .data(outerArcs);

  outerUpdate
    .exit()
    .remove();

  outerUpdate
    .enter()
    .append("path")
      .classed("outerArc", true)
    .merge(outerUpdate)
      .attr("fill", d => outerColorScale(d.data.month))
      .attr("d", outerPath);

  var innerArcs = 
    d3.pie()
      .value(d => d.births)
      .sort((a,b) => months.indexOf(a.month) - months.indexOf(b.month))
      (quarterData);

  var innerPath =
    d3.arc()
      .innerRadius(0)
      .outerRadius(width / 4);

  var innerUpdate =
    d3.select(".chart")
      .selectAll(".innerArc")
      .data(innerArcs);

  innerUpdate
    .exit()
    .remove();

  innerUpdate
    .enter()
    .append("path")
      .classed("innerArc", true)
    .merge(innerUpdate)
      .attr("fill", d => innerColorScale(d.data.quarter))
      .attr("d", innerPath);

  d3.select(".title")
      .text(`Births by months and quarter for ${year}`);
}

function getQuarterData(yearData) {
  return yearData.reduce((acc, next, idx) => {
    var month = yearData[idx]["month"];
    var births = yearData[idx]["births"];
    if (months.indexOf(month) < 3) acc[0]["births"] += births;
    else if (months.indexOf(month) < 6) acc[1]["births"] += births
    else if (months.indexOf(month) < 9) acc[2]["births"] += births
    else acc[3]["births"] += births;
    return acc;
  }, [
    {
      "quarter": "Q1",
      "births": 0
    },
    {
      "quarter": "Q2",
      "births": 0
    },
    {
      "quarter": "Q3",
      "births": 0
    },
    {
      "quarter": "Q4",
      "births": 0
    }
  ]);
}