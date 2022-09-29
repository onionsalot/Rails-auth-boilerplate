import React from "react";

const Dashboard = ({ user, setUser }) => {
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
