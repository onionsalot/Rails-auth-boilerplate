import React from "react";
import { useUserContext } from "../../components/UserContext/UserContext";
const Dashboard = () => {
  const user = useUserContext().user
  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: {user ? user.email : "Not logged In"}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
