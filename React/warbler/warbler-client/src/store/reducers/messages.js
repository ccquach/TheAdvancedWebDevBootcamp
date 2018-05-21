import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case REMOVE_MESSAGE:
      return state.filter(message => message._id !== action.id);
    default:
      return state;
  }
};
