import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedinUser: null,
  },
  reducers: {
    login(state, action) {
      state.loggedinUser = action.payload;
    },
    signout(state) {
      state.loggedinUser = null;
    },
    updateUser(state, action) {
      state.loggedinUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
