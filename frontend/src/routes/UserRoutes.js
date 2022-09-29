import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthPage from "../pages/AuthPage/AuthPage";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function UserRoutes({ user, setUser }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/app" element={<Dashboard user={user} />} />
        <Route
          path="/app/login"
          element={<AuthPage user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
