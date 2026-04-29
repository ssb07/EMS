// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth"
// });

// // LOGIN
// export const loginUser = async (data) => {
//   const res = await API.post("/login", data);

//   return {
//     token: res.data.token,
//     user: res.data.user // optional depending on backend
//   };
// };

// // SIGNUP
// export const signupUser = async (data) => {
//   const res = await API.post("/signup", data);

//   return res.data;
// };





// src/api/auth.js

export const loginUser = async ({ email, password }) => {
  await new Promise((res) => setTimeout(res, 500)); // simulate delay

  // fake validation
  if (email === "test@gmail.com" && password === "123456") {
    return {
      token: "demo-token",
      user: { name: "Test User", email }
    };
  } else {
    throw {
      response: {
        data: { msg: "Invalid credentials" }
      }
    };
  }
};

export const signupUser = async ({ name, email, password }) => {
  await new Promise((res) => setTimeout(res, 500));

  return {
    message: "Signup successful"
  };
};
