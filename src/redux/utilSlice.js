import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  showProfileDropdown: false
};

const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setShowProfileDropdown: (state, action) => {
      state.showProfileDropdown = action.payload;
    }
  },
});

export const { setShowSidebar, setShowProfileDropdown } = utilSlice.actions;
export default utilSlice.reducer;

//TOOD: set timeout for logout button, if ga lama di klik, unshow it