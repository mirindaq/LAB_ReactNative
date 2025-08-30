"use strict";
const fetchUser20 = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
};
const fetchUserWithTimeout = async (id, timeout = 2000) => {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject("API call timed out!"), timeout);
    });
    const userPromise = fetchUser20(id);
    return Promise.race([userPromise, timeoutPromise]);
};
const runFetchWithTimeout = async () => {
    try {
        const user = await fetchUserWithTimeout(1, 1500);
        console.log(user);
    }
    catch (error) {
        console.error(error);
    }
};
runFetchWithTimeout();
