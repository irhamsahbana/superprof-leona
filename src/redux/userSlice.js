import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "Admin Leona",
    type: "admin",
    username: "admin",
    password: "admin123",
  },
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("registerData");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
