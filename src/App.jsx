// METHOD-#1: Sign up new user flow (login is the same logic...)
// METHOD-#2: Load the last loggedin user
// METHOD-#3: Update user details

// NOTE: userService.local - worknig with localStorage
// NOTE: userService - worknig with server && mongoDB


import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/styles/main.scss";
import "./assets/styles/setup/_typography.scss";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <LoginSignup /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
