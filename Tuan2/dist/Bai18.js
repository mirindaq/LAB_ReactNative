"use strict";
const fetchUser = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
};
const runFetchUser = async () => {
    const user = await fetchUser(1);
    console.log(user);
};
runFetchUser();
