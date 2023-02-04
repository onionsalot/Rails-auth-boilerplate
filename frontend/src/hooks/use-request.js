import { useQuery } from "react-query";
import axios from "../lib/axios";

const API_URL = `http://localhost:3000/graphql`;

export const useRequest = (id = null) => {
  // Product Requests

  const getAllProducts = useQuery("get-all-products", async () => {
    const products = axios({
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
    return products
  }, {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const getOneProduct = useQuery(["get-one-product", id], async () => {
    const product = axios({
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
        variables: { id: id }
      }
    })
    console.log('getProduct =>', product)
    return product;
  }, {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  // User Requests

  const getAllUsers = useQuery("get-users", async () => {
    const users = axios({
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
    return users;
  }, {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    getAllProducts,
    getOneProduct,
    getAllUsers
  }
}