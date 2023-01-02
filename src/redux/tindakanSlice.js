import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false, // on kasir
};

const tindakanSlice = createSlice({
  name: "tindakan",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const { setOpenModal } = tindakanSlice.actions;
export default tindakanSlice.reducer;
