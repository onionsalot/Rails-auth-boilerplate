module Queries
  class OneProduct < BaseQuery
    type Types::ProductType, null: false
    description "Query one Product"
    argument :id, ID, required: true

    def resolve(id:)
      return Product.find(id)
    rescue
      raise GraphQL::ExecutionError.new "Unable to fetch products"
    end
  end
end