async function downloadFile() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("File downloaded");
}

downloadFile();