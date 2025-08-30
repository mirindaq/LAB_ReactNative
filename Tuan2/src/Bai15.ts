const task1 = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 1 done");
    }, 1000);
  });
};

const task2 = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 2 done");
    }, 1500);
  });
};

const runSequentialTasks = async () => {
  const result1 = await task1();
  console.log(result1);
  const result2 = await task2();
  console.log(result2);
};

runSequentialTasks();
