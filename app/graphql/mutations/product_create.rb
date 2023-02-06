# frozen_string_literal: true

module Mutations
  class ProductCreate < BaseMutation
    description "Creates a new product"

    argument :name, String, required: true
    argument :price, Integer, required: true

    field :product, Types::ProductType, null: true
    field :success, Boolean, null: false

    def resolve(name: nil, price: nil)
      begin
        product = ProductService.create_product!(
          name: name,
          price: price
        )

        { success: true, product: product }
      rescue
        raise GraphQL::ExecutionError.new "Error creating product"
      end
    end
  end
end
