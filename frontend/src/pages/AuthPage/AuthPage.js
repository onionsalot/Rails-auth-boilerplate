import React from "react";
import Registration from "../../components/Auth/Registration";
import Login from "../../components/Auth/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/app");
  }, []);

  return (
    <div>
      <div>
        <h1>AuthPage</h1>
        <Registration setUser={setUser} />
        <br />
        <Login setUser={setUser} />
      </div>
    </div>
  );
};

export default AuthPage;
