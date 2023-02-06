import { useMutation, useQueryClient } from "react-query";
import { addProductMutation } from "../mutations/addProductMutation";
import { deleteProductMutation } from "../mutations/deleteProductMutation"
import { updateProductMutation } from "../mutations/updateProductMutation";

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

  const deleteProduct = useMutation(deleteProductMutation,
    {
      onSuccess: (response) => {
        if (response.data?.data.productDelete.success) {
          queryClient.invalidateQueries('get-all-products') 
        }
      }
    })

  const updateProduct = useMutation(updateProductMutation,
    {
      onSuccess: (response) => {
        if (response.data?.data.productUpdate.success) {
          queryClient.invalidateQueries('get-all-products') 
        }
      }
    })

  return {
    addProduct,
    deleteProduct,
    updateProduct
  }
}
