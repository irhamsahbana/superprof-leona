import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import UtilReducer from "./utilSlice";
import DokterReducer from "./dokterSlice";
import JadwalReducer from "./jadwalSlice";
import RekamMedisReducer from "./rekamMedisSlice"

const store = configureStore({
  reducer: {
    user: UserReducer,
    utils: UtilReducer,
    dokter: DokterReducer,
    jadwal: JadwalReducer,
    rekamMedis: RekamMedisReducer
  },
});

export default store;
