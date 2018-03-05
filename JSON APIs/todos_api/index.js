var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.json({ message: 'hi from js object' });
});

app.get('/happy', function(req, res) {
    res.send(':)');
});

app.listen(port, function() {
    console.log('Serving Todo app on Port ' + port);
});