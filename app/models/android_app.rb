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