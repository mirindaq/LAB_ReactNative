"use strict";
const fetchUser2 = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
};
const fetchUsers = async (ids) => {
    const users = [];
    for (const id of ids) {
        const user = await fetchUser2(id);
        users.push(user);
    }
    return users;
};
const runFetchUsers = async () => {
    const users = await fetchUsers([1, 2, 3]);
    console.log(users);
};
runFetchUsers();
