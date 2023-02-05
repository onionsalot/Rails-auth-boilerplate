class ProductService
  def self.create_product!(name:, price:)
    Product.create!(
      name: name,
      price: price
    )
  end

  def initialize(id:)
    @product = Product.find(id)
  end

  def update_product!(name:, price:)
    @product.update!(name: name, price: price)
  end
end
