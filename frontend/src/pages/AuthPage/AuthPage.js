import React from "react";
import Registration from "../../components/Auth/Registration";
import Login from "../../components/Auth/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  return (
    <div>
      <div>
        <h1>AuthPage</h1>
        <Registration />
        <br />
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;
