import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import UtilReducer from "./utilSlice";
import DokterReducer from "./dokterSlice";
import JadwalReducer from "./jadwalSlice";
import RekamMedisReducer from "./rekamMedisSlice";
import TindakanReducer from "./tindakanSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    utils: UtilReducer,
    dokter: DokterReducer,
    jadwal: JadwalReducer,
    rekamMedis: RekamMedisReducer,
    tindakan: TindakanReducer,
  },
});

export default store;
