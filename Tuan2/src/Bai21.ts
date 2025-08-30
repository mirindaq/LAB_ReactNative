function fetchTodoWithPromise() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => {
        if (!response.ok) {
          return reject("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

fetchTodoWithPromise()
  .then(data => console.log(data)) 
  .catch(error => console.log(error));
