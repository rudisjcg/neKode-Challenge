import { configureStore } from "@reduxjs/toolkit";
import dogData from "./reducers/getDogdata";

export const store = configureStore({
  reducer: {
    app: dogData,
  },
});
