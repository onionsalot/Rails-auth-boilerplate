module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"

    field :users, [Types::UserType], null: false, description: "Show all users"
    field :products, [Types::ProductType], null: false, description: "Show all products"
    field :product, Types::ProductType, null: false do
      description "Finds a single product by ID"
      argument :id, ID
    end

    def users
      User.all
    end

    def products
      Product.all
    end

    def product(id:)
      Product.find(id)
    end

    def test_field
      "Hello World!"
    end
  end
end
