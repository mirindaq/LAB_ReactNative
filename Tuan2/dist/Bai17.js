"use strict";
const simulateTaskB17 = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    });
};
const runTasksInParallel = async () => {
    const tasks = [simulateTaskB17(1000), simulateTaskB17(1500), simulateTaskB17(2000)];
    for await (const result of tasks) {
        console.log(result);
    }
};
runTasksInParallel();
