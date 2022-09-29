import React from 'react';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import {
  Routes,
  Route,
} from "react-router-dom";

function AdminRoutes({ admin, setAdmin}) {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard admin={admin} />} />
      </Routes>
    </>
  )
}

export default AdminRoutes;