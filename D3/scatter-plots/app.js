var width = 500;
var height = 500;
var padding = 20;

// life expectancy
var yScale = d3.scaleLinear()
               .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
							 .range([height - padding, padding]);
// births per capita
var xScale = d3.scaleLinear()
							 .domain(d3.extent(birthData2011, d => d.births / d.population))
							 .range([padding, width - padding]);
// population density
var colorScale = d3.scaleLinear()
									 .domain(d3.extent(birthData2011, d => d.population / d.area))
									 .range(['lightgreen', 'black']);
// births
var radiusScale = d3.scaleLinear()
										.domain(d3.extent(birthData2011, d => d.births))
										.range([2, 40]);

d3.select("svg")
		.attr("width", width)
		.attr("height", height)
	.selectAll("circle")
	.data(birthData2011)
	.enter()
	.append("circle")
		.attr("cx", d => xScale(d.births / d.population))
		.attr("cy", d => yScale(d.lifeExpectancy))
		.attr("fill", d => colorScale(d.population / d.area))
		.attr("r", d => radiusScale(d.births));