"use strict";
function rejectAfterDelay() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
}
rejectAfterDelay()
    .catch((error) => {
    console.log(error);
});
