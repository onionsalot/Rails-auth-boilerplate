import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const getAllProductsQuery = async () => {
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
}