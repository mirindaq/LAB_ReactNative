function getRandomNumber() {
  return new Promise((resolve) => {
    const randomNum = Math.floor(Math.random() * 100);
    resolve(randomNum);
  });
}

getRandomNumber()
  .then((number) => {
    console.log("Random Number:", number);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
