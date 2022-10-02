import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthPage from "../pages/AuthPage/AuthPage";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useUserContext } from "../components/UserContext/UserContext";
function UserRoutes() {
  const context = useUserContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/app" element={<Dashboard />} />
        <Route
          path="/app/login"
          element={
            <ProtectedRoute isAllowed={!context.user}>
              <AuthPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
