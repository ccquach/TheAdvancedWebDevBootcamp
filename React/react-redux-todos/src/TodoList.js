import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from './actionCreators';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      task: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.task);
    e.target.reset();
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  updateTodo(todo) {
    this.props.updateTodo(todo);
  }

  render () {
    let todos = this.props.todos.map((val, idx) => (
      <Todo
        key={idx}
        todo={val}
        removeTodo={this.removeTodo.bind(this, val.id)}
        updateTodo={this.updateTodo.bind(this, val)}
      />
    ));
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task </label>
          <input 
            type="text" 
            name="task" 
            id="task" 
            onChange={this.handleChange}
          />
          <button>Add todo</button>
        </form>
        <ul>{todos}</ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps, { addTodo, removeTodo, updateTodo })(TodoList);