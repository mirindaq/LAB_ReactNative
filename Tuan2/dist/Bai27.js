"use strict";
async function fetchWithRetry(url, retries) {
    let lastError;
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`Thử lần ${i}...`);
            const res = await fetch(url);
            if (!res.ok)
                throw new Error(`Lỗi HTTP: ${res.status}`);
            const data = await res.json();
            console.log("Thành công!");
            return data;
        }
        catch (err) {
            console.error(`Lỗi lần ${i}:`, err);
            lastError = err;
        }
    }
    throw new Error(`Thất bại sau ${retries} lần thử: ${lastError}`);
}
fetchWithRetry("https://jsonplaceholder.typicode.com/todos22", 5);
