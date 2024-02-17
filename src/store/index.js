import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

store.subscribe(() => {
    console.log("Current state:", store.getState().user);
  });
  

export default store;
