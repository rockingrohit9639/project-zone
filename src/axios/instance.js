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
export const googlelogin = (data) => server.post(`${url}/google-signin`,data);
export const signup = (data) => server.post(`${url}/signup`, data);
export const profile = () => server.get(`${url}/profile`);
export const UpdateUserData = (data) =>
  server.patch(`${url}/update-user-dashboard`, data);
export const forgetpassword = (data) =>
  server.post(`${url}/send-forgetpassword-email`, data);
export const SetNewPassword = (data) =>
  server.post(`${url}/reset-password`, data);
export const addproject = (data) => server.post(`${url}/addproject`, data);
export const sendmessage = (data) =>
  server.post(`${url}/send-contact-email`, data);
export const sendverifyemail = () => server.get(`${url}/send-verify-email`);
export const verifyemail = (data) => server.post(`${url}/verify-email`, data);
