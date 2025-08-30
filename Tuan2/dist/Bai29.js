"use strict";
async function taskBai29(i) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Task ${i} done`;
}
async function queueProcess() {
    for (let i = 1; i <= 5; i++) {
        const result = await taskBai29(i);
        console.log(result);
    }
}
queueProcess();
