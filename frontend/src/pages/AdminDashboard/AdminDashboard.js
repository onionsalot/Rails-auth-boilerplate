import React from "react"
import { useRequest } from "../../hooks/use-request"
import { useBoundStore } from "../../stores/useBoundStore"
import AddProductForm from "../../components/AddProductForm/AddProductForm"
import Product from "../../components/Product/Product"
import EditProductForm from "../../components/EditProductForm/EditProductForm"

const AdminDashboard = () => {
  const user = useBoundStore((state) => state.user)
  const { getAllUsers } = useRequest()
  const { getAllProducts } = useRequest()

  if (getAllUsers.error || getAllProducts.isError) return <h1>Something went wrong!</h1>
  if (getAllUsers.isLoading || getAllProducts.isError) return <h1>Loading...</h1>

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
      <EditProductForm />

      <hr />
      <h3>All Products -</h3>
      {
        user.admin && getAllProducts.isSuccess && (
          getAllProducts.data.data.data.products.map((product) => {
            return <Product product={product}/>
          })
        )
      }
    </>
  )
}

export default AdminDashboard
