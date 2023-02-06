# frozen_string_literal: true

module Mutations
  class ProductUpdate < BaseMutation
    description "Updates a product by id"

    field :success, Boolean, null: false

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :price, Integer, required: true

    def resolve(id:, name:, price:)
      begin
        service = ProductService.new(id: id)
        service.update_product!(name: name, price: price)

        { success: true }
      rescue
        raise GraphQL::ExecutionError.new "Error updating product"
      end
    end
  end
end
