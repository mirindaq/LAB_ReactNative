interface ToDo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}


async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  console.log(result);
}

const newData = { userId: 1, title: "New Todo2", completed: false };
postData("https://jsonplaceholder.typicode.com/todos", newData);