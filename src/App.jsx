import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/styles/main.scss";
import "./assets/styles/setup/_typography.scss";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import { ProductIndex } from "./pages/ProductIndex";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:productType", element: <ProductIndex /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <LoginSignup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
