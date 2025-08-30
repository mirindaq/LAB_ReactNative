function simulateTaskWithTime(time : number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task done after ${time} ms`);
    }, time);
  });
}

Promise.all([
  simulateTaskWithTime(1000),
  simulateTaskWithTime(2000),
  simulateTaskWithTime(3000)
]).then((results) => {
  console.log(results); 
});