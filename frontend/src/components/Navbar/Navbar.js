import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useStore } from "../../stores/userStore";

const NavBar = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="NavBar">
      <h2>Navbar</h2>
      <Link to="/app">DashBoard</Link>
      {user && user.admin ? (
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      ) : (
        ""
      )}
      {user ? (
        <>
          <h3>current user: {user.email}</h3> <Logout />{" "}
        </>
      ) : (
        <Link to="/app/login">Auth Page</Link>
      )}
    </div>
  );
};
export default NavBar;
