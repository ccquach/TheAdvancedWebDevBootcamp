d3.csv('./expenses.csv', function(error, expenses) {
  if (error) throw error;

  // parse csv to js
  console.log("expenses:");
  console.log(expenses);

  // group by name
  var expensesByName =
    d3.nest()
      .key(d => d.name)
      .entries(expenses);

  console.log('expensesByName:');
  console.log(expensesByName);

  // summarizing groups
  var expensesByCount =
    d3.nest()
      .key(d => d.name)
      .rollup(v => v.length)
      .entries(expenses);

  console.log('expensesByCount:');
  console.log(expensesByCount);

  var expensesAvgAmount =
    d3.nest()
      .key(d => d.name)
      .rollup(v => d3.mean(v, d => d.amount))
      .entries(expenses);
  
  console.log('expensesAvgAmount:');
  console.log(expensesAvgAmount);

  // multiple metrics
  var expenseMetrics =
    d3.nest()
      .key(d => d.name)
      .rollup(function(v) { return {
          count: v.length,
          total: d3.sum(v, d => d.amount),
          avg: d3.mean(v, d => d.amount)
        } 
      })
      .entries(expenses);

  console.log('expenseMetrics:');
  console.log(expenseMetrics);

  // object output
  var expensesTotal =
    d3.nest()
      .key(d => d.name)
      .rollup(v => d3.sum(v, d => d.amount))
      .object(expenses);

  console.log('expensesTotal:');
  console.log(expensesTotal);

  // multi-level nesting
  var expensesTotalByDay =
    d3.nest()
      .key(d => d.name)
      .key(d => d.date)
      .rollup(v => d3.sum(v, d => d.amount))
      .object(expenses);

  console.log('expensesTotalByDay (group order: name, date):');
  console.log(expensesTotalByDay);

	var expensesTotalByDay =
		d3.nest()
			.key(d => d.date)
			.key(d => d.name)
			.rollup(v => d3.sum(v, d => d.amount))
			.object(expenses);

	console.log('expensesTotalByDay (group order: date, name):');
	console.log(expensesTotalByDay);

	// derived key values
	var expensesByYear =
		d3.nest()
			.key(d => d.date.split("/")[2])
			.rollup(v => d3.sum(v, d => d.amount))
			.object(expenses);

	console.log('expensesByYear:');
	console.log(expensesByYear);
});