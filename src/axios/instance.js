import axios from "axios";
const development = false;

//https://project-zone-server.azurewebsites.net/
//http://3.89.10.126:5000/
const url = development
  ? "http://localhost:8000"
  : "https://project-zone-server.vercel.app";

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const login = (data) => server.post(`${url}/signin`, data);
export const googlelogin = (data) => server.post(`${url}/google-signin`, data);
export const signup = (data) => server.post(`${url}/signup`, data);
export const forgetpassword = (data) =>
  server.post(`${url}/send-forgetpassword-email`, data);
export const SetNewPassword = (data) =>
  server.post(`${url}/reset-password`, data);
export const profile = () => server.get(`${url}/profile`);
export const GetUserProfile = (data) => server.post(`${url}/user-by-id`, data);
export const UpdateUserData = (data) =>
  server.patch(`${url}/update-user-dashboard`, data);
export const addproject = (data) => server.post(`${url}/addproject`, data);
export const sendmessage = (data) =>
  server.post(`${url}/send-contact-email`, data);
export const sendverifyemail = () => server.get(`${url}/send-verify-email`);
export const verifyemail = (data) => server.post(`${url}/verify-email`, data);
export const AddComment = (data) => server.patch(`${url}/add-comment`, data);
export const AddLike = (data) => server.patch(`${url}/add-like`, data);
export const AddNewRating = (data) =>
  server.patch(`${url}/add-new-rating`, data);
export const UpvoteComment = (data) =>
  server.patch(`${url}/upvote-comment`, data);
export const AddBadge = (data) => server.patch(`${url}/add-badge`, data);
export const AddFollower = (data) => server.patch(`${url}/addfollower`, data);
export const GetSingleProject = (data) =>
  server.post(`${url}/project-by-id`, data);
