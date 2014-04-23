class AndroidApp
    include Mongoid::Document
    field :package_name, type: String
    field :rating, type: Float
    field :title, type: String
    field :developer, type: String
    field :number_ratings, type: Integer
    field :price_numeric, type: Float
    field :reviews, type: Array 
    field :version, type: String
end