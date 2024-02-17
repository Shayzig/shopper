// import { userService } from "../../services/user.service.local";
import { userService } from "../../services/user.service";
import userSlice, { userActions } from "./user-slice";

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.login(user));
    } catch (error) {
      console.log("action:", error);
    }
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.login(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      const user = await userService.logout();
      dispatch(userActions.signout());
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    try {
      // METHOD-#3:2 - Update the user in the server 
      const user = await userService.update(updatedUser);
      // METHOD-#3:.4 - Saving the updated user to the store
      dispatch(userActions.updateUser(user));
    } catch (error) {}
  };
};
