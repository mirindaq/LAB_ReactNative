"use strict";
async function fetchCompletedTodos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();
    const completedTodos = todos.filter(todo => todo.completed);
    console.log(completedTodos);
}
fetchCompletedTodos();
