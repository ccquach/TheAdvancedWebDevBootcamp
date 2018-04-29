export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export function addTodo(task) {
  return {
    type: ADD_TODO,
    task
  }
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function updateTodo(todo) {
  return {
    type: UPDATE_TODO,
    id: todo.id,
    completed: todo.completed
  }
}