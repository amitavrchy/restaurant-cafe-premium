import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  reserveOpen: boolean;
  mobileNavOpen: boolean;
};

const initialState: UiState = {
  reserveOpen: false,
  mobileNavOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openReserve(state) {
      state.reserveOpen = true;
      state.mobileNavOpen = false;
    },
    closeReserve(state) {
      state.reserveOpen = false;
    },
    toggleReserve(state) {
      state.reserveOpen = !state.reserveOpen;
    },
    openMobileNav(state) {
      state.mobileNavOpen = true;
    },
    closeMobileNav(state) {
      state.mobileNavOpen = false;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
  },
});

export const {
  openReserve,
  closeReserve,
  toggleReserve,
  openMobileNav,
  closeMobileNav,
  toggleMobileNav,
} = uiSlice.actions;

export default uiSlice.reducer;
