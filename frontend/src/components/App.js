import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";
import { getCurrentUser } from "../helpers/users-api";
import { UserContextProvider } from "../components/UserContext/UserContext";
import ProtectedRoutes from "../routes/ProtectedRoute";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route
            path="*"
            element={<UserRoutes />}
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard/>} /> */}
        </Routes>
      </Router>
      </UserContextProvider>
  );
}

export default App;
