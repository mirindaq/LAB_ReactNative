"use strict";
new Promise((resolve) => {
    resolve(2);
})
    .then((num) => num * num)
    .then((num) => num * 2)
    .then((num) => num + 5)
    .then((result) => {
    console.log("Result:", result);
});
