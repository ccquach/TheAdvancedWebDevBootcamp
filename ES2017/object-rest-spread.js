// ========== Object Rest ==========
var instructor = {
    first: 'Elie',
    last: 'Schoppik',
    job: 'Instructor',
    numSiblings: 3
};

var { first, last, ...data } = instructor;
first;  // "Elie"
last;   // "Schoppik"
data;   // { job: "Instructor", numSiblings: 3 }


// ========== Object Spread ==========
var instructor = {
    first: 'Elie',
    last: 'Schoppik',
    job: 'Instructor'
};
var instructor2 = {
    ...instructor,
    first: 'Tim',
    last: 'Garcia'
};

// default values
var defaults = {
    job: 'Instructor',
    ownsCat: true,
    ownsDog: true
};
var matt = { ...defaults, ownsCat: false };
var colt = { ...defaults, ownsDog: false };