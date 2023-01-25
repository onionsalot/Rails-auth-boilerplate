import { useQuery } from "react-query";
import axios from "../lib/axios";

const API_URL = `http://localhost:3000/graphql`;

export function useGetProducts() {
  return useQuery("get-products", async () => {
    const getProductList = axios({
      url: API_URL,
      method: 'POST',
      data: {
        query: `
           {
            products {
              id
              name
            }
          }
        `
      }
    })
    return getProductList;
  });
}

export function useGetUsers() {
  return useQuery("get-users", async () => {
    const getUserList = axios({
      url: API_URL,
      method: 'POST',
      data: {
        query: `
          {
            users {
              id
              fullName
            }
          }
        `
      }
    })
    return getUserList;
  });
}

export function useGetProduct(productId) {
  return useQuery(["get-product", productId], async () => {
    const getProductList = axios({
      url: API_URL,
      method: 'POST',
      data: {
        query: `
          query product($id: ID!) {
            product(id: $id) {
              id
              name
              description
            }
          }
        `,
        variables: { id: productId }
      }
    })
    console.log('getProductList =>', getProductList)
    return getProductList;
  });
}