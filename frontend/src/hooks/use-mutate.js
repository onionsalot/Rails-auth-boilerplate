import { useMutation, useQueryClient } from "react-query";
import { addProductMutation } from "../mutations/addProductMutation";
import { deleteProductMutation } from "../mutations/deleteProductMutation"
import { updateProductMutation } from "../mutations/updateProductMutation";
import toast from 'react-hot-toast';

const API_URL = `http://localhost:3000/graphql`;

export const useMutate = () => {
  const queryClient = useQueryClient()
  const checkResponse = (response) => {
    if (response.data?.errors) {
      toast.error(response.data?.errors[0].message)
    } else {
      toast.success('Success!')
      queryClient.invalidateQueries('get-all-products') 
    }
  }
  // Product Mutations

  const addProduct = useMutation(addProductMutation,
    {
      onSuccess: (response) => {
        checkResponse(response)
      }
    });

  const deleteProduct = useMutation(deleteProductMutation,
    {
      onSuccess: (response) => {
        checkResponse(response)
      }
    })

  const updateProduct = useMutation(updateProductMutation,
    {
      onSuccess: (response) => {
        checkResponse(response)
      }
    })

  return {
    addProduct,
    deleteProduct,
    updateProduct
  }
}
