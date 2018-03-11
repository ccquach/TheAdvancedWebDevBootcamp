// Exponentiation Operator **

// ES2015
var calculatedNumber = Math.pow(2,4);
calculatedNumber;   // 16

// ES2016
var calculatedNumber = 2**4;
calculatedNumber;   // 16


// ES2015
var nums = [1,2,3,4];
var total = 2;

for (let i = 0; i < nums.length; i++) {
    total = Math.pow(total, nums[i]);
}


// ES2016
var nums = [1,2,3,4];
var total = 2;

for (let i = 0; i < nums.length; i++) {
    total **= nums[i];
}