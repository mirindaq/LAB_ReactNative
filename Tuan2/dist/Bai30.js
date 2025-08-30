"use strict";
async function fetchMany() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode2.com/213213123" // This URL will likely fail
    ];
    const results = await Promise.allSettled(urls.map(url => fetch(url)
        .then(res => {
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${url}`);
        }
        return res.json();
    })));
    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            console.log(`Success for URL ${i + 1}:`, result.value);
        }
        else {
            console.error(`Failed for URL ${i + 1}:`, result.reason);
        }
    });
}
fetchMany();
