import { useQuery } from "react-query";
import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT, GET_ALL_USERS } from "../graphql/queries"
import { gqlHelper } from "../helpers/gql-helper"

export const useRequest = (input = null) => {
  // Product Requests
  const getAllProducts = useQuery("get-all-products", () => gqlHelper(GET_ALL_PRODUCTS), {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const getOneProduct = useQuery(["get-one-product", input?.id], () => gqlHelper(GET_ONE_PRODUCT, input), {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  // User Requests

  const getAllUsers = useQuery("get-all-users", () => gqlHelper(GET_ALL_USERS), {
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
