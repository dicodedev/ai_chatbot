import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    chats: localStorage.getItem("chats"),
    sidebarState: "closed",
    sidebarIndex: 0,
    currentPage: "dashboard",
    toast: null,
    modalOpen: false,
    loading: false,
  },
  reducers: {
    setChats: (state, action) => {
      let value = JSON.stringify(action.payload);
      state.chats = value;
      localStorage.setItem("chats", value);
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
  setChats,

  setSidebarState,
  setCurrentPage,
  setSidebarIndex,
  setToastMessage,
  setModalState,
  setLoading,
} = appSlice.actions;

export default appSlice.reducer;
