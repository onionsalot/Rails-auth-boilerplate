import React from "react";
import { useStore } from "../../stores/userStore";
const Dashboard = () => {
  const user = useStore((state) => state.user);
  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: {user ? "Logged In" : "Not logged In"}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
