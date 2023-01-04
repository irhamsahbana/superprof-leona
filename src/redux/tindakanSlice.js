import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false, // on kasir; idek tbh
  selectedPatient: {}, // selected patient whose tindakan you want to add
  selectedPatientsTreatment: [], // selected patients treatment
};

const tindakanSlice = createSlice({
  name: "tindakan",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setSelectedPatientsTreatment: (state, action) => {
      state.selectedPatientsTreatment = action.payload;
    },
  },
});

export const {
  setOpenModal,
  setSelectedPatient,
  setSelectedPatientsTreatment,
} = tindakanSlice.actions;
export default tindakanSlice.reducer;
