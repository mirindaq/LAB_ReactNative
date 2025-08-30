function getNumberAfterDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000); 
  });
}

getNumberAfterDelay().then((result) => {
  console.log(result); 
});
