interface User {
  id: number;
  name: string;
}

const fetchUser = async (id: number): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 1000);
  });
};

const runFetchUser = async () => {
  const user = await fetchUser(1);
  console.log(user);
};

runFetchUser();
