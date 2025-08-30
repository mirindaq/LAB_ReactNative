"use strict";
function filterEvenNumbers(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evenNumbers = arr.filter((num) => num % 2 === 0);
            resolve(evenNumbers);
        }, 1000);
    });
}
filterEvenNumbers([1, 2, 3, 4, 5, 6])
    .then((result) => {
    console.log("Even Numbers:", result);
});
