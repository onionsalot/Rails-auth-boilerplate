import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const addProductMutation = async (input) => {
  const name = input.name
  const price = parseFloat(input.price)

  const product = axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
        mutation ($name: String!, $price: Int!) {
          productCreate(input: {name: $name, price: $price}) {
            product {
              id
              name
              price
            }
          }
        }        
      `,
      variables: { name: name, price: price}
    }
  })
  return product;
}