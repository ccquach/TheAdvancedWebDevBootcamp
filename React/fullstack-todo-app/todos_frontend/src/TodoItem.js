import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li className="task">
    <span 
      className={ completed ? "done" : null }
      onClick={onToggle}  
    >
      {name}
    </span>
    <span className="delete-button" onClick={onDelete}> X </span>
  </li>
)

export default TodoItem;