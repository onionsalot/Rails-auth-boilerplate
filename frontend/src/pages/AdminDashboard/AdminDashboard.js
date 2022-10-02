import React from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

function AdminDashboard() {
  const GET_POLLS = gql`
    {
      users {
        id
        email
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POLLS)
  if (loading) return 'Loading...'
  if (error) return `Error :  ${error.message}`

  return(
    <>
      <h1>Admin Dashboard</h1>
      {
        data.users.map((user) => {
          return <li>{user.email}</li>
        })
      }
    </>
  )
}

export default AdminDashboard;
