import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: localStorage.getItem("USER"),
    sidebarState: "closed",
    sidebarIndex: 0,
    currentPage: "dashboard",
    toast: null,
    modalOpen: false,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("USER", JSON.stringify(action.payload));
    },
    setSidebarState: (state, action) => {
      state.sidebarState = action.payload;
    },
    setSidebarIndex: (state, action) => {
      state.sidebarIndex = action.payload;
      state.sidebarState = "closed";
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setToastMessage: (state, action) => {
      state.toast = action.payload;
    },
    setModalState: (state, action) => {
      state.modalOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setSidebarState,
  setCurrentPage,
  setSidebarIndex,
  setToastMessage,
  setModalState,
  setLoading,
} = appSlice.actions;

export default appSlice.reducer;
