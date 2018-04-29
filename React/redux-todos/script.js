const initialState = {
  todos: [],
  id: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      var newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, { task: action.task, id: newState.id, completed: false }]
      };
    case 'REMOVE_TODO':
      var todos = state.todos.filter(val => val.id !== +action.id);
      return { ...state, todos };
    case 'UPDATE_TODO':
      var todos = state.todos.map(val => (
        (val.id === +action.id) ? { ...val, completed: !val.completed } : val
      ));
      return { ...state, todos };
    default:
      return state;
  }
}

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

$(document).ready(function() {
  // remove todo
  $("ul").on("click", "button", function(e) {
    store.dispatch({
      type: "REMOVE_TODO",
      id: $(e.target).parent().attr("id")
    });

    $(e.target)
      .parent()
      .remove();
  });
  // add todo
  $("form").on("submit", function(e) {
    e.preventDefault();

    let newTask = $("#task").val();
    store.dispatch({
      type: "ADD_TODO",
      task: newTask
    })

    let currentState = store.getState();
    let $newLi = $("<li>", { id: currentState.id });
    let $newSpan = $("<span>", { text: newTask });
    let $newButton = $("<button>", { text: "X" });

    $newLi.append($newSpan).append($newButton);
    $("#todos").append($newLi);
    
    // reset form value
    $("form").trigger("reset");
  });
  // update todo
  $("ul").on("click", "span", function(e) {
    const id = $(e.target).parent().attr("id");
    store.dispatch({
      type: "UPDATE_TODO",
      id
    });

    let currentState = store.getState();
    const updatedTodo = currentState.todos.find(val => val.id === +id);
    $(e.target).css("text-decoration", updatedTodo.completed ? "line-through" : "none");
  });
})