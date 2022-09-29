import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";
import { getCurrentUser } from "../helpers/users-api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = async () => {
      const response = await getCurrentUser()
      if (response && response.data.logged_in) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    }
    currentUser()
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="*"
            element={<UserRoutes user={user} setUser={setUser} />}
          />
          {/* <Route path="/admin" element={<AdminRoutes />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
