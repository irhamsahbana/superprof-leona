import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: { role: "" },
  loginData: localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : {
        username: "",
        password: "",
        role: "",
      },
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      state.loginData = action.payload;
      localStorage.setItem("loginData", JSON.stringify(state.loginData));
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", JSON.stringify(state.role));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("loginData");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { login, logout, setRole } = userSlice.actions;
export default userSlice.reducer;
