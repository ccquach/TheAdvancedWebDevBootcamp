// Native Promise constructor
function displayAtRandomTime() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (Math.random() > 0.5) {
                resolve('Yes!');
            } else {
                reject('No!');
            }
        }, 1000);
    });
}

displayAtRandomTime()
.then(function(value) {
    console.log(value);
})
.catch(function(error) {
    console.log(error);
});


// Returning Promises (jQuery)
var years = [];
$.getJSON('https://omdbapi.com?t=titanic&apikey=thewdb')
.then(function(movie) {
    years.push(movie.Year);
    return $.getJSON('https://omdbapi.com?t=shrek&apikey=thewdb');
})
.then(function(movie) {
    years.push(movie.Year);
    console.log(years);
});
console.log('ALL DONE!');

// "ALL DONE!"
// ["1997", "2001"]


// Promise.all method
function getMovie(title) {
    return $.getJSON(`https://omdbapi.com?t=${title}&apikey=thewdb`);
}
var titanicPromise = getMovie('titanic');
var shrekPromise = getMovie('shrek');
var braveheartPromise = getMovie('braveheart');

Promise.all([titanicPromise, shrekPromise, braveheartPromise])
.then(function(movies) {
    return movies.forEach(function(movie) {
        console.log(movie.Year);
    });
});


// ========== EXERCISES ==========
/* 
1. Write a function called getMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a promise, which when resolved, returns a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log(data)
});
 
// "Colt has the most followers with 424" 
*/

// SOLUTION
function getMostFollowers(...usernames) {
    let baseUrl = 'https://api.github.com/users/';
    let urls = usernames.map((username => $.getJSON(baseUrl + username)));
    return Promise.all(urls).then(function(data) {
        let max = data.sort((a, b) => a.followers < b.followers)[0];
        return `${max.name} has the most followers with ${max.followers}`;
    });
}

// MY SOLUTION
function getMostFollowers(...users) {
    var promises = [];
    var mostUser = '';
    var mostFollows = 0;
    users.forEach((user) => promises.push($.getJSON(`https://api.github.com/users/${user}`)));
    return Promise.all(promises)
    .then(function(users) {
        users.forEach(function(user) {
            if (user.followers > mostFollows) {
                mostUser = user.login;
                mostFollows = user.followers;
            }
        })
        return `${mostUser} has the most followers with ${mostFollows}`;
    });
}

/*
2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

starWarsString(1).then(function(data){
    console.log(data)
})
 
// "Luke Skywalker"
*/

function starWarsString(id) {
    return $.getJSON(`https://swapi.co/api/people/${id}`)
    .then(function(char) {
        return char.name;
    });
}

/*
Bonus 1 -  Using the data from the previous AJAX call above, make another AJAX request to get the first film that character is featured in and return a promise that when resolved will console.log the name of the character and the film they are featured in 

starWarsString(1).then(function(data){
    console.log(data)
})
 
// "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner"
*/

function starWarsString(id) {
    var str = '';
    return $.getJSON(`https://swapi.co/api/people/${id}`)
    .then(function(char) {
        str += `${char.name} is featured in `;
        return $.getJSON(char.films[0]);
    })
    .then(function(film) {
        str += `${film.title}, directed by ${film.director}`;
        return str;
    });
}

/*
Bonus 2 -  Using the data from Bonus 1 - make another AJAX call to get the information about the first planet that the film contains. Your function should return a promise that when resolved will console.log the name of the character and the film they are featured in and the name of the planet. 

starWarsString(1).then(function(data){
    console.log(data)
})
 
// "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner and it takes place on Hoth"
*/

function starWarsString(id) {
    var str = '';
    return $.getJSON(`https://swapi.co/api/people/${id}`)
    .then(function(char) {
        str += `${char.name} is featured in `;
        return $.getJSON(char.films[0]);
    })
    .then(function(film) {
        str += `${film.title}, directed by ${film.director} `;
        return $.getJSON(film.planets[0]);
    })
    .then(function(planet) {
        str += `and it takes place on ${planet.name}`;
        return str;
    })
    .then(function(finalStr) {
        return finalStr;
    });
}