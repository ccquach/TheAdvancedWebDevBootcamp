//constructor function
function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

//create object using constructor function (instance)
var newHouse = new House(2,2,1000);
newHouse.bathrooms;
newHouse.bedrooms;
newHouse.numSqft;


//dog object
function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.bark = function() {
        console.log(this.name, "just barked!");
    }
}

var rusty = new Dog("Rusty", 3);
var fido = new Dog("Fido", 1);

rusty.bark();   // Rusty just barked!
fido.bark();    // Fido just barked!


//multiple constructors
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

function Motorcycle(make, model, year) {
    Car.apply(this, arguments);
    this.numWheels = 2;
}