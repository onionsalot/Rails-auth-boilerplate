import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const getOneProductQuery = async (id) => {
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
  return product
}