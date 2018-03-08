function printRest(a,b,...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

printRest(1,2,3,4,5);
// 1
// 2
// [3,4,5]



// ES5
function sumArguments() {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
// Fancier ES5
function sumArguments() {
    var argumentsArray = [].slice.call(arguments);
    return argumentsArray.reduce(function(accumulator, nextValue) {
        return accumulator + nextValue;
    });
}
// ES2015
var sumArguments = (...args) => args.reduce((acc, next) => acc + next);