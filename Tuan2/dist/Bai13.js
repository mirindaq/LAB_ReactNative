"use strict";
const simulateTaskWithError = (success) => {
    return new Promise((resolve, reject) => {
        if (success) {
            resolve("Task succeeded!");
        }
        else {
            reject("Task failed!");
        }
    });
};
const runWithErrorHandling = async () => {
    try {
        const result = await simulateTaskWithError(false);
        console.log(result);
    }
    catch (error) {
        console.error("Error:", error);
    }
};
runWithErrorHandling();
