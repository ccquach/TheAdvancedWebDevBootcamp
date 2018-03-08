// ========== Object Destructuring ==========
var instructor = {
    firstName: 'Elie',
    lastName: 'Schoppik'
};

// ES5
var firstName = instructor.firstName;
var lastName = instructor.lastName;

firstName;      // "Elie"
lastName;       // "Schoppik"

// ES2015
var { firstName, lastName } = instructor;

firstName;      // "Elie"
lastName;       // "Schoppik"

// Different Variables
var { firstName: first, lastName: last } = instructor;

first;          // "Elie"
last;           // "Schoppik"

// Default Values

// ES5
function createInstructor(options) {
    var options = options || {};
    var name = options.name || { first: 'Matt', last: 'Lane' };
    var isHilarious = options.isHilarious || false;
    return [name.first, name.last, isHilarious];
}
createInstructor(); // ["Matt", "Lane", false]
createInstructor({ isHilarious: true });    // ["Matt", "Lane", true]
createInstructor({ name: { first: 'Tim', last: 'Garcia' }});    // ["Tim", "Garica", false]

// ES2015
function createInstructor({ name = { first: 'Matt', last: 'Lane' }, isHilarious = false } = {}) {
    return [name.first, name.last, isHilarious];
}

// Object Fields as Parameters
var instructor = {
    name: 'Elie',
    favColor: 'Purple'
};

// ES5
function displayInfo(obj) {
    return [obj.name, obj.favColor];
}
displayInfo(instructor);  // ["Elie", "Purple"]

// ES2015
function displayInfo({ name, favColor }) {
    return [name, favColor];
}
displayInfo(instructor);  // ["Elie", "Purple"]



// ========== Array Destructuring ==========
var arr = [1,2,3];

// ES5
var a = arr[0];
var b = arr[1];
var c = arr[2];

// ES2015
var [a,b,c] = arr;

a; // 1
b; // 2
c; // 3


function returnNumbers(a,b) {
    return [a,b];
}

// ES5
var first = returnNumbers(5,10)[0];
var second = returnNumbers(5,10)[1];

// ES2015
var [first, second] = returnNumbers(5,10);

first; // 5
second; // 10


// Swapping Values

// ES5
function swap(a,b) {
    var temp = a;
    a = b;
    b = temp;
    return [a,b];
}

// ES2015
function swap(a,b) {
    return [a,b] = [b,a];
}

swap(10,5); // [5,10]


// ========== Exercises ==========
/* 
Write a function called displayStudentInfo which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object inside of the function.

Examples:
    displayStudentInfo({first: 'Elie', last:'Schoppik'}) // 'Your full name is Elie Schoppik')
*/

function displayStudentInfo(obj){
    var { first, last } = obj;
    return `Your full name is ${first} ${last}`;
}

/* 
Write a function called printFullName which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object DIRECTLY from the parameters. The output of the printFullName function should be the exact same as the displayStudentInfo function. 

Examples:
    printFullName({first: 'Elie', last:'Schoppik'}) // 'Your full name is Elie Schoppik'
*/

// you will have to pass in the correct parameters for this function!
function printFullName({ first, last }){
    return `Your full name is ${first} ${last}`;
}

/* 
Write a function called createStudent which accepts as a parameter, a default parameter which is a destructured object with the key of likesES2015 and value of true, and key of likesJavaScript and value of true. 

    If both the values of likesJavaScript and likesES2015 are true, the function should return the string 'The student likes JavaScript and ES2015'. 
    If the value of likesES2015 is false the function should return the string 'The student likes JavaScript!'
    If the value of likesJavaScript is false the function should return the string 'The student likesES2015!'
    If both the value of likesJavaScript and likesES2015 are false, the function should return the string 'The student does not like much...'

Examples:
    createStudent() // 'The student likes JavaScript and ES2015')
    createStudent({likesES2015:false}) // 'The student likes JavaScript!')
    createStudent({likesJavaScript:false}) // 'The student likes ES2015!')
    createStudent({likesJavaScript:false, likesES2015:false}) // 'The student does not like much...')
*/

// you will have to pass in the correct parameters for this function!
function createStudent({ likesES2015 = true, likesJavaScript = true } = {}){
    var start = "The student ";
    if(likesES2015 && likesJavaScript) {
        start += "likes JavaScript and ES2015!"; 
    } else if(likesES2015) {
        start += "likes ES2015!";
    } else if(likesJavaScript) {
        start += "likes JavaScript!";
    } else {
        start += "does not like much...";
    }
    return start;
}

/* 
Write a function called reverseArray which accepts an array and returns the array with all values reversed. See if you can do this without creating a new array!

Examples:
    reverseArray([1,2,3,4,5]) // [5,4,3,2,1]
    reverseArray([1,2]) // [2,1]
    reverseArray([]) // []
    reverseArray([1,2,3,4,5,6,7,8,9,10]) // [10,9,8,7,6,5,4,3,2,1]
*/

function reverseArray(arr){
    for(var i = 0; i < arr.length / 2; i++) {
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }
    return arr;
}