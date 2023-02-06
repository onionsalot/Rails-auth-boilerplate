import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const updateProductMutation = async (input) => {
  const productId = input.id
  const name = input.name
  const price = parseFloat(input.price)

  const product = axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
        mutation ($id: ID!, $name: String!, $price: Int!) {
          productUpdate(input: {id: $id, name: $name, price: $price}) {
            success
          }
        }
      `,
      variables: {id: productId, name: name, price: price}
    }
  })
  return product;
}