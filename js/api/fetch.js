import { headers } from "./headers.js";

export async function authFetch(url, options = { method: "GET" }) {
    const requestOptions = {
        ...options,
        headers: headers(Boolean(options.body)),
    };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Response Error Body:", errorBody);
        }

        return response;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}