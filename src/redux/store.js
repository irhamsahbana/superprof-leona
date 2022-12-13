import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import UtilReducer from "./utilSlice";
import DokterReducer from "./dokterSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    utils: UtilReducer,
    dokter: DokterReducer,
  },
});

export default store;
