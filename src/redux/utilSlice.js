import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  showProfileDropdown: false,
  statusJadwal : ""
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
    },
    setStatusJadwal: (state, action) => {
    state.statusJadwal = action.payload;
    }
  },
});

export const { setShowSidebar, setShowProfileDropdown, setStatusJadwal } = utilSlice.actions;
export default utilSlice.reducer;
