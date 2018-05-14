const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// all routes here - they will come later

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, function() {
  console.log(`Serving warbler app on port ${PORT}`);
});