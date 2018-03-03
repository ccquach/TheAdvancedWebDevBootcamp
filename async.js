// Callback functions
function findIndex(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		if (callback(arr[i], i, arr)) { return i; }
	}
	return -1;
}

// setInterval()
function countDown(time) {
	var intervalId = setInterval(function() {
		time--;
		if (time === 0) {
			console.log("Ring Ring Ring!!!");
			return clearInterval(intervalId);
		}
		console.log(time);
	}, 1000);
}

// Promise basics
var promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		var randomInt = Math.floor(Math.random() * 10);
		resolve(randomInt);
	}, 4000);
});

promise.then(function(data) {
	console.log("Random int passed to resolve:", data);
});

// Nested callback
var counter = 0;
setTimeout(function() {
	counter++;
	console.log("Counter:", counter);
	setTimeout(function() {
		counter++;
		console.log("Counter:", counter);
		setTimeout(function() {
			counter++;
			console.log("Counter:", counter);
		}, 3000);
	}, 2000);
}, 1000);

// Promise chaining (refactor nested callback)
var counter = 0;
function incCounter() {
	counter++;
	console.log("Counter:", counter);
}

function runLater(callback, timeInMs) {
	var p = new Promise(function(resolve, reject) {
		setTimeout(function() {
			var res = callback();
			resolve(res);
		}, timeInMs);
	});
	return p;
}

runLater(incCounter, 1000).then(function() {
	return runLater(incCounter, 2000);
}).then(function() {
	return runLater(incCounter, 3000);
}).then(function() {
	// final .then not necessary
	console.log("promise chain complete");
});