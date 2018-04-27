import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';

const API_URL = '/api/todos/';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount() {
    this.loadTodos();
  }

  loadTodos() {
    fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        // server-side error
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          });
        } else {
          // server down
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      }
      return res.json();
    })
    .then(todos => this.setState({todos}));
  }

  addTodo(val) {
    fetch(API_URL, {
      method: 'POST',
      headers: new Headers ({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
    })
    .then(res => {
      if (!res.ok) {
        // server-side error
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          });
        } else {
          // server down
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      }
      return res.json();
    })
    .then(newTodo => {
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
    });
  }

  deleteTodo(id) {
    const deleteUrl = API_URL + id;
    fetch(deleteUrl, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) {
        // server-side error
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          });
        } else {
          // server down
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      }
      return res.json();
    })
    .then(() => {
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos});
    });
  }

  render() {
    const todos = this.state.todos.map(t => (
      <TodoItem
        key={t._id}
        {...t}
        onDelete={this.deleteTodo.bind(this, t._id)}
      />
    ));
    return (
      <div>
        <h1>Todo List</h1>
        <TodoForm addTodo={this.addTodo} />
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;