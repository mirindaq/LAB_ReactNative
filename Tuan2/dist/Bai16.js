"use strict";
const taskB1 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 1 done");
        }, 1000);
    });
};
const taskB2 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 2 done");
        }, 1500);
    });
};
const runParallelTasks = async () => {
    const results = await Promise.all([taskB1(), taskB2()]);
    console.log(results);
};
runParallelTasks();
