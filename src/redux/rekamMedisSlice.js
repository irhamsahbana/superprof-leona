import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rekamMedisQuery: "",
  rekamMedisResults: [],
  patientToEdit: [],
  transactionToEdit: [],
};

const rekamMedisSlice = createSlice({
  name: "rekem medis and tindakan",
  initialState,
  reducers: {
    setRekamMedisQuery: (state, action) => {
      state.rekamMedisQuery = action.payload;
    },
    setRekamMedisResults: (state, action) => {
      state.rekamMedisResults = action.payload;
    },
    setTreatmentsTakenToday: (state, action) => {
      // to throw to edit kasir table
      state.patientToEdit = action.payload;
      state.transactionToEdit = action.payload;
    },
  },
});

export const { setRekamMedisQuery, setRekamMedisResults, setTreatmentTakenToday } =
  rekamMedisSlice.actions;
export default rekamMedisSlice.reducer;
