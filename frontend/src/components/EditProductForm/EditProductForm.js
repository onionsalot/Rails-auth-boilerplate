import { useMutate } from "../../hooks/use-mutate"
import { useRef } from "react"
import Select from 'react-select'
import { useRequest } from "../../hooks/use-request"

const EditProductForm = () => {
  const formRef = useRef()
  const { updateProduct } = useMutate()
  const { getAllProducts } = useRequest()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const input = { id: data.id, name: data.name, price: parseFloat(data.price)}
    updateProduct.mutate(input)
    console.log(input)
    e.target.reset()
  }
  const options = getAllProducts.data.data.data.products.map((product) => {
    return { value: product.id, label: `ID: ${product.id} NAME: ${product.name}`}
  })

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        ID: <Select options={options} name="id" />
        Name: <input type="name" name="name" required/>
        Price: <input type="number" name="price" required/>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
export default EditProductForm