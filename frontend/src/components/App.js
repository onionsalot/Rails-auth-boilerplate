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
import { useStore } from "../stores/userStore";
import Cookies from "js-cookie"
import { useAuth } from "../queries/use-auth"

function App() {
  // const [user, setUser] = useState(null)
  // const queryClient = useQueryClient()
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { getCurrentUser } = useAuth()

  return (
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
  );
}

export default App;
