import { useRef, useState } from "react";
import { useMutate } from "../../hooks/use-mutate"

const Product = ({ product }) => {
  const { deleteProduct } = useMutate()

  function handleClick() {
    deleteProduct.mutate(product)
  }

  return (
    <>
      <li><button onClick={handleClick}>x</button> ID: {product.id} || Name: {product.name}</li>
    </>
  )
}
export default Product;