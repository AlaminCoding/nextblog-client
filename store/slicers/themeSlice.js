import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  light: true,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightThemeOn: (state) => {
      state.light = true;
    },
    lightThemeOff: (state) => {
      state.light = false;
    },
  },
});

export const { lightThemeOn, lightThemeOff } = themeSlice.actions;

export default themeSlice.reducer;
