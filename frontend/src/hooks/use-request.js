import { useQuery } from "react-query";
import { getAllProductsQuery } from "../queries/getAllProductsQuery";
import { getOneProductQuery } from "../queries/getOneProductQuery";
import { getAllUsersQuery } from "../queries/getAllUsersQuery";
import axios from "../lib/axios";
import { useBoundStore } from "../stores/useBoundStore";

const API_URL = `http://localhost:3000/graphql`;

export const useRequest = (id = null) => {
  const setProducts = useBoundStore((state) => state.setProducts);
  // Product Requests

  const getAllProducts = useQuery("get-all-products", getAllProductsQuery, {
    onSuccess: (response) => {
      if (response?.data?.data?.products) {
        setProducts(response.data.data.products)
      }
    },
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const getOneProduct = useQuery(["get-one-product", id], () => getOneProductQuery(id), {
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
  })

  // User Requests

  const getAllUsers = useQuery("get-all-users", getAllUsersQuery, {
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