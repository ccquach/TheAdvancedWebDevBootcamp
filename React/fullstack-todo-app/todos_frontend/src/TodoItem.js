import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete}) => (
  <li 
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {name}
    <span onClick={onDelete}> X </span>
  </li>
)

export default TodoItem;