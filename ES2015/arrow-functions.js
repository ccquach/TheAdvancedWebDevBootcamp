[1,2,3].map(function(val) {
    return val * 2;
});

[1,2,3].map(val => val * 2);


function doubleAndFilter(arr) {
    return arr.map(function(value) {
        return value * 2;
    }).filter(function(value) {
        return value % 3 === 0;
    });
}
doubleAndFilter([5,10,15,20]);  // [30]

var doubleAndFilter = arr => arr.map(value => value * 2).filter(num => num % 3 === 0);


var instructor = {
    firstName: 'Elie',
    sayHi: function() {
        setTimeout(function() {
            console.log(`Hello ${this.firstName}`);
        }, 1000);
    }
};
instructor.sayHi();     // Hello undefined

var instructor = {
    firstName: 'Elie',
    sayHi: function() {
        setTimeout(function() {
            console.log(`Hello ${this.firstName}`);
        }.bind(this), 1000);
    }
};
instructor.sayHi();     // Hello Elie

var instructor = {
    firstName: 'Elie',
    sayHi: function() {
        setTimeout(() => {
            console.log(`Hello ${this.firstName}`);
        }, 1000);
    }
};
instructor.sayHi();     // Hello Elie


// ==================== Exercises ====================
/* 1 - Refactor the following code to use ES2015 arrow functions - make sure your function is also called tripleAndFilter

    function tripleAndFilter(arr){
      return arr.map(function(value){
        return value * 3;
      }).filter(function(value){
        return value % 5 === 0;
      })
    }

*/

let tripleAndFilter = arr => arr.map(value => value * 3).filter(value => value % 5 === 0);

/* 2 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called doubleOddNumbers

    function doubleOddNumbers(arr){
        return arr.filter(function(val){
            return val % 2 !== 0;
        }).map(function(val){
            return val *2;
        })
    }

*/

let doubleOddNumbers = arr => arr.filter(val => val % 2 !== 0).map(val => val * 2);

/* 3 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called mapFilterAndReduce.

    function mapFilterAndReduce(arr){
      return arr.map(function(val){
        return val.firstName
      }).filter(function(val){
        return val.length < 5;
      }).reduce(function(acc,next){
        acc[next] = next.length
        return acc;
      }, {})
    }
*/

let mapFilterAndReduce = arr => arr.map(val => val.firstName).filter(val => val.length < 5)
    .reduce((acc, next) => {
        acc[next] = next.length;
        return acc;
    }, {});

/* 4 - Write a function called createStudentObj which accepts two parameters, firstName and lastName and returns an object with the keys of firstName and lastName with the values as the parameters passed to the function.

Example:
    createStudentObj('Elie', 'Schoppik') // {firstName: 'Elie', lastName: 'Schoppik'}
*/

let createStudentObj = (firstName, lastName) => ({ firstName: firstName, lastName: lastName });

/* 5 - Given the following code: 


Refactor this code to use arrow functions to make sure that in 1000 milliseconds you console.log 'Hello Colt'
    
    var instructor = {
      firstName: "Colt",
      sayHi: function(){
        setTimeout(function(){
          console.log('Hello ' + this.firstName)
        },1000)
      }
    }

*/

let instructor = {
    firstName: 'Colt',
    sayHi: function() {
        setTimeout(() => {
            console.log(`Hello ${this.firstName}`);
        }, 1000);
    }
};