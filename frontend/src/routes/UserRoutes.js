import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthPage from "../pages/AuthPage/AuthPage";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useUserContext } from "../components/UserContext/UserContext";
import ResetPassword from "../components/Auth/ResetPassword";
function UserRoutes() {
  const context = { user : null};
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
        <Route
          path="/app/reset"
          element={
            <ProtectedRoute isAllowed={!context.user}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
