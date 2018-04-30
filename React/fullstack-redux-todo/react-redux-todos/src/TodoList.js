import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { addTodo, removeTodo, updateTodo, getTodos } from './actionCreators';
import { Route } from 'react-router-dom';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    this.props.getTodos();
  }
  handleAdd(val) {
    this.props.addTodo(val);
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }
  updateTodo(todo) {
    this.props.updateTodo(todo);
  }
  render () {
    let todos = this.props.todos.map(val => (
      <Todo
        key={val._id}
        todo={val}
        removeTodo={this.removeTodo.bind(this, val._id)}
        updateTodo={this.updateTodo.bind(this, val)}
      />
    ));
    return(
      <div>
        <Route path="/todos/new" component={props => (
          <NewTodoForm {...props} handleSubmit={this.handleAdd} />
        )} />
        <Route exact path="/todos" component={() => <div>{todos}</div>} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps, { addTodo, removeTodo, updateTodo, getTodos })(TodoList);