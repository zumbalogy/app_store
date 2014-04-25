class AndroidApp
    include Mongoid::Document
    include Mongoid::Timestamps
    field :package_name, type: String
    field :rating, type: Float
    field :title, type: String
    field :developer, type: String
    field :number_ratings, type: Integer
    field :price_numeric, type: Float
    field :reviews, type: Array 
    field :version, type: String

    def self.save input
        app = AndroidApp.where(package_name: input[:package_name])
        if app
            app.update_attributes(
                rating: input[:rating],
                number_ratings: input[:number_ratings],
                price_numeric: input[:price_numeric],
                version: input[:version],
                reviews: (app.reviews | input[:reviews])
                    #in theory, if we are getting all reviews,
                    #we could just drop old ones, since welle still have them
            )
        else
            app = AndroidApp.create(input) #might want to sanitize though
        end 
        return app
    end

end