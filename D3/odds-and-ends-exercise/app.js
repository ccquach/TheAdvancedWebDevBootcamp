d3.queue()
  .defer(d3.csv, './data/co2-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      co2Emissions: +row["2000"]
    };
  })
  .defer(d3.csv, './data/methane-emissions.csv', function(row) {
    return {
      country: row["Country Name"],
      countryCode: row["Country Code"],
      methaneEmissions: +row["2000"]
    };
  })
  .await(function(err, co2Array, methaneArray) {
    if (err) throw err;

    // get data for each country
    var data = co2Array.map(co2 => {
      co2.methaneEmissions = methaneArray.filter(methane => methane.countryCode === co2.countryCode)[0].methaneEmissions;
      return co2;
    });
    
    
  })