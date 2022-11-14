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

function App() {
  // const [user, setUser] = useState(null)
  // const queryClient = useQueryClient()
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useQuery('user', getCurrentUser, {
    onSuccess: (data) => {
      console.log(data)
      if (data?.data.is_logged_in) {
        setUser(data?.data.data)
      } else {
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
      }
    },
    staleTime: 120000,
    onError: (e) => {
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
    }
  })
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
