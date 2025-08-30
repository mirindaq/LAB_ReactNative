
const fetchUser20 = async (id: number): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 2100);
  });
};

const fetchUserWithTimeout = async (id: number, timeout: number): Promise<User> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject("API call timed out!"), timeout);
  });

  const userPromise = fetchUser20(id);
  
  return Promise.race([userPromise, timeoutPromise]);
};

const runFetchWithTimeout = async () => {
  try {
    const user = await fetchUserWithTimeout(1, 2000);
    console.log(user);
  } catch (error) {
    console.error(error); 
  }
};

runFetchWithTimeout();
