import { useMutation, useQueryClient } from "react-query";
import { addProductMutation } from "../mutations/addProductMutation";

const API_URL = `http://localhost:3000/graphql`;

export const useMutate = () => {
  const queryClient = useQueryClient()

  // Product Mutations

  const addProduct = useMutation(addProductMutation,
    {
      onSuccess: (response) => {
        if (response.data?.data.productCreate.product) {
          queryClient.invalidateQueries('get-all-products') 
        }
      }
    });

  return {
    addProduct
  }
}
