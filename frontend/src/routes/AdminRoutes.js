import React from 'react';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import {
  Routes,
  Route,
} from "react-router-dom";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard/>} />
      </Routes>
    </>
  )
}

export default AdminRoutes;