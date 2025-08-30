async function task(i: number): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Task ${i} done`;
}

async function batchProcess() {
    const results = await Promise.all([
        task(1), task(2), task(3), task(4), task(5)
    ]);
    console.log(results);
}

batchProcess();