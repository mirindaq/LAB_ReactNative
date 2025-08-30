const doSomething = (success: boolean): Promise<string>  => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Task succeeded!");
      } else {
        reject("Task failed!");
      }
    }, 1000);
  });
};

doSomething(true) 
  .then((msg) => {
    console.log("Success:", msg);
  })
  .catch((err) => {
    console.error("Error:", err);
  })
  .finally(() => {
    console.log("Done");
  });