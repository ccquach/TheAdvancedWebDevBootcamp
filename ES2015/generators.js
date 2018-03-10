function* pauseAndReturnValues(num) {
    for (let i = 0; i < num; i++){
        yield i;
    }
}

var gen = pauseAndReturnValues(5);
gen.next(); // {value: 0, done: false}
gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: 3, done: false}
gen.next(); // {value: 4, done: false}
gen.next(); // {value: undefined, done: true}

// multiple yield keywords
function* printValues() {
    yield "First";
    yield "Second";
    yield "Third";
}

var g = printValues();
g.next().value; // "First"
g.next().value; // "Second"
g.next().value; // "Third"

// iterating over generator
for (val of pauseAndReturnValues(3)) {
    console.log(val);
}

// 0
// 1
// 2

// async generators
function* getMovieData(movieName) {
    console.log('starting');
    yield $.getJSON(`https://omdbapi.com?t=${movieName}&apikey=thewdb`);
    console.log('ending');
}

var movieGetter = getMovieData('titanic');
movieGetter.next().value.then(val => console.log(val));