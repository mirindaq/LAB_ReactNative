"use strict";
const getHelloAsync = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
};
// Using async/await
const runAsync = async () => {
    const message = await getHelloAsync();
    console.log(message); // Output: "Hello Async"
};
runAsync();
