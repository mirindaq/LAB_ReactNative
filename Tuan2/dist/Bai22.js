"use strict";
async function fetchMultipleTodos() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3"
    ];
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(promises);
    console.log(results);
}
fetchMultipleTodos();
