var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 3000;

// dotenv Configuration
require('dotenv').config();

// Require Routes
var todoRoutes = require('./routes/todos');

app.get('/', function(req, res) {
    res.send("hello from root route");
});

// Express Routers
app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log("Serving Todo app on Port " + port);
});