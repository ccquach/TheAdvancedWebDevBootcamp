// dotenv Configuration
require('dotenv').config();

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 3000,
    bodyParser  = require('body-parser');

// Require Routes
var todoRoutes = require('./routes/todos');

// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

// Express Routers
app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log("Serving Todo app on Port " + port);
});