import { useUserContext } from "../components/UserContext/UserContext";
import React from "react";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function AdminRoutes() {
  const context = {};
  return (
    <Routes>
      <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAllowed={!!context.user && context.user.admin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
      />
    </Routes>
  );
}

export default AdminRoutes;
