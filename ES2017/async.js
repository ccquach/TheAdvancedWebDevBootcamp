// await keyword
async function getMovieData() {
    console.log("starting!");
    var movieData = await $.getJSON('https://omdbapi.com?t=titanic&apikey=thewdb');
    // this line does NOT run until the promise is resolved!
    console.log("all done!");
    console.log(movieData);
}
getMovieData();     // logs an object with data about the movie


// Object async
var movieCollector = {
    data: "titanic",
    async getMovie() {
        var response = await $.getJSON(`https://omdbapi.com?t=${this.data}&apikey=thewdb`);
        console.log(response);
    }
}
movieCollector.getMovie();


// Class async
class MovieData {
    constructor(name) {
        this.name = name;
    }
    async getMovie() {
        var response = await $.getJSON(`https://www.omdbapi.com?t=${this.name}&apikey=thewdb`);
        console.log(response);
    }
}
var m = new MovieData('shrek');
m.getMovie();


// Handling Errors
async function getUser(user) {
    try {
        var response = await $.getJSON(`https://api.github.com/users/${user}`);
        console.log(response.name);
    } catch (e) {
        console.log("User does not exist!");
    }
}``
getUser('elie');    // Elie Schoppik
getUser('foo!!!');  // User does not exist!


// HTTP Requests

// SEQUENTIAL REQUESTS - await promises returned from request
async function getMovieData() {
    var responseOne = await $.getJSON(`https://omdbapi.com?t=titanic&apikey=thewdb`);
    var responseTwo = await $.getJSON(`https://omdbapi.com?t=shrek&apikey=thewdb`);
    console.log(responseOne);
    console.log(responseTwo);
}
getMovieData();

// Refactor: PARALLEL REQUESTS
async function getMovieData() {
    var titanicPromise = $.getJSON(`https://omdbapi.com?t=titanic&apikey=thewdb`);
    var shrekPromise = $.getJSON(`https://omdbapi.com?t=shrek&apikey=thewdb`);

    var titanicData = await titanicPromise;
    var shrekData = await shrekPromise;

    console.log(titanicData);
    console.log(shrekData);
}
getMovieData();


// Await with Promise.all
async function getMovieData(first, second) {
    var movieList = await Promise.all([
        $.getJSON(`https://omdbapi.com?t=${first}&apikey=thewdb`),
        $.getJSON(`https://omdbapi.com?t=${second}&apikey=thewdb`)
    ]);
    console.log(movieList[0].Year);
    console.log(movieList[1].Year);
}
getMovieData('shrek', 'blade');

// 2001
// 1998
