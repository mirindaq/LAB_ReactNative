interface ToDo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

async function fetchCompletedTodos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos : ToDo[] = await response.json();
    const completedTodos = todos.filter(todo  => todo.completed);
    console.log(completedTodos);
}

fetchCompletedTodos();