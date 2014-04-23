class AppleApp
    include Mongoid::Document
    field :trackId, type: Integer
    field :averageUserRating, type: Float
    field :averageUserRatingForCurrentVersion, type: Float
    field :trackName, type: String
    field :artistName, type: String
    field :userRatingCount, type: Integer
    field :userRatingCountForCurrentVersion, type: Integer
    field :price, type: Float
    field :reviews, type: Array 
end