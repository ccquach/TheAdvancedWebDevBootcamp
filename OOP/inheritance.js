// Inheritance
// 1. Set prototype to be object created with another prototype, using Object.create();
// 2. Reset the constructor property

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    Person.apply(this, arguments);
}
Student.prototype = Object.create(Person.prototype);
// Object.create overwrites Student constructor, so reset constructor to Student
Student.prototype.constructor = Student;

Student.prototype.status = function() {
    return "I am currently a student!";
}

var elie = new Person("Elie", "Schoppik");
elie.status;    // undefined (modifying Student prototype does NOT alter Person prototype)