import React from "react";
import { useGetProduct, useGetProducts } from "../../queries/use-request"
import { useStore } from "../../stores/userStore";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const { data, error, isLoading, isSuccess } = useGetProduct(1);
  const products = useGetProducts();

  if (error || products.isError) return <h1>Something went wrong!</h1>;
  if (isLoading || products.isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: {user ? "Logged In" : "Not logged In"}</h1>
        <hr />
        <h3>One Product -</h3>
        {   
          isSuccess ? <li>{data.data.data.product.id} | {data.data.data.product.name} | {data.data.data.product.description}</li> : ""
        }
        <hr />
        <h3>All Products -</h3>
        { 
          products.isSuccess && (
            products.data.data.data.products.map((product) => {
              return <li>{product.name}</li>
            })
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
