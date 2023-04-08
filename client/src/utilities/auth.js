import axios from "axios";
import { baseUrl, signUp, login, authenticate } from "../constants/endpoints";

export const handleSignup = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + signUp, { name, email, password })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const handleLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + login, { email, password })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const handleAuthenticate = async () => {
  var token = localStorage.getItem("auth-token");
  if (!token) {
    window.location.href = "./";
  }
  axios
    .post(baseUrl + authenticate, { token })
    .then((res) => {
      if (res.data.error) {
        window.location.href = "./";
      }
    })
    .catch((err) => console.log(err));
};
