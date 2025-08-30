"use strict";
const simulateTaskWithError = (success) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve("Task succeeded!");
            }
            else {
                reject("Task failed!");
            }
        }, 1000);
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
