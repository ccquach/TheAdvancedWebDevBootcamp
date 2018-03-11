// ========== Object.assign ==========

// ES5
var o = {name: 'Elie'};
var o2 = o;

o2.name = 'Tim';
o.name; // "Tim"

// ES2015
var o = {name: 'Elie'};
var o2 = Object.assign({}, o);

o2.name = 'Tim';
o.name; // "Elie"

// not a deep clone
var o = {instructors: ['Elie', 'Tim']};
var o2 = Object.assign({}, o);

o2.instructors.push('Colt');
o.instructors;  // ["Elie", "Tim", "Colt"]


// ========== Array.from ==========
// convert array-like object into array
var divs = document.getElementsByTagName('div');
divs.reduce // undefined, since not array

// ES5
var converted = [].slice.call(divs);
converted.reduce    // function reduce() { ... }

// ES2015
var converted = Array.from(divs);
converted.reduce    // function reduce() { ... }

// convert different types of objects into arrays
var firstSet = new Set([1,2,3,4,3,2,1]);    // {1,2,3,4}
var arrayFromSet = Array.from(firstSet);    // [1,2,3,4]


// ========== find ==========
var instructors = [
    {name: 'Elie'},
    {name: 'Matt'},
    {name: 'Tim'},
    {name: 'Colt'}
];

instructors.find(function(val) {
    return val.name === 'Tim';
}); // {name: "Tim"}


// ========== findIndex ==========
instructors.findIndex(function(val) {
    return val.name === 'Tim';
}); // 2


// ========== includes ==========
// ES5
"awesome".indexOf("some") > -1;  // true

// ES2015
"awesome".includes("some");     // true


// ========== Number.isFinite ==========
// ES5
function seeIfNumber(val) {
    if (typeof val === "number" && !isNaN(val)) {
        return "It is a number!";
    }
}

// ES2015
function seeIfNumber(val) {
    if (Number.isFinite(val)) {
        return "It is a number!";
    }
}



// ========== EXERCISES ==========
/* 
Write a function called copyObject, which accepts one parameter, an object. The function should return a shallow copy of the object.

var o = {name: 'Elie'}
var o2 = copyObject({}, o)
o2.name = "Tim"
o2.name // 'Tim'
o.name // 'Elie'
*/

function copyObject(obj){
    return Object.assign({}, obj);
}

/* 

Write a function called checkIfFinite which accepts one parameter and returns true if that parameter is a finite number.

checkIfFinite(4) // true
checkIfFinite(-3) // true
checkIfFinite(NaN) // false
checkIfFinite(Infinity) // false
*/

function checkIfFinite(val){
    return Number.isFinite(val);
}

/*

Write a function called areAllNumbersFinite which accepts an array and returns true if every single value in the array is a finite number, otherwise return false.

var finiteNums = [4,-3,2.2]
var finiteNumsExceptOne = [4,-3,2.2,NaN]
areAllNumbersFinite(finiteNums) // true
areAllNumbersFinite(finiteNumsExceptOne) // false
*/

function areAllNumbersFinite(arr){
    return arr.every(Number.isFinite);
}

/* 

Write a function called convertArrayLikeObject which accepts a single parameter, an array like object. The function should return the array like object converted to an array.

var divs = document.getElementsByTagName('div')
divs.reduce // undefined

var converted = convertArrayLikeObject(divs)
converted.reduce // funciton(){}...
*/

function convertArrayLikeObject(obj){
    return Array.from(obj);
}

/*

Write a function called displayEvenArguments which accepts a variable number of arguments and returns a new array with all of the arguments that are even numbers.

displayEvenArguments(1,2,3,4,5,6) // [2,4,6]
displayEvenArguments(7,8,9) // [8]
displayEvenArguments(1,3,7) // []
*/

function displayEvenArguments(...nums){
    return nums.filter((val) => val % 2 === 0);
}