import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const deleteProductMutation = async (input) => {
  const productId = input.id

  const product = axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
        mutation ($id: ID!) {
          productDelete(input: {id: $id}) {
            success
          }
        }    
      `,
      variables: { id: productId }
    }
  })
  return product;
}