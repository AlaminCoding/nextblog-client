import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "store/slicers/themeSlice";
import userReducer from "store/slicers/userSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});
