# frozen_string_literal: true

module Mutations
  class ProductCreate < BaseMutation
    description "Creates a new product"

    argument :name, String, required: true
    argument :price, Integer, required: true

    field :product, Types::ProductType, null: true

    def resolve(name: nil, price: nil)
      begin
        product = ProductService.create_product!(
          name: name,
          price: price
        )
        binding.pry

        { product: product }
      rescue
        raise GraphQL::ExecutionError.new "Error creating product"
      end
    end
  end
end

# mutation {
#   productCreate(input: { name: "lelelele", price: 88} ) {
#     product { 
#       id
#     	name
#     	price
#     }
#   }
# }
