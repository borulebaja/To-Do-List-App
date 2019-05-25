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
