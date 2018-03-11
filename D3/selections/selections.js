// selection methods
d3.select('#page-title');
d3.selectAll('li');

// accessing nodes
d3.selectAll('li').nodes();     // [li, li, li, li]
d3.selectAll('li').node();      // <li>Makes data more engaging.</li>

// update selection property
d3.select('#page-title')
    .style('background-color', '#00feab');

// method chaining
d3.select('#page-title')
    .style('background-color', '#000000')
    .style('color', '#ffffff')
    .attr('class', 'new-class')
    .text('D3 is cool!');

// methods as getters
d3.select('#page-title').text();        // "D3 is cool!"
d3.select('li').style('color');         // rgb(0, 0, 0)

// classed method
d3.select('#page-title')
    .style('background-color', '#000000')
    .style('color', '#ffffff')
    .classed('new-class', true)
    .text('D3 is cool!');