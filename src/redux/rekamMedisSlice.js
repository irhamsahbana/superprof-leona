import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rekamMedisQuery: "",
    rekamMedisResults: [],
};

const rekamMedisSlice = createSlice({
  name: "rekem medis",
  initialState,
  reducers: {
    setRekamMedisQuery: (state, action) => {
      state.rekamMedisQuery = action.payload;
    },
    setRekamMedisResults: (state, action) => {
        state.rekamMedisResults = action.payload;
    }
  },
});

export const { setRekamMedisQuery, setRekamMedisResults} = rekamMedisSlice.actions;
export default rekamMedisSlice.reducer;
