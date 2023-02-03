const AddProductForm = () => {
  return (
    <>
      <form>
        Name: <input type="name" name="name" required/>
        Price: <input type="number" name="price" required/>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
export default AddProductForm;