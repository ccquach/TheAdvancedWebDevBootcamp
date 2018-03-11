// add event listener
d3.select('h1').on('click', function() {
    console.log('Event listeners are sweet!');
});

// remove event listener
d3.select('h1').on('click', null);