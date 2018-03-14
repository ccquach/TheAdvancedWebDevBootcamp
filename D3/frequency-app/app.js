d3.select("form")
	.on('submit', function() {
		d3.event.preventDefault();

		let word = d3.select("input")
			.property("value");

		let letters = Array.from(word).reduce(function(acc, next) {
			if (next in acc) {
				acc[next]++;
			} else {
				acc[next] = 1;
			}
			return acc;
		}, {});

		setPhrase(word);
		setCount(letters);
		chartLetters(word, letters);
	});

function setPhrase(word) {
	let phrase = d3.select("#phrase");
	phrase.text(`Analysis of: ${word}`);
}

function setCount(word) {
	let count = d3.select("#count");
	count.text(`(New characters: ${word.length})`);			// modify to count var
}

function chartLetters(word, letters) {
	let letterArray = let		// create array from letters obj keys

	d3.select("#letters")
		.selectAll("div")
		.data(letters)
		.enter()
		.append("div")
			.classed("letter new", true)
			.text(d => d.letter)
			.style("width", "20px")
			.style("line-height", "20px")
			.style("margin-right", "5px")
			.style("height", d => d.count * 20 + "px");
}