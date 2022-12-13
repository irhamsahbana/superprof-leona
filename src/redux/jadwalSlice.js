import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jadwalList: [],
  loading: false,
};

const jadwalSlice = createSlice({
  name: "jadwal",
  initialState,
  reducers: {
    setJadwalList: (state, action) => {
      state.jadwalList = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    }
  },
});

export const { setJadwal, setSelectedData } = jadwalSlice.actions;
export default jadwalSlice.reducer;
