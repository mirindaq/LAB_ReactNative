
async function waitFiveSecond() {
  console.log("Waiting 5s...");
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Done waiting!");
}

waitFiveSecond();