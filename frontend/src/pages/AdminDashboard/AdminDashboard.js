import React from "react";
import { useRequest } from "../../hooks/use-request"
import { useStore } from "../../stores/userStore";
import AddProductForm from "../../components/AddProductForm/AddProductForm"

const AdminDashboard = () => {
  const user = useStore((state) => state.user);
  const { getAllUsers } = useRequest()
  const { getAllProducts } = useRequest()

  if (getAllUsers.error || getAllProducts.isError) return <h1>Something went wrong!</h1>;
  if (getAllUsers.isLoading || getAllProducts.isError) return <h1>Loading...</h1>;

  return(
    <>
      <h1>Admin Dashboard</h1>
      <h3>All Users -</h3>
      {
        user.admin && getAllUsers.isSuccess && (
          getAllUsers.data.data.data.users.map((user) => {
            return <li>ID: {user.id} || Name: {user.fullName}</li>
          })
        )
      }

      <hr />
      <h3>Add Product -</h3>
      <AddProductForm />

      <hr />
      <h3>Edit Product -</h3>

      <hr />
      <h3>All Products -</h3>
      {
        user.admin && getAllProducts.isSuccess && (
          getAllProducts.data.data.data.products.map((product) => {
            return <li>ID: {product.id} || Name: {product.name}</li>
          })
        )
      }
    </>
  )
}

export default AdminDashboard;
