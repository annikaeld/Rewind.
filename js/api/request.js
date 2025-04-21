export async function request(url, method, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return { response, data };
}