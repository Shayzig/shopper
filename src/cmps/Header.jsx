import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { signout } from "../store/user/user-action";

export default function Header() {
  const loggedinUser = useSelector((state) => state.user.loggedinUser);
  const dispatch = useDispatch();

  function handeleSignout() {
    dispatch(signout());
  }

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <h3>Login</h3>
        </NavLink>
      </div>

      {loggedinUser && (
        <div className="user">
          <p className="loggedin-user">
            Loggedin User: {loggedinUser.username}
          </p>
          <p className="loggedin-user">User Score: {loggedinUser.score}</p>
        </div>
      )}

      {loggedinUser ? (
        <NavLink to='/'>
          <button onClick={handeleSignout}>Signout</button>
        </NavLink>
      ) : (
        <NavLink to={"/login"}>
          <button>Login</button>
        </NavLink>
      )}
    </header>
  );
}
