const simulateTask12 = (time: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task done after ${time} ms`);
    }, time);
  });
};

const runTask = async () => {
  const result = await simulateTask12(2000);
  console.log(result);
};

runTask();
