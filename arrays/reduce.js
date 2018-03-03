//reduce
arr = [1,2,3,4,5];

//array to number
arr.reduce(function(accumulator, nextValue, index, array) {
	return accumulator + nextValue;
}); 	// 15

arr.reduce(function(accumulator, nextValue, index, array) {
	return accumulator + nextValue;
}, 10); // 25

//array to string
var names = ["Tim", "Matt", "Colt", "Elie"];
names.reduce(function(accumulator, nextValue) {
	return accumulator += " " + nextValue;
}, "The instructors are");		// The instructors are Tim Matt Colt Elie"

//array to object
var arr = [5,4,1,4,5];
arr.reduce(function(accumulator, nextValue) {
	if(nextValue in accumulator) {
		accumulator[nextValue]++;
	} else {
		accumulator[nextValue] = 1;
	}
	return accumulator;
}, {});							// {1: 1, 4: 2, 5: 2}

//reduce in a function
function sumOddNumbers(arr) {
	return arr.reduce(function(accumulator, nextValue) {
		if(nextValue % 2 !== 0) {
			accumulator += nextValue;
		}
		return accumulator;
	}, 0);
}
sumOddNumbers([1,2,3,4,5]); 	// 9

function createFullName(arr) {
	return arr.reduce(function(accumulator, nextValue) {
		accumulator.push(nextValue.first + " " + nextValue.last);
		return accumulator;
	}, []);
}
createFullName([{first: "Colt", last: "Steele"}, {first: "Matt", last: "Lane"}]);
// ["Colt Steele", "Matt Lane"]



// =============== EXERCISES ===============

/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/
function extractValue(arr, key){
    return arr.reduce(function(accumulator, nextValue) {
    	accumulator.push(nextValue[key]);
    	return accumulator;
    }, []);
}


/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str){
	var vowels = 'aeiou';
	return str.toLowerCase().split('').filter(function(char) {
		return vowels.indexOf(char) !== -1;
	}).reduce(function(accumulator, nextValue) {
		if(nextValue in accumulator) {
			accumulator[nextValue]++;
		} else {
			accumulator[nextValue] = 1;
		}
		return accumulator;
	}, {});
}

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    addKeyAndValue(arr, 'title', 'Instructor') // 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(accumulator, nextValue, index) {
    	accumulator[index][key] = value;
    	return accumulator;
    }, arr);
}


/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
    
    function isEven(val){
        return val % 2 === 0;
    }
    
    var arr = [1,2,3,4,5,6,7,8];
    
    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    var names = ['Elie', 'Colt', 'Tim', 'Matt'];
    
    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, callback){
    return arr.reduce(function(accumulator, nextValue) {
    	if(callback(nextValue)) {
    		accumulator[0].push(nextValue);
    	} else {
    		accumulator[1].push(nextValue);
    	}
    	return accumulator;
    }, [[],[]]);
}