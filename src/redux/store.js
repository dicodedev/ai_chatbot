import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/AppSlice";
import authReducer from "./slices/AuthSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});
