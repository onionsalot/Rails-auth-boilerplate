# frozen_string_literal: true

module Mutations
  class ProductDelete < BaseMutation
    description "Deletes a product by ID"

    field :success, Boolean, null: false

    argument :id, ID, required: true

    def resolve(id:)
      begin
        service = ProductService.new(id: id)
        service.destroy_product!

        { success: true }
      rescue
        raise GraphQL::ExecutionError.new "Error deleting product"
      end
    end
  end
end
