import React, { Component } from 'react';
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
    return (
      <h1>Todo List</h1>
    );
  }
}

export default TodoList;