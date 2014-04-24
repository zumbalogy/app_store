class AppleApp
    include Mongoid::Document
    include Mongoid::Timestamps
    field :trackId, type: Integer
    field :averageUserRating, type: Float
    field :averageUserRatingForCurrentVersion, type: Float
    field :trackName, type: String
    field :artistName, type: String
    field :userRatingCount, type: Integer
    field :userRatingCountForCurrentVersion, type: Integer
    field :price, type: Float
    field :version, type: String
    field :reviews, type: Array 
end