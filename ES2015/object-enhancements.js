// Object Shorthand Notation
var firstName = "Elie";
var lastName = "Schoppik";

// ES5
var instructor = {
    firstName: firstName,
    lastName: lastName
};

// ES2015 - do NOT use arrow functions here!
var instructor = {
    firstName,
    lastName
}


// Object Methods

// ES5
var instructor = {
    sayHi: function() {
        return "Hello!";
    }
}

// ES2015
var instructor = {
    sayHi() {
        return "Hello!";
    }
}


// Computed Property Names

// ES5
var firstName = "Elie";
var instructor = {};
instructor[firstName] = "That's me!";

instructor.Elie;    // "That's me!"

// ES2015
var firstName = "Elie";
var instructor = {
    [firstName]: "That's me!"
};

instructor.Elie;    // "That's me!"