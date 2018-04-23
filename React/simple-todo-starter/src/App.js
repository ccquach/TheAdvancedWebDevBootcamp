import React, { Component } from 'react';
import './App.css';

class TodoList extends Component {
  render() {
    const todos = this.props.todos.map((todo, idx) => (
      <li className="todo-item" key={idx}>{todo}</li>
    ));
    return(
      <ol className="todo-list">
        {todos}
      </ol>
    );
  }
}

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }

  handleInputSubmit(e) {
    e.preventDefault();
    this.props.onInputSubmit();
  } 

  render() {
    const inputText = this.props.inputText;
    return (
      <form onSubmit={this.handleInputSubmit}>
        <input 
          type="text" 
          placeholder="What needs to be done?"
          value={inputText}
          onChange={this.handleInputTextChange} 
        />
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,     // default todos
      inputText: ''
    };

    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleInputTextChange(inputText) {
    this.setState({ 
      inputText
    });
  }

  handleInputSubmit() {
    const todos = [...this.state.todos, this.state.inputText];
    this.setState({ 
      todos,
      inputText: ''     // clear text input
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Simple Todo App</h1>
        <TodoInput
          inputText={this.state.inputText}
          onInputTextChange={this.handleInputTextChange}
          onInputSubmit={this.handleInputSubmit}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

App.defaultProps = {
  todos: ["Walk the dog", "Feed the dog"]
};

export default App;