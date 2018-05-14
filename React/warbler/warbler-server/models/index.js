const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const databaseUri = process.env.DB_URL || 'mongodb://127.0.0.1/warbler';
const databaseOptions = {
  user: process.env.DB_USER,
  pass: process.env.DB_PWD,
  auth: {
    authdb: 'admin'
  },
  keepAlive: true,
  useMongoClient: true
};

mongoose.connect(databaseUri, databaseOptions)
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`))
;

module.exports.User = require('./user');