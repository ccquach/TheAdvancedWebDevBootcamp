d3.select("form")
	.on('submit', function() {
		d3.event.preventDefault();

		// get new letters
		let input = d3.select("input");
		let word = input.property("value");

		let lettersArray = Array.from(word);

		// id old letters
		updateOldLetters(lettersArray);

		// convert array to object to letter count
		let letters = lettersArray.reduce(function(acc, next) {
			if (next in acc) {
				acc[next]++;
			} else {
				acc[next] = 1;
			}
			return acc;
		}, {});

		setPhrase(word);
		chartLetters(word, letters);		
		setCount();
		input.property("value", "");
	});

function updateOldLetters(arr) {
	// compare new to old letters
	d3.selectAll(".letter")
		.data(arr, d => d)
		.exit()
		.remove();

	// remove 'new' class from matching old letters
	d3.selectAll(".letter.new")
		.classed("new", false);
}

function setPhrase(word) {
	let phrase = d3.select("#phrase");
	phrase.text(`Analysis of: ${word}`);
}

function setCount() {
	let count = document.getElementsByClassName("new").length;
	let countDisplay = d3.select("#count");
	countDisplay.text(`(New characters: ${count})`);
}

function chartLetters(word, letters) {
	let lettersArray = Object.keys(letters).sort();
	
	var lettersSelection = d3.select("#letters")
		.selectAll(".letter")
		.data(lettersArray, d => d);

	lettersSelection
		.enter()
		.append("div")
			.classed("letter new", true)
			.merge(lettersSelection)
				.text(d => d)
				.style("width", "20px")
				.style("line-height", "20px")
				.style("margin-right", "5px")
				.style("height", d => (letters[d] * 20) + "px");
}

d3.select("#reset")
	.on('click', function() {
		d3.select("#phrase")
			.text("");

		d3.select("#count")
			.text("");

		d3.selectAll(".letter")
			.remove();
	});