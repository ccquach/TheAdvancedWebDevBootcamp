export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const GET_TODOS = "GET_TODOS";

const API_URL = 'http://localhost:3001/api/todos/';

function handleTodos(data) {
  return {
    type: GET_TODOS,
    data
  };
}

function handleAdd(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function handleRemove(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function handleUpdate(todo) {
  return {
    type: UPDATE_TODO,
    id: todo._id,
    completed: todo.completed
  };
}

export function getTodos() {
  return dispatch => {
    return fetch(API_URL)
      .then(res => res.json())
      .then(data => dispatch(handleTodos(data)))
      .catch(err => console.log("Something went wrong", err));
  };
}

export function addTodo(task) {
  return dispatch => {
    return fetch(API_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ task })
    })
    .then(res => res.json())
    .then(data => dispatch(handleAdd(data)))
    .catch(err => console.log("Something went wrong", err));
  }
}

export function removeTodo(id) {
  return dispatch => {
    return fetch(API_URL + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => dispatch(handleRemove(id)))
    .catch(err => console.log("Something went wrong", err));
  }
}

export function updateTodo(todo) {
  return dispatch => {
    return fetch(API_URL + todo._id, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ completed: !todo.completed })
    })
    .then(res => res.json())
    .then(data => dispatch(handleUpdate(data)))
    .catch(err => console.log("Something went wrong", err));
  }
}