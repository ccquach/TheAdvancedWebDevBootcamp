const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const databaseUri = 'mongodb://127.0.0.1/todos-backend';
const databaseOptions = {
  user: process.env.DB_USER,
  pass: process.env.DB_PWD,
  auth: {
    authdb: 'admin'
  }
};
mongoose.connect(databaseUri, databaseOptions)
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`))
;

const todoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;