// callback invoked once for each element in selection
d3.selectAll('li')
    .style('font-size', function() {
        return Math.random() * 40 + 'px';
    });

// callback structure
d3.selectAll('li')
    .style('background-color', function(_, idx) {
        return idx % 2 === 0 ? 'lightgrey' : 'white';
		});
		
// method chaining
d3.select('.outer')
		.style('color', 'purple')
	.select('div')
		.style('font-size', '30px')
		.style('background-color', 'orange')
	.select('div')
		.style('border', '8px solid blue');