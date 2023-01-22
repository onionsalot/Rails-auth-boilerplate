import React from "react";
import { useGetUsers } from "../../queries/use-request"
import { useStore } from "../../stores/userStore";

const AdminDashboard = () => {
  const user = useStore((state) => state.user);
  const { data, error, isLoading, isSuccess } = useGetUsers();

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return(
    <>
      <h1>Admin Dashboard</h1>
      {
        user.admin && isSuccess && (
          data.daya.data.users.map((user) => {
            return <li>{user.email}</li>
          })
        )
      }
    </>
  )
}

export default AdminDashboard;
