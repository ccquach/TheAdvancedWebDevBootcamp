import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const API_URL = '/api/todos';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
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

  render() {
    const todos = this.state.todos.map(t => (
      <TodoItem
        key={t._id}
        {...t}
      />
    ));
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;