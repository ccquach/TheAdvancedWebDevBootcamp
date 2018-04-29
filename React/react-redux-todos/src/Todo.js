import React from 'react';

const Todo = ({todo, removeTodo, updateTodo }) => (
  <li>
    <span 
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      onClick={updateTodo}
    >
        {todo.task}
    </span>
    <button onClick={removeTodo}>X</button>
  </li>
)

export default Todo;