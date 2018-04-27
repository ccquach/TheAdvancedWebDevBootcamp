import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed}) => (
  <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    {name}
  </li>
)

export default TodoItem;