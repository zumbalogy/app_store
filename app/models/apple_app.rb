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
        app = AppleApp.where(trackId: input[:trackId])
        if app
            app.update_attributes(
                averageUserRating: input[:averageUserRating],
                averageUserRatingForCurrentVersion: input[:averageUserRatingForCurrentVersion],
                userRatingCount: input[:userRatingCount],
                userRatingCountForCurrentVersion: input[:userRatingCountForCurrentVersion],
                price: input[:price],
                version: input[:version],
                reviews: (app.reviews | input[:reviews])
                    #in theory, if we are getting all reviews,
                    #we could just drop old ones, since welle still have them
            )
        else
            app = AppleApp.create(input) #might want to sanitize though
        end 
        return app
    end
end