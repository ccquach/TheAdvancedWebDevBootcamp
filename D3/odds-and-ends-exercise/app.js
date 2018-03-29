d3.queue()
  .defer(d3.csv, './data/co2-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      co2Emissions: row["2000"]
    };
  })
  .defer(d3.csv, './data/methane-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      methaneEmissions: row["2000"]
    };
  })
  .await(function(err, co2, methane) {
    if (err) throw err;

    console.log(co2);
    console.log(methane);
  })