// [].includes

var nums = [1,2,3,4,5];

// ES2015
nums.indexOf(3) > -1;   // true
nums.indexOf(44) > -1;  // false

// ES2016
nums.includes(3);   // true
nums.includes(44);  // false