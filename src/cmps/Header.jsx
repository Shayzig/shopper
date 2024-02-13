import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <h3>Shopper</h3>
        {/* img logo */}
      </div>
      <nav>
        <ul className="nav-list">
          <NavLink
            to={"/mens"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>Mens</li>
          </NavLink>
          <NavLink
            to={"/womens"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>Womens</li>
          </NavLink>
          <NavLink
            to={"/kids"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>Kids</li>
          </NavLink>
        </ul>
      </nav>

      <div className="user">
        <NavLink to={'/login'}>
          <button>Login</button>
        </NavLink>
        <NavLink to={'/cart'}>
          <button>Cart</button>
        </NavLink>
      </div>
    </header>
  );
}
