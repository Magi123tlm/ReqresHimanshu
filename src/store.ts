import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer from "./slice";

const store = configureStore({
  reducer: {
    user: mySliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
