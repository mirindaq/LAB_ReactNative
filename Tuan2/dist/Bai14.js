"use strict";
const multiplyByThree = async (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
};
const runMultiplication = async () => {
    const result = await multiplyByThree(5);
    console.log(result);
};
runMultiplication();
