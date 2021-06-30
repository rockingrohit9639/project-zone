import axios from "axios";

const url = "http://localhost:8000";

export const server = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const login = (data) => server.post(`${url}/signin`, data);
export const signup = (data) => server.post(`${url}/signup`, data);
export const profile = () => server.get(`${url}/profile`);
export const UpdateUserData = (data) =>
  server.patch(`${url}/update-user-dashboard`, data);
