import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import UtilReducer from "./utilSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    utils: UtilReducer,
  },
});

export default store;
