// reducer (rootReduce)
// redux store and initialState
// change state

const initialState = {
  count: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      // pure function => make copy of state
      var newState = { ...state };
      newState.count++;
      return newState;
    case "DECREMENT":
      var newState = { ...state };
      newState.count--;
      return newState;
    default:
      return state;
  }
}

// create store in global scope
const store = Redux.createStore(rootReducer);

$(document).ready(function() {
  let currentState = store.getState();
  $("#counter").text(currentState.count);

  $("#increment").on("click", function() {
    // dispatch some action to increment the count
    store.dispatch({
      type: "INCREMENT"
    });
    let currentState = store.getState();
    $("#counter").text(currentState.count);
  });

  $("#decrement").on("click", function() {
    // dispatch some action to decrement the count
    store.dispatch({
      type: "DECREMENT"
    });
    let currentState = store.getState();
    $("#counter").text(currentState.count);
  });
})