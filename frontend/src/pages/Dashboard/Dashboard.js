import React from "react";
import { useBoundStore } from "../../stores/useBoundStore";
import { useRequest } from "../../hooks/use-request"

const Dashboard = () => {
  const user = useBoundStore((state) => state.user);
  const { getAllProducts } = useRequest()
  const { getOneProduct } = useRequest(1)

  if (getAllProducts.error || getOneProduct.isError) return <h1>Something went wrong!</h1>;
  if (getAllProducts.isLoading || getOneProduct.isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: {user ? "Logged In" : "Not logged In"}</h1>
        <hr />
        <h3>One Product -</h3>
        {   
          getOneProduct.isSuccess ? <li>{getOneProduct.data.data.data.product.id} | {getOneProduct.data.data.data.product.name} | {getOneProduct.data.data.data.product.description}</li> : ""
        }
        <hr />
        <h3>All Products -</h3>
        { 
          getAllProducts.isSuccess && (
            getAllProducts.data.data.data.products.map((product) => {
              return <li>{product.name}</li>
            })
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
