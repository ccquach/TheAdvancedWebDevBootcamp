import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, GET_TODOS } from './actionCreators';

const initialState = {
  todos: []
};

function rootReducer(state = initialState, action) {
  let todos;
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.data };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] };
    case REMOVE_TODO:
      todos = state.todos.filter(val => val._id !== action.id);
      return { ...state, todos };
    case UPDATE_TODO:
      todos = state.todos.map(val => (
        val._id === action.id ? { ...val, completed: !val.completed } : val
      ));
      return { ...state, todos };
    default:
      return state;
  }
}

export default rootReducer;