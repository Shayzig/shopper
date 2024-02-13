import { Outlet } from "react-router";
import Header from "../cmps/Header";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <div className="main-layout">
        <Outlet />
      </div>
    </div>
  );
}
