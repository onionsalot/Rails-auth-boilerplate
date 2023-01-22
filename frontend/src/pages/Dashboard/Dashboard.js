import React from "react";
import { useGetProducts } from "../../queries/use-request"
import { useStore } from "../../stores/userStore";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const { data, error, isLoading, isSuccess } = useGetProducts();

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <h1>Status: {user ? "Logged In" : "Not logged In"}</h1>
        { 
          isSuccess && (
            data.data.data.products.map((product) => {
              return <li>{product.name}</li>
            })
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
