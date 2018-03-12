document.addEventListener('DOMContentLoaded', function() {
  var input = d3.select('input');
  var preview = d3.select(".preview");

  d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
      setPreview("");
    });

  // preview note
  d3.select("input")
    .on('input', function() {
      var note = d3.event.target.value;
      setPreview(note);
    });

  // delete all notes
  d3.select("#delete")
    .on('click', function() {
      d3.selectAll(".note")
        .remove();
    });

  // random note font colors
  d3.select("#lucky")
    .on('click', function() {
      d3.selectAll(".note")
          .style("color", function() {
            return getRandomColor();
          });
    })

  function setPreview(val) {
    preview.text(val)
        .classed("hide", val === "");
  }
  
  function getRandomColor() {
    var randVals = [];
    for (let i = 0; i < 3; i++) {
      randVals.push(Math.floor(Math.random() * 256));
    }
    return `rgb(${randVals[0]}, ${randVals[1]}, ${randVals[2]})`
  }
});