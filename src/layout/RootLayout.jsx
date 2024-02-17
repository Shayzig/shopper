import { Outlet } from "react-router";
import Header from "../cmps/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user/user-slice";
import { userService } from "../services/user.service";

export default function RootLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    // METHOD-#2:.1 Invoke this function when app it open
    loadLoggedinUser();
  }, []);

  function loadLoggedinUser() {
    // METHOD-#2:.2 Getting the loggedin user from the sessionStorage and setting it at the user store
    const user = userService.getLoggedinUser();
    dispatch(userActions.login(user));
  }
  return (
    <div>
      <Header />
      <div className="main-layout">
        <Outlet />
        <h1>{JSON.stringify(import.meta.env.VITE_REACT_API)}</h1>
      </div>
    </div>
  );
}
