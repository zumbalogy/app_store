class MainController < ApplicationController

    def index
    end

    def android_review
        # hit by get_android_reviews() in main.js
        # get_android_reviews is called after button press
        app = MarketBot::Android::App.new(params[:app])
        output = []
        begin
            app = app.update
            html = Nokogiri::HTML(app.html)
            reviews = html.css('.single-review')
            reviews.each do |review|
                output << {
                    review: review.css('.review-body').children[1..2].to_s,
                    time:  review.css('.review-date').children.to_s
                }
            end
        rescue
            # sometimes there are no reviews
        end
        render json: {reviews: output, name: params[:app]}
    end

end