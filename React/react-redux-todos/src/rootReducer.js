import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './actionCreators';

const initialState = {
  todos: [],
  id: 0
};

function rootReducer(state = initialState, action) {
  let todos;
  switch (action.type) {
    case ADD_TODO:
      var newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, { task: action.task, id: newState.id, completed: false }]
      };
    case REMOVE_TODO:
      todos = state.todos.filter(val => val.id !== action.id);
      return { ...state, todos };
    case UPDATE_TODO:
      todos = state.todos.map(val => (
        val.id === action.id ? { ...val, completed: !val.completed } : val
      ));
      return { ...state, todos };
    default:
      return state;
  }
}

export default rootReducer;