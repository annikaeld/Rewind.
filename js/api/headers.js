import { load } from "../storage/load.js";
import { API_KEY } from "./constants.js";

export function headers(hasBody = false) {
    const headers = new Headers();

    const token = load("token");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
        if (API_KEY) {
            headers.append("X-Noroff-API-Key", API_KEY);
        }

    }

    return {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
    };
}
