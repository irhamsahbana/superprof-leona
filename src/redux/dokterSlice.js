import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dokter: [],
  selectedData: [],
  loading: true,
};

const dokterSlice = createSlice({
  name: "dokter",
  initialState,
  reducers: {
    setDokter: (state, action) => {
      state.dokter = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setDokter, setSelectedData, setLoading } = dokterSlice.actions;
export default dokterSlice.reducer;
