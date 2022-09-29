import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
const NavBar = ({ user, setUser }) => {
  return (
    <div className="NavBar">
      <h2>Navbar</h2>
      {user ? "" : <Link to="/app/login">Auth Page</Link>}
      <Link to="/app">DashBoard</Link>
      {user && user.admin ? <li>Admin Dashboard</li> : ""}
      {user ? (
        <>
          <h3>current user: {user.email}</h3> <Logout setUser={setUser} />{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default NavBar;
