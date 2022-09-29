import React from 'react';
import Logout from '../Auth/Logout';

const Dashboard = ({ user, setUser }) => {
  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: { user ? user.email : "Not logged In"}</h1>
        <Logout setUser={setUser}/>
      </div>
    </div>
  )
}

export default Dashboard;