// ========== OBJECT ORIENTED ==========

// ES5
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
var elie = new Student('Elie', 'Schoppik');

// ES2015
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
var elie = new Student('Elie', 'Schoppik'); // same as ES5

// ========== INSTANCE METHODS ==========

// ES5
Student.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

// ES2015
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}

// ========== CLASS METHODS ==========

// ES5
Student.isStudent = function(obj) {
    return obj.constructor === Student;
}

// ES2015
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
    static isStudent(obj) {
        return obj.constructor === Student;
    }
}


// ========== INHERITANCE & SUPER ==========

// ES5
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    Person.apply(this, arguments);
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// ES2015
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}
class Student extends Person {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
}