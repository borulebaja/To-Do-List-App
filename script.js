//DECLARATIVE FUNCTIONS

const storageKey = "my_todos";

//localStorage only stores strings
const convertStringToObj = str => JSON.parse(str) || [];

const convertObjToString = obj => JSON.stringify(obj) || "";

//get todos from localStorage
const getTodos = () => convertStringToObj(localStorage.getItem(storageKey));

// //add todos to localStorage
const addTodo = todo =>
  localStorage.setItem(storageKey, convertObjToString([...getTodos(), todo]));

//create or build a todo list function
const createTodoElement = todo => {
  const element = document.createElement("li"); //create a list item
  element.classList.add("list-group-item"); //a bootstrap class
  element.innerText = todo;
  return element;
};

//delete todos from localStorage
const deleteTodo = todo =>
  localStorage.setItem(
    storageKey,
    convertObjToString(getTodos().filter(_todo => _todo !== todo))
  );

//to inject to ul
const appendLiToDOM = element =>
  document.getElementById("todo-list-container").appendChild(element);

const clearTodoListDisplay = () =>
  (document.getElementById("todo-list-container").innerHTML = "");

const clearInput = () => (document.getElementById("new-todo-input").value = "");

const displayTodos = () => {
  clearInput();
  clearTodoListDisplay();
  getTodos().forEach(_todo => appendLiToDOM(createTodoElement(_todo)));
  initClickListeners();
};

const initClickListeners = () => {
  Array.from(document.getElementsByClassName("list-group-item")).forEach(
    _item => {
      _item.addEventListener("click", $event => {
        const todo = $event.target.innerText;
        if (window.confirm("Have you completed this task: " + todo)) {
          deleteTodo(todo);
          displayTodos();
        }
      });
    }
  );
};

document.addEventListener("DOMContentLoaded", () => displayTodos());

document
  .getElementById("submit-new-todo-btn")
  .addEventListener("click", $event => {
    const newTodoInput = document.getElementById("new-todo-input");
    if (newTodoInput.value) {
      addTodo(newTodoInput.value.trim());
      displayTodos();
    }
  });

document
  .getElementById("reset-storage-btn")
  .addEventListener("click", $event => {
    localStorage.removeItem(storageKey);
    displayTodos();
  });
