// constructor
function Person(name) {
    this.name = name;
}

// new instances
var elie = new Person("Elie");
var colt = new Person("Colt");

// new object linked to Person prototype property
elie.__proto__ === Person.prototype;    // true
colt.__proto__ === Person.prototype;    // true

// Person.prototype object has property constructor
// that points back to the function
Person.prototype.constructor === Person;    //true

// prototype shared among all obj created by that constructor fn
Person.prototype.isInstructor = true;

elie.isInstructor;  // true
colt.isInstructor;  // true


// Refactoring

// constructor
function Person(name) {
    this.name = name;
    this.sayHi = function() {
        return "Hi " + this.name;
    }
}

// constructor refactored
function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function() {
    return "Hi " + this.name;
};

elie = new Person("Elie");
elie.sayHi();   // Hi Elie


// Challenge
function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}
Vehicle.prototype.turnOn = function() {
    this.isRunning = true;
};
Vehicle.prototype.turnOff = function() {
    this.isRunning = false;
};
Vehicle.prototype.honk = function() {
    if(this.isRunning) {
        return "beep";
    }
};