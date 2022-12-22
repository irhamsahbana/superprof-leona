import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dokter: [],
  selectedData: [],
  loading: true,
  validate: {
    general: false,
    specific: {
      add: false,
      edit: false,
      delete: false,
    },
  },
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
    },
    setValidate: (state, action) => {
      state.validate.general = action.payload;
    },
    // add, update, deletw
    setAdded: (state, action) => {
      state.validate.specific.add = action.payload;
    },
    setUpdated: (state, action) => {
      state.validate.specific.edit = action.payload;
    },
    setDeleted: (state, action) => {
      state.validate.specific.delete = action.payload;
    },
  },
});

export const {
  setDokter,
  setSelectedData,
  setLoading,
  setUpdated,
  setValidate,
  setAdded,
  setDeleted,
} = dokterSlice.actions;
export default dokterSlice.reducer;
