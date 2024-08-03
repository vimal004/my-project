import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
