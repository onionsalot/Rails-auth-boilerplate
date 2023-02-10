import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";
import { getCurrentUser } from "../helpers/users-api";
import { UserContextProvider } from "../components/UserContext/UserContext";
import ProtectedRoutes from "../routes/ProtectedRoute";
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient, useQuery } from 'react-query'; 
import DefaultToaster from '../lib/toaster'
import { useAuth } from "../hooks/use-auth"
import { useBoundStore } from "../stores/useBoundStore";

function App() {
  const setUser = useBoundStore((state) => state.setUser)
  const { getCurrentUserQuery } = useAuth()
  if (getCurrentUserQuery.isSuccess) setUser(getCurrentUserQuery?.data?.data?.data)

  return (
    <>
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
      <DefaultToaster/>
    </>
  );
}

export default App;
