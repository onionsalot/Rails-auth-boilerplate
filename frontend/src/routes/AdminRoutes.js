import { useUserContext } from "../components/UserContext/UserContext";
import React from "react";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useStore } from "../stores/userStore";

function AdminRoutes() {
  const user = useStore((state) => state.user);
  return (
    <Routes>
      <Route
          path="dashboard"
          element={
            <ProtectedRoute isAllowed={!!user && user.admin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
      />
    </Routes>
  );
}

export default AdminRoutes;
