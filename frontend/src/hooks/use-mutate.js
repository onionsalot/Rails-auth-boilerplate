import { useMutation, useQueryClient } from "react-query"
import { ADD_NEW_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../graphql/mutations"
import { gqlHelper } from "../helpers/gql-helper"
import toast from 'react-hot-toast'

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

  const addProduct = useMutation((input) => gqlHelper(ADD_NEW_PRODUCT, input),
    {
      onSuccess: (response) => {
        checkResponse(response)
      }
    })

  const deleteProduct = useMutation((input) => gqlHelper(DELETE_PRODUCT, input),
    {
      onSuccess: (response) => {
        checkResponse(response)
      }
    })

  const updateProduct = useMutation((input) => gqlHelper(UPDATE_PRODUCT, input),
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
