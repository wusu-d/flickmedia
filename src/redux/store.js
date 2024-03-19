import { configureStore } from "@reduxjs/toolkit";
import weatherSliceReducer from "./weatherSlice";

export const store = configureStore({
  reducer: { weather: weatherSliceReducer },
});
