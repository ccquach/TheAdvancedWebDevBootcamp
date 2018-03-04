// ========== Global Context ==========
"use strict"
console.log(this);
function whatIsThis() {
	return this;
}
whatIsThis();

"use strict"
function variableInThis() {
	this.person = "Elie";
}
variableInThis();

// ========== Implicit/Object Binding ==========
// strict mode does not make a differnce here
var person = {
    firstName: "Elie",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function() {
        return this === person;
    }
};
person.sayHi();                 // "Hi Elie"
person.determineContext();      // true

var person = {
    firstName: "Elie",
    determineContext: this
};
person.determineContext;        // window

var person = {
    firstName: "Colt",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function() {
        return this === person;
    },
    dog: {
        sayHello: function() {
            return "Hello " + this.firstName;
        },
        determineContext: function() {
            return this === person;
        }
    }
};
person.sayHi();                     // "Hi Colt"
person.determineContext();          // true
person.dog.sayHello();              // "Hello undefined"
person.dog.determineContext();      // false

// ========== Explicit Binding ==========
// Call
person.sayHi();                             // "Hi Colt"
person.determineContext();                  // true
person.dog.sayHello.call(person);           // "Hi Colt"
person.dog.determineContext.call(person);   // true

// Call Example 1
var colt = {
    firstName: "Colt",
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};
var elie = {
    firstName: "Elie",
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};
colt.sayHi();   // "Hi Colt"
elie.sayHi();   // "Hi Elie"

// Call Example 1 Refactored: use call method to eliminate duplication
// solution 1
var colt = {
    firstName: "Colt",
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};
var elie = {
    firstName: "Elie"
};
colt.sayHi();   // "Hi Colt"
colt.sayHi.call(elie);      // "Hi Elie"

// solution 2
function sayHi() {
    return "Hi " + this.firstName;
}
var colt = {
    firstName: "Colt"
};
var elie = {
    firstName: "Elie"
};
sayHi.call(colt);     // "Hi Colt"
sayHi.call(elie);     // "Hi Elie"

// Call Example 2: select all divs that have text "Hello"

// returns array-like object, not an array
var divs = document.getElementsByTagName("div");    
// convert array-like object into array using slice method
var divsArray = [].slice.call(divs);          
// filter method can only be invoked on arrays, not array-like objects
divsArray.filter(function(val) {
    return val.innerText === "Hello";
});

// Apply

// Apply Example 1
function sayHi() {
    return "Hi " + this.firstName;
}
var colt = {
    firstName: "Colt"
};
var elie = {
    firstName: "Elie"
};
sayHi.call(colt);       // "Hi Colt"
sayHi.apply(elie);      // "Hi Elie"

// Apply Example 2
function addNumbers(a,b,c,d) {
    return this.firstName + " just calculated " + (a + b + c + d);
}
var colt = {
    firstName: "Colt"
};
var elie = {
    firstName: "Elie"
};
addNumbers.call(elie,1,2,3,4)       // "Elie just calculated 10"
addNumbers.apply(elie, [1,2,3,4])    // "Elie just calculated 10"

// Apply Example 3
var nums = [5,7,1,4,2];
Math.max(nums);                 // NaN
Math.max.apply(this, nums);     // 7

// Apply Example 4
function sumValues(a,b,c) {
    return a + b + c;
}
var values = [4,1,2];
sumValues(values);                  // "4,1,2undefinedundefined"
sumValues.apply(this, values);      // 7

// Bind

// Bind Example 1
function addNumbers(a,b,c,d) {
    return this.firstName + " just calculated " + (a+b+c+d);
}
var elie = {
    firstName: "Elie"
};

var elieCalc = addNumbers.bind(elie,1,2,3,4);
elieCalc();     // "Elie just calculated 10"

var elieCalc = addNumbers.bind(elie,1,2);
elieCalc(3,4);  // "Elie just calculated 10"

// Bind Example 2
var colt = {
    firstName: "Colt",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hi " + this.firstName);
        }, 1000);
    }
}
colt.sayHi();       // "Hi undefined"

// Bind Example 2 Refactored: setTimeout invokes bind to set value of this to colt, which will be used when function called 1 second later
var colt = {
    firstName: "Colt",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hi " + this.firstName);
        }.bind(this), 1000);
    }
}
colt.sayHi();       // "Hi Colt"