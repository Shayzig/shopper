import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../store/user/user-action";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userService } from "../services/user.service";
import { NavLink } from "react-router-dom";

export default function LoginSignupRemote() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const loggedinUser = useSelector((state) => state.user.loggedinUser);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userCred = Object.fromEntries(fd);

    try {
      if (isLogin) {
        const user = await userService.login(userCred);
        dispatch(signin(user));
      } else {
        // METHOD-#1:.2 - Add user to the storage
        const user = await userService.signup(userCred);
        // METHOD-#1:.4 - Saving the updatedUser to the store (action)
        dispatch(signup(user));
      }
      // navigate("/");
    } catch (error) {
      // METHOD-#1:.5 - Setting the error
      setError(error.response.data);
    }
  }

  return (
    <div className="login-page">
      {loggedinUser ? (
        <NavLink to={`/profile`}>
          <h1 className="welcome">Welcome {loggedinUser.username}</h1>
        </NavLink>
      ) : (
        <>
          {isLogin && (
            <form onSubmit={handleSubmit} className="login-form">
              <h1>Login</h1>
              <input
                required
                type="text"
                name="username"
                id="username"
                placeholder="Your name"
              />

              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
              />
              {/* {error && <p>{error}</p>} */}
              <button>Login</button>
              <h4 onClick={() => setIsLogin((prevState) => !prevState)}>
                New here? click here to sign up
              </h4>
            </form>
          )}

          {/* // METHOD-#1:.1 Implment ui for sign up */}
          {!isLogin && (
            <div className="signup">
              <form onSubmit={handleSubmit} className="login-form">
                <h1>Sign up</h1>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your username"
                />
                {/* // METHOD-#1:.6 - Display the error */}
                {error && error.type === "username" && <p>{error.text}</p>}
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                />
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                />
                {error && error.type === "password" && <p>{error.text}</p>}
                <button>Sign up!</button>
                <h4 onClick={() => setIsLogin((prevState) => !prevState)}>
                  Already have an account? click here to login
                </h4>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
