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

    def self.save input
        #if already exists
            #re-write, but merge reviews array
            # # this kinda looses the info of average ratings over time though
            # # so maybe that could be an array of objects with rating and timestamp
        # else
            #write a new one compelely
        # end 
    end
end