import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: localStorage.getItem("ACCESS_TOKEN"),
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem("ACCESS_TOKEN", action.payload);
    },
    unsetToken: (state) => {
      state.access_token = null;
      localStorage.removeItem("ACCESS_TOKEN");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, unsetToken } = authSlice.actions;

export default authSlice.reducer;
