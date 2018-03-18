d3.select("#reset")
	.on("click", function() {
		d3.select("#phrase")
				.text("");

		d3.select("#count")
				.text("");

		d3.selectAll(".letter")
			.remove();
	});

d3.select("form")
	.on("submit", function() {
		d3.event.preventDefault();
		var input = d3.select("input");
		var text = input.property("value");
		var data = getFrequencies(text);
		var width = 800;
		var height = 400;
		var barPadding = 10;
		var numBars = data.length;
		var barWidth = width / numBars - barPadding;

		var letters = 
			d3.select("#letters")
					.attr("width", width)
					.attr("height", height)
				.selectAll(".letter")
				.data(data, d => d.character);
		var rectangles = letters.select("rect");
		var texts = letters.select("text");
		
		letters
				.classed("new", false)
			.exit()
			.remove();

		var bar =
			letters
				.enter()
				.append("g")
					.classed("letter", true)
					.classed("new", true);
				
		bar.merge(letters)
					.attr("transform", (d,i) => `translate(${i * (barWidth + barPadding)}, 0)`);

		bar.append("rect")
			 .merge(rectangles)
					.attr("width", barWidth)
					.attr("height", d => (d.count / 20 * height))
					.attr("y", d => height - (d.count / 20 * height));

		bar.append("text")
					.attr("text-anchor", "middle")
					.text(d => d.character)
			 .merge(texts)
			 		.attr("x", barWidth / 2)
					.attr("y", d => height - (d.count / 20 * height) - 10);

		d3.select("#phrase")
				.text(`Analysis of: ${text}`);

		d3.select("#count")
				.text(`(New characters: ${letters.enter().nodes().length})`);

		input.property("value", "");
	});

function getFrequencies(str) {
	var sorted = str.split("").sort();
	var data = [];
	for (var i = 0; i < sorted.length; i++) {
		last = data[data.length - 1];
		if (last && last.character === sorted[i]) last.count++;
		else data.push({ character: sorted[i], count: 1 });
	}
	return data;
}