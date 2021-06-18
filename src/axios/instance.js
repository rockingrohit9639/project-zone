import axios from "axios";

export const server = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})